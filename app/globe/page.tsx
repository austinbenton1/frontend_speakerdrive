'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import mapboxgl, { GeoJSONSource, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createClient } from '@supabase/supabase-js';
import ReactDOMServer from 'react-dom/server';

// Initialize Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYXVzdGluYmVudG9uMTIiLCJhIjoiY21lOHl0b2QxMGM0dDJscHh2dmJxazg3dCJ9.B0omB0MLFoHn7dqWqEhogA';

// Initialize Supabase
const supabase = createClient(
    'https://xtujotwofyndgqbvhluz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0dWpvdHdvZnluZGdxYnZobHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjIzMzQsImV4cCI6MjA2NTgzODMzNH0.lBELwANjj4SzikDmhWpxMcbJJFf89-HfX34Hi3z2OmE'
);

type Lead = {
  id: number;
  region: string;
  state: string;
  city: string;
  lead_type: 'Event' | 'Contact' | string;
  longitude: number;
  latitude: number;
  detailed_info?: string;
  [key: string]: any;
};

// Constants for mobile configuration
const MOBILE_BREAKPOINT = 1024;
const SHEET_POSITIONS = {
  collapsed: 0.9,  // 90% down (only 10% visible)
  half: 0.4,       // 40% down (60% visible)
  full: 0.1        // 10% down (90% visible)
};
const VELOCITY_THRESHOLD = 0.5;

// Helper function to get initials from a name
const getInitials = (name: string = '') => {
  if (!name) return '';
  const words = name.split(' ');
  if (words.length > 1) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Helper function to truncate text
const truncateText = (text: string, maxLength: number = 200) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// React component for the custom HTML marker
const CustomMarker = ({ event }: { event: any }) => (
  <div className="w-20 h-20 p-1 bg-white rounded-full shadow-2xl cursor-pointer">
    {event.image_url ? (
      <img src={event.image_url} alt={event.lead_name} className="w-full h-full rounded-full object-cover" />
    ) : (
      <div className="flex w-full h-full items-center justify-center rounded-full bg-gray-200 text-gray-500 font-bold text-xl">
        {getInitials(event.lead_name || event.event_name)}
      </div>
    )}
  </div>
);

export default function GlobePage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const activeMarker = useRef<Marker | null>(null);

  const [stats, setStats] = useState({
    events: 0,
    contacts: 0,
    regions: 0,
    states: 0,
    cities: 0,
    loading: true
  });

  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [clusterItems, setClusterItems] = useState<any[] | null>(null);
  const [clusterLocation, setClusterLocation] = useState<string>('');
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
  const [randomLead, setRandomLead] = useState<any | null>(null);
  const [isLoadingCluster, setIsLoadingCluster] = useState(false);

  // Mobile detection and bottom sheet state
  const [isMobile, setIsMobile] = useState(false);
  const [sheetHeight, setSheetHeight] = useState<'collapsed' | 'half' | 'full'>('collapsed');
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const initialLoadRef = useRef(true);
  
  // STAGE 1 FIX: Track actual visual position
  const dragOriginRef = useRef({ startY: 0, startVisualPosition: 0.9, startTime: 0 });
  
  // STAGE 2 FIX: Track active listeners to prevent duplicates
  const listenersAttachedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const userInteracting = useRef(false);
  const spinEnabled = useRef(true);
  const rotationDirection = useRef(-1);
  const secondsPerRevolution = 240;
  const maxSpinZoom = 5;
  const slowSpinZoom = 3;

  // Detect mobile on mount and resize - separate from map initialization
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // STAGE 2 FIX: Debounced resize handler for better performance
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 100);
    };
    
    checkMobile();
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // STAGE 1 FIX: Get current visual position from DOM
  const getCurrentVisualPosition = useCallback(() => {
    if (!sheetRef.current) return SHEET_POSITIONS.collapsed;
    
    const transform = sheetRef.current.style.transform;
    const match = transform.match(/translateY\(([\d.]+)%\)/);
    return match ? parseFloat(match[1]) / 100 : SHEET_POSITIONS[sheetHeight];
  }, [sheetHeight]);

  // STAGE 1 FIX: Determine target state based on position and velocity
  const determineTargetState = useCallback((position: number, velocity?: number) => {
    // If high velocity swipe, use direction
    if (velocity && velocity > VELOCITY_THRESHOLD) {
      if (position > SHEET_POSITIONS.half) {
        return 'collapsed' as const;
      } else if (position > SHEET_POSITIONS.full && position < SHEET_POSITIONS.half) {
        return sheetHeight === 'collapsed' ? 'half' : 'full' as const;
      } else {
        return 'full' as const;
      }
    }
    
    // Otherwise, snap to nearest position
    const positions = [
      { state: 'collapsed' as const, value: SHEET_POSITIONS.collapsed },
      { state: 'half' as const, value: SHEET_POSITIONS.half },
      { state: 'full' as const, value: SHEET_POSITIONS.full }
    ];
    
    let minDistance = Infinity;
    let targetState: 'collapsed' | 'half' | 'full' = 'collapsed';
    
    positions.forEach(pos => {
      const distance = Math.abs(position - pos.value);
      if (distance < minDistance) {
        minDistance = distance;
        targetState = pos.state;
      }
    });
    
    return targetState;
  }, [sheetHeight]);

  // STAGE 1 FIX: Updated drag handlers using visual position
  const handleDragStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!isMobile || !sheetRef.current) return;
    
    e.preventDefault();
    setIsDragging(true);
    setIsTransitioning(false);
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // STAGE 1 FIX: Store actual visual position at drag start
    dragOriginRef.current = {
      startY: clientY,
      startVisualPosition: getCurrentVisualPosition(),
      startTime: Date.now()
    };
  }, [isMobile, getCurrentVisualPosition]);

  const handleDragMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !isMobile || !sheetRef.current) return;
    
    e.preventDefault();
    
    // STAGE 2 FIX: Use requestAnimationFrame for smooth performance
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      if (!sheetRef.current) return;
      
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaY = clientY - dragOriginRef.current.startY;
      const windowHeight = window.innerHeight;
      const deltaPercent = deltaY / windowHeight;
      
      // STAGE 1 FIX: Calculate from ACTUAL visual start position
      const newPosition = dragOriginRef.current.startVisualPosition + deltaPercent;
      const clampedPosition = Math.max(0.05, Math.min(0.95, newPosition));
      
      // Apply direct transform without state updates
      sheetRef.current.style.transform = `translateY(${clampedPosition * 100}%)`;
    });
  }, [isDragging, isMobile]);

  const handleDragEnd = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !isMobile || !sheetRef.current) return;
    
    e.preventDefault();
    setIsDragging(false);
    
    // STAGE 2 FIX: Clean up animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
    const deltaY = clientY - dragOriginRef.current.startY;
    const windowHeight = window.innerHeight;
    const deltaPercent = deltaY / windowHeight;
    const dragEndTime = Date.now();
    
    // Calculate velocity
    const timeElapsed = (dragEndTime - dragOriginRef.current.startTime) / 1000;
    const velocity = Math.abs(deltaPercent) / timeElapsed;
    
    // STAGE 1 FIX: Get final visual position
    const finalPosition = getCurrentVisualPosition();
    const targetState = determineTargetState(finalPosition, velocity);
    
    // Transition smoothly to final state
    setIsTransitioning(true);
    setSheetHeight(targetState);
    
    // Apply CSS transition to target position
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${SHEET_POSITIONS[targetState] * 100}%)`;
    }
    
    // Reset transition flag after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [isDragging, isMobile, getCurrentVisualPosition, determineTargetState]);

  // STAGE 1 FIX: Apply position when sheet height changes (but not during drag)
  useEffect(() => {
    if (!sheetRef.current || isDragging || !isMobile) return;
    
    // Apply transform to match state when not dragging
    const targetPosition = SHEET_POSITIONS[sheetHeight];
    sheetRef.current.style.transform = `translateY(${targetPosition * 100}%)`;
  }, [sheetHeight, isDragging, isMobile]);

  // STAGE 2 FIX: Proper event listener management with cleanup
  // Touch event listeners
  useEffect(() => {
    if (!isMobile) return;
    
    const dragHandle = document.querySelector('[data-drag-handle="true"]');
    if (!dragHandle) return;

    // STAGE 2 FIX: Prevent duplicate listeners
    if (listenersAttachedRef.current) return;

    const touchStartHandler = (e: TouchEvent) => handleDragStart(e as any);
    const touchMoveHandler = (e: TouchEvent) => handleDragMove(e as any);
    const touchEndHandler = (e: TouchEvent) => handleDragEnd(e as any);

    // Add passive: false to prevent scroll while dragging
    dragHandle.addEventListener('touchstart', touchStartHandler, { passive: false });
    document.addEventListener('touchmove', touchMoveHandler, { passive: false });
    document.addEventListener('touchend', touchEndHandler, { passive: false });
    document.addEventListener('touchcancel', touchEndHandler, { passive: false });

    listenersAttachedRef.current = true;

    // Cleanup
    return () => {
      dragHandle.removeEventListener('touchstart', touchStartHandler);
      document.removeEventListener('touchmove', touchMoveHandler);
      document.removeEventListener('touchend', touchEndHandler);
      document.removeEventListener('touchcancel', touchEndHandler);
      listenersAttachedRef.current = false;
    };
  }, [isMobile, handleDragStart, handleDragMove, handleDragEnd]);

  // STAGE 2 FIX: Mouse event listeners (fallback for desktop testing)
  useEffect(() => {
    if (!isMobile) return;
    
    const dragHandle = document.querySelector('[data-drag-handle="true"]');
    if (!dragHandle) return;

    const mouseDownHandler = (e: MouseEvent) => handleDragStart(e as any);
    const mouseMoveHandler = (e: MouseEvent) => {
      if (isDragging) {
        handleDragMove(e as any);
      }
    };
    const mouseUpHandler = (e: MouseEvent) => {
      if (isDragging) {
        handleDragEnd(e as any);
      }
    };

    dragHandle.addEventListener('mousedown', mouseDownHandler);
    // Document-level listeners to handle dragging outside element
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    // Cleanup
    return () => {
      dragHandle.removeEventListener('mousedown', mouseDownHandler);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [isMobile, isDragging, handleDragStart, handleDragMove, handleDragEnd]);

  // STAGE 2 FIX: Cleanup on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      // Clean up any pending animation frames
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Ensure listeners are marked as not attached
      listenersAttachedRef.current = false;
    };
  }, []);

  const spinGlobe = () => {
    if (!map.current || !spinEnabled.current) return;
    const zoom = map.current.getZoom();
    if (!userInteracting.current && zoom < maxSpinZoom) {
      let distancePerSecond = 360 / secondsPerRevolution;
      if (zoom > slowSpinZoom) {
        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
        distancePerSecond *= zoomDif;
      }
      const center = map.current.getCenter();
      const westBoundary = -130;
      const eastBoundary = -60;
      if (center.lng <= westBoundary && rotationDirection.current === -1) {
        rotationDirection.current = 1;
      } else if (center.lng >= eastBoundary && rotationDirection.current === 1) {
        rotationDirection.current = -1;
      }
      center.lng += distancePerSecond * rotationDirection.current;
      map.current.easeTo({ center, duration: 1000, easing: (n) => n, essential: true });
    }
  };

  const handleSelectEvent = (eventProperties: any) => {
    if (!map.current || !eventProperties) return;
    if (activeMarker.current) activeMarker.current.remove();
    const markerHtml = ReactDOMServer.renderToString(<CustomMarker event={eventProperties} />);
    const markerEl = document.createElement('div');
    markerEl.innerHTML = markerHtml;
    const newMarker = new mapboxgl.Marker(markerEl.firstChild as HTMLElement)
      .setLngLat([eventProperties.longitude, eventProperties.latitude])
      .addTo(map.current);
    activeMarker.current = newMarker;
    setSelectedEvent(eventProperties);
    setClusterItems(null);
    spinEnabled.current = false;
    
    // On mobile, open sheet to half when selecting
    if (isMobile) {
      setSheetHeight('half');
    }
  };

  const handleDeselect = () => {
    if (activeMarker.current) {
      activeMarker.current.remove();
      activeMarker.current = null;
    }
    setSelectedEvent(null);
    setClusterItems(null);
    setClusterLocation('');
    setCurrentItemIndex(0);
    setIsLoadingCluster(false);
    spinEnabled.current = true;
    spinGlobe();
    
    // On mobile, collapse sheet when deselecting
    if (isMobile) {
      setSheetHeight('collapsed');
    }
  };

  const handleShowRandomLead = () => {
    // Show the random lead as if it's a cluster with one item
    if (randomLead) {
      setClusterItems([randomLead]);
      setCurrentItemIndex(0);
      setClusterLocation('Featured');
      spinEnabled.current = false;
    }
  };

  // Main map initialization - only runs once
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-98, 35],
      zoom: 1.5,
      pitch: 35,
      projection: 'globe' as any
    });

    map.current.on('style.load', () => {
      map.current!.setFog({
        'range': [-1, 2], 'horizon-blend': 0.1, 'color': 'white', 'high-color': '#245bde',
        'space-color': '#000000', 'star-intensity': 0.5
      });
    });

    map.current.on('load', async () => {
      map.current!.flyTo({ center: [-95, 38], zoom: 3.2, pitch: 15, duration: 5000, essential: true });
      map.current!.on('mousedown', () => userInteracting.current = true);
      map.current!.on('mouseup', () => { userInteracting.current = false; spinGlobe(); });
      map.current!.on('dragend', () => { userInteracting.current = false; spinGlobe(); });
      map.current!.on('pitchend', () => { userInteracting.current = false; spinGlobe(); });
      map.current!.on('rotateend', () => { userInteracting.current = false; spinGlobe(); });
      map.current!.on('moveend', () => spinGlobe());

      const eventImage = new Image(64, 64);
      eventImage.onload = () => { if (map.current && !map.current.hasImage('calendar-circle-icon')) map.current.addImage('calendar-circle-icon', eventImage); };
      eventImage.onerror = () => console.error('Error loading calendar icon');
      eventImage.src = '/calendar-circle.svg';

      const contactImage = new Image(64, 64);
      contactImage.onload = () => { if (map.current && !map.current.hasImage('contact-circle-icon')) map.current.addImage('contact-circle-icon', contactImage); };
      contactImage.onerror = () => console.error('Error loading contact icon');
      contactImage.src = '/contact-circle.svg';

      try {
        let allData: Lead[] = [];
        let batchSize = 1000;
        let offset = 0;
        let hasMore = true;
        while (hasMore) {
          const { data: batch, error } = await supabase.from('leads').select('*, latitude, longitude').not('latitude', 'is', null).not('longitude', 'is', null).eq('region', 'United States').range(offset, offset + batchSize - 1);
          if (error) { console.error('Error fetching batch:', error); break; }
          if (batch && batch.length > 0) { allData = [...allData, ...batch]; offset += batchSize; } else { hasMore = false; }
        }

        const data = allData;
        if (data.length === 0) throw new Error('No data found');

        const geojson = {
          type: 'FeatureCollection' as const,
          features: data.map(event => ({
            id: event.id,
            type: 'Feature' as const,
            geometry: { type: 'Point' as const, coordinates: [event.longitude, event.latitude] },
            properties: { ...event, is_event: event.lead_type === 'Event' ? 1 : 0, is_contact: event.lead_type === 'Contact' ? 1 : 0 }
          }))
        };

        map.current!.addSource('events', {
          type: 'geojson', data: geojson, cluster: true, clusterMaxZoom: 14, clusterRadius: 35,
          clusterProperties: { 'event_count': ['+', ['get', 'is_event']], 'contact_count': ['+', ['get', 'is_contact']] }
        });

        map.current!.addLayer({
          id: 'cluster-glow', type: 'circle', source: 'events', filter: ['has', 'point_count'],
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['get', 'point_count'], 2, 20, 50, 28, 100, 32, 500, 40, 1000, 48],
            'circle-color': ['case', ['>', ['*', ['get', 'event_count'], 1.2], ['get', 'contact_count']], '#42d679', '#1292e4'],
            'circle-blur': 1.2, 'circle-opacity': 0.3
          }
        });

        map.current!.addLayer({
          id: 'clusters-all', type: 'circle', source: 'events', filter: ['has', 'point_count'],
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['get', 'point_count'], 2, 14, 10, 18, 50, 22, 100, 26, 500, 36, 1000, 42],
            'circle-color': ['case', ['>', ['*', ['get', 'event_count'], 1.2], ['get', 'contact_count']], '#42d679', '#1292e4'],
            'circle-opacity': 0.9, 'circle-stroke-width': 0.5, 'circle-stroke-color': '#ffffff', 'circle-stroke-opacity': 0.3
          }
        });

        // Enhanced glow for individual points - bigger for events
        map.current!.addLayer({
          id: 'point-glow', type: 'circle', source: 'events', filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-radius': ['match', ['get', 'lead_type'], 
              'Event', 14,  // Bigger glow for events
              'Contact', 10,  // Smaller glow for contacts
              12
            ],
            'circle-opacity': 0.25,
            'circle-color': ['match', ['get', 'lead_type'], 'Event', '#42d679', 'Contact', '#1292e4', 'Conference', '#1292e4', 'Association', '#42d679', 'Corporate', '#8a3ffc', 'University', '#ff832b', '#9e9e9e'],
            'circle-blur': 1
          }
        });

        // Enhanced individual points - bigger for events
        map.current!.addLayer({
          id: 'unclustered-point', type: 'circle', source: 'events', filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': ['match', ['get', 'lead_type'], 'Event', '#42d679', 'Contact', '#1292e4', 'Conference', '#1292e4', 'Association', '#42d679', 'Corporate', '#8a3ffc', 'University', '#ff832b', '#9e9e9e'],
            'circle-radius': ['match', ['get', 'lead_type'], 
              'Event', 7,  // Bigger dots for events
              'Contact', 4,  // Smaller dots for contacts
              5
            ],
            'circle-opacity': ['match', ['get', 'lead_type'], 
              'Event', 1,  // Full opacity for events
              'Contact', 0.85,  // Slightly less for contacts
              0.9
            ]
          }
        });

        map.current!.addLayer({
          id: 'cluster-icons', type: 'symbol', source: 'events', filter: ['has', 'point_count'],
          layout: {
            'icon-image': ['case', ['>', ['*', ['get', 'event_count'], 1.2], ['get', 'contact_count']], 'calendar-circle-icon', 'contact-circle-icon'],
            'icon-size': ['interpolate', ['linear'], ['get', 'point_count'], 2, 0.5, 50, 0.6, 100, 0.65, 500, 0.7, 1000, 0.75],
            'icon-allow-overlap': true, 'icon-ignore-placement': true
          },
          paint: { 'icon-opacity': ['interpolate', ['linear'], ['zoom'], 3, 1, 4, 0] }
        });

        map.current!.addLayer({
          id: 'cluster-count-background', type: 'circle', source: 'events', filter: ['has', 'point_count'],
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['get', 'point_count'], 2, 10, 50, 12, 100, 14, 500, 16, 1000, 18],
            'circle-color': ['case', ['>', ['*', ['get', 'event_count'], 1.2], ['get', 'contact_count']], '#35a55d', '#0f7ac4'],
            'circle-opacity': ['step', ['zoom'], 0, 4, 1]
          }
        });

        map.current!.addLayer({
          id: 'cluster-count', type: 'symbol', source: 'events', filter: ['has', 'point_count'],
          layout: {
            'text-field': ['case', ['>=', ['get', 'point_count'], 1000], ['concat', ['to-string', ['/', ['round', ['/', ['get', 'point_count'], 100]], 10]], 'k'], ['to-string', ['get', 'point_count']]],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': ['interpolate', ['linear'], ['get', 'point_count'], 2, 11, 50, 12, 100, 13, 500, 14, 1000, 15],
            'text-allow-overlap': true
          },
          paint: {
            'text-color': '#ffffff',
            'text-opacity': ['step', ['zoom'], 0, 4, 1]
          }
        });
        
        map.current!.on('mouseenter', 'clusters-all', () => { if(map.current) map.current.getCanvas().style.cursor = 'pointer'; });
        map.current!.on('mouseleave', 'clusters-all', () => { if(map.current) map.current.getCanvas().style.cursor = ''; });

        map.current!.on('click', 'clusters-all', (e) => {
            handleDeselect();
            if (!e.features || e.features.length === 0) return;
            const features = map.current!.queryRenderedFeatures(e.point, { layers: ['clusters-all'] });
            if (!features || features.length === 0) return;
            const clusterId = features[0].properties!.cluster_id;
            const coords = (features[0].geometry as any).coordinates;
            const source = map.current!.getSource('events') as GeoJSONSource;
            
            // Show loading state on mobile
            setIsLoadingCluster(true);
            
            source.getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return;
                map.current!.easeTo({ center: coords, zoom: zoom + 0.5, duration: 800 });
            });

            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?types=place,region&access_token=${mapboxgl.accessToken}`)
              .then(response => response.json())
              .then(data => {
                  let locationName = 'Selected Area';
                  if (data.features && data.features[0]) {
                      const place = data.features.find((f: any) => f.place_type.includes('place'));
                      const region = data.features.find((f: any) => f.place_type.includes('region'));
                      locationName = `${place?.text || ''}, ${region?.text || ''}`.replace(/^,|,$/g, '').trim();
                  }
                  setClusterLocation(`in ${locationName}`);
              })
              .catch(() => setClusterLocation('in Selected Area'));

            // Limit cluster leaves on mobile for performance
            const maxLeaves = window.innerWidth < MOBILE_BREAKPOINT ? 50 : Infinity;
            source.getClusterLeaves(clusterId, maxLeaves, 0, (err, leaves) => {
                if (err) return;
                setClusterItems(leaves.map(leaf => leaf.properties));
                setCurrentItemIndex(0);
                setIsLoadingCluster(false);
            });
        });
        
        map.current!.on('mouseenter', 'unclustered-point', () => { if(map.current) map.current.getCanvas().style.cursor = 'pointer'; });
        map.current!.on('mouseleave', 'unclustered-point', () => { if(map.current) map.current.getCanvas().style.cursor = ''; });
        
        map.current!.on('click', 'unclustered-point', (e) => {
          if (!e.features || e.features.length === 0) return;
          const features = map.current!.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });
          if (!features || features.length === 0) return;
          handleSelectEvent(features[0].properties);
          
          // Add a marker when zoomed in to individual point
          const coords = (features[0].geometry as any).coordinates;
          // Adjust zoom level based on device type
          const targetZoom = window.innerWidth < MOBILE_BREAKPOINT ? 14 : 16;
          map.current!.flyTo({ 
            center: coords, 
            zoom: targetZoom,
            duration: 800 
          });
          
          // Add a pulsing marker at high zoom
          if (activeMarker.current) activeMarker.current.remove();
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.style.width = '40px';
          el.style.height = '40px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = features[0].properties!.lead_type === 'Event' ? '#42d679' : '#1292e4';
          el.style.border = '4px solid white';
          el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 0 0 8px rgba(66, 214, 121, 0.2)';
          el.style.animation = 'pulse 2s infinite';
          
          // Add CSS animation for pulsing effect
          if (!document.querySelector('#marker-styles')) {
            const style = document.createElement('style');
            style.id = 'marker-styles';
            style.textContent = `
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
            `;
            document.head.appendChild(style);
          }
          
          const marker = new mapboxgl.Marker(el)
            .setLngLat(coords)
            .addTo(map.current!);
          activeMarker.current = marker;
        });

        const eventCount = data.filter(lead => lead.lead_type === 'Event').length;
        const contactCount = data.filter(lead => lead.lead_type === 'Contact').length;
        setStats({ events: eventCount, contacts: contactCount, regions: new Set(data.map(e => e.region)).size, states: new Set(data.map(e => e.state)).size, cities: new Set(data.map(e => `${e.city},${e.state}`)).size, loading: false });

        // Set 10 random leads to display initially for browsing
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const randomLeads = shuffled.slice(0, 10);
        setRandomLead(randomLeads[0]); // Keep first one for reference
        
        // Use isMobile state consistently instead of window.innerWidth check
        const currentIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
        if (!currentIsMobile && initialLoadRef.current) {
          setTimeout(() => {
            setClusterItems(randomLeads);
            setCurrentItemIndex(0);
            setClusterLocation('Featured Opportunities');
          }, 2000); // Show after 2 seconds so user sees the globe first
          initialLoadRef.current = false;
        }

      } catch (error) {
        console.error('Error loading data:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []); // Empty dependency array - map only initializes once

  // Add global styles for iOS safe areas
  useEffect(() => {
    if (!document.querySelector('#ios-safe-area-styles')) {
      const style = document.createElement('style');
      style.id = 'ios-safe-area-styles';
      style.textContent = `
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
        .safe-area-top {
          padding-top: env(safe-area-inset-top, 0);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Top Right Controls and Stats */}
      <div className="absolute top-6 right-6 flex flex-col items-end space-y-3 safe-area-top">
        {/* Zoom Out Button */}
        <button
          onClick={() => {
            if (map.current) {
              const currentZoom = map.current.getZoom();
              map.current.flyTo({ 
                zoom: Math.max(1.5, currentZoom - 2), 
                duration: 800 
              });
            }
          }}
          className="px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 flex items-center space-x-2"
          aria-label="Zoom out map"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
          <span>Zoom Out</span>
        </button>
        
        {/* Compact Stats - Hidden on mobile */}
        <div className="hidden lg:block bg-white rounded-lg shadow-lg px-4 py-2 text-xs space-y-1">
          <div className="flex items-center justify-between min-w-[140px]">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-[#42d679] mr-2"></span>
              <span className="text-gray-600">Events:</span>
            </div>
            <span className="font-bold text-gray-800 ml-2 tabular-nums">{stats.events.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between min-w-[140px]">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-[#1292e4] mr-2"></span>
              <span className="text-gray-600">Contacts:</span>
            </div>
            <span className="font-bold text-gray-800 ml-2 tabular-nums">{stats.contacts.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {/* Cards Container - Responsive positioning */}
      {/* STAGE 1 FIX: Removed inline style, using DOM manipulation only */}
      <div 
        ref={sheetRef}
        className={`
          fixed bottom-0 left-0 right-0 h-[90vh] z-20
          ${isTransitioning ? 'transition-transform duration-300 ease-out' : ''}
          lg:transition-none lg:absolute lg:top-6 lg:left-6 lg:bottom-auto lg:right-auto lg:w-96 lg:h-auto lg:max-h-[calc(100vh-3rem)]
        `}
      >
        {/* Mobile drag handle */}
        {isMobile && (selectedEvent || (clusterItems && clusterItems.length > 0)) && (
          <div 
            className="lg:hidden bg-white rounded-t-2xl p-2 flex justify-center cursor-grab active:cursor-grabbing touch-none"
            aria-label="Drag to resize panel"
            role="button"
            data-drag-handle="true"
          >
            <div className={`rounded-full transition-all ${
              isDragging ? 'w-16 h-2 bg-gray-500' : 'w-12 h-1.5 bg-gray-300 hover:bg-gray-400'
            }`}></div>
          </div>
        )}

        {/* Loading state for cluster data */}
        {isLoadingCluster && isMobile && (
          <div className="bg-white rounded-t-2xl lg:rounded-lg p-6 shadow-xl animate-slide-in">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">Loading opportunities...</p>
          </div>
        )}

        {selectedEvent && !isLoadingCluster && (
          <div className="rounded-t-2xl lg:rounded-lg bg-white p-4 shadow-xl animate-slide-in overflow-y-auto h-full lg:h-auto lg:max-h-full safe-area-bottom">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
              <h2 className="text-sm font-bold uppercase text-gray-500">{selectedEvent.lead_type}</h2>
              <button onClick={handleDeselect} className="text-gray-400 hover:text-gray-700 text-2xl leading-none" aria-label="Close panel">&times;</button>
            </div>
            <div className="overflow-y-auto max-h-[calc(100%-3rem)]">
              {selectedEvent.image_url && <img src={selectedEvent.image_url} alt={selectedEvent.event_name} className="w-full h-32 object-cover rounded-md mb-3" />}
              <h1 className="text-xl font-bold text-gray-800 mb-4">{selectedEvent.event_name || selectedEvent.lead_name}</h1>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div><div className="font-semibold text-gray-700">Format</div><div className="text-gray-600">{selectedEvent.event_format || 'N/A'}</div></div>
                <div><div className="font-semibold text-gray-700">Fee Potential</div><div className="text-gray-600">{selectedEvent.fee_potential || 'N/A'}</div></div>
                <div><div className="font-semibold text-gray-700">Industry</div><div className="text-gray-600">{selectedEvent.industry || 'N/A'}</div></div>
                <div><div className="font-semibold text-gray-700">Keywords</div><div className="text-gray-600">{selectedEvent.keywords || 'N/A'}</div></div>
                <div className="col-span-2"><div className="font-semibold text-gray-700">Organization</div><div className="text-gray-600">{selectedEvent.organization || 'N/A'} ({selectedEvent.organization_type || 'N/A'})</div></div>
              </div>
            </div>
          </div>
        )}
        
        {clusterItems && clusterItems.length > 0 && !isLoadingCluster && (
          <div className="rounded-t-2xl lg:rounded-lg bg-white p-3 lg:p-4 shadow-xl animate-slide-in h-full lg:h-[520px] flex flex-col safe-area-bottom">
            <div className="flex items-center justify-between pb-2 lg:pb-3 mb-2 lg:mb-3 border-b">
              <h2 className="text-gray-800">
                <span className="font-bold text-base lg:text-lg">{clusterLocation.replace('in ', '').replace('Featured Opportunities', 'Featured')}</span>
                {clusterItems.length > 1 && <span className="font-normal text-gray-500 text-xs lg:text-sm ml-2">{currentItemIndex + 1} of {clusterItems.length}</span>}
              </h2>
              <button onClick={handleDeselect} className="text-gray-400 hover:text-gray-700 text-2xl leading-none" aria-label="Close panel">&times;</button>
            </div>
            
            {(() => {
              const item = clusterItems[currentItemIndex];
              return (
                <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
                  {/* Header with avatar and type badge */}
                  <div className="flex items-start space-x-2 lg:space-x-3 mb-3 lg:mb-4">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.lead_name} className="h-12 w-12 lg:h-16 lg:w-16 flex-shrink-0 rounded-full object-cover border-2 border-gray-100" />
                    ) : (
                      <div className="flex h-12 w-12 lg:h-16 lg:w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold text-base lg:text-lg">
                        {getInitials(item.lead_name || item.event_name)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          {item.lead_type === 'Contact' ? (
                            <>
                              <h3 className="font-bold text-gray-900 text-base lg:text-lg line-clamp-2">{item.lead_name}</h3>
                              <p className="text-xs lg:text-sm text-gray-600 truncate">{item.job_title || 'Position not specified'}</p>
                              <p className="text-xs lg:text-sm text-gray-500 truncate">{item.organization || 'Organization not specified'}</p>
                            </>
                          ) : (
                            <>
                              <h3 className="font-bold text-gray-900 text-base lg:text-lg line-clamp-2">{item.event_name}</h3>
                              <p className="text-xs lg:text-sm text-gray-600 truncate">{item.organization || 'Organization not specified'}</p>
                            </>
                          )}
                        </div>
                        <span className={`flex-shrink-0 inline-flex items-center px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-xs font-medium ${
                          item.lead_type === 'Event' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.lead_type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 lg:gap-3 py-2 lg:py-3 border-y border-gray-100 mb-3 lg:mb-4">
                    {item.lead_type === 'Event' && (
                      <>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Format</p>
                          <p className="text-xs lg:text-sm text-gray-900 mt-0.5">{item.event_format || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee Potential</p>
                          <p className="text-xs lg:text-sm text-gray-900 mt-0.5">{item.fee_potential || 'Not specified'}</p>
                        </div>
                      </>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Industry</p>
                      <p className="text-xs lg:text-sm text-gray-900 mt-0.5 truncate">{item.industry || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</p>
                      <p className="text-xs lg:text-sm text-gray-900 mt-0.5">{item.city}, {item.state}</p>
                    </div>
                    {item.keywords && (
                      <div className="col-span-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Keywords</p>
                        <div className="flex gap-1 overflow-hidden">
                          {item.keywords.split(',').slice(0, 3).map((keyword: string, idx: number) => (
                            <span key={idx} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full whitespace-nowrap">
                              {keyword.trim()}
                            </span>
                          ))}
                          {item.keywords.split(',').length > 3 && (
                            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                              +{item.keywords.split(',').length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Detailed Info */}
                  <div className="flex-1 mb-3 lg:mb-4 overflow-hidden">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">At A Glance</p>
                    <div className="text-xs lg:text-sm text-gray-700 leading-relaxed">
                      {(() => {
                        const text = item.detailed_info || 'No additional details available.';
                        const maxLength = isMobile ? 120 : 180;
                        const truncated = text.length > maxLength ? text.substring(0, maxLength).trim() : text;
                        return (
                          <>
                            {truncated}
                            {text.length > maxLength && '...'}
                            <a 
                              href="https://app.speakerdrive.com/signup" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-medium inline-block ml-1"
                            >
                              more →
                            </a>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Navigation and CTA - Always at bottom */}
                  <div className="space-y-2 lg:space-y-3 mt-auto">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentItemIndex(Math.max(0, currentItemIndex - 1))}
                        disabled={currentItemIndex === 0}
                        className={`px-2 lg:px-3 py-1 lg:py-1.5 text-xs lg:text-sm font-medium rounded-md transition-colors ${
                          currentItemIndex === 0 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        aria-label="Previous item"
                      >
                        ← Previous
                      </button>
                      
                      <span className="text-xs lg:text-sm text-gray-500">
                        {currentItemIndex + 1} / {clusterItems.length}
                      </span>
                      
                      <button
                        onClick={() => setCurrentItemIndex((currentItemIndex + 1) % clusterItems.length)}
                        className="px-2 lg:px-3 py-1 lg:py-1.5 text-xs lg:text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
                        aria-label="Next item"
                      >
                        Next →
                      </button>
                    </div>
                    
                    <a 
                      href="https://app.speakerdrive.com/signup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 lg:px-4 py-2 lg:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm lg:text-base rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
                    >
                      UNLOCK THIS OPPORTUNITY →
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}