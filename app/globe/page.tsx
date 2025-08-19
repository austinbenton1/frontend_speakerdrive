'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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

// Helper function to get initials from a name
const getInitials = (name: string = '') => {
  if (!name) return '';
  const words = name.split(' ');
  if (words.length > 1) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
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

  // Simplified mobile state
  const [isMobile, setIsMobile] = useState(false);
  const initialLoadRef = useRef(true);

  // Spin control refs for 10-second intro
  const spinTimeoutRef = useRef<number | null>(null);
  const rotationDirection = useRef(-1);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelectEvent = useCallback((eventProperties: any) => {
    if (!map.current || !eventProperties) return;
    
    if (activeMarker.current) activeMarker.current.remove();
    const markerHtml = ReactDOMServer.renderToString(<CustomMarker event={eventProperties} />);
    const markerEl = document.createElement('div');
    markerEl.innerHTML = markerHtml;
    const newMarker = new mapboxgl.Marker(markerEl.firstChild as HTMLElement)
      .setLngLat([Number(eventProperties.longitude), Number(eventProperties.latitude)])
      .addTo(map.current);
    activeMarker.current = newMarker;
    
    setSelectedEvent(eventProperties);
    setClusterItems(null);
  }, []);

  const handleDeselect = useCallback(() => {
    if (activeMarker.current) {
      activeMarker.current.remove();
      activeMarker.current = null;
    }
    setSelectedEvent(null);
    setClusterItems(null);
    setClusterLocation('');
    setCurrentItemIndex(0);
    setIsLoadingCluster(false);
  }, []);

  // 10-second intro spin function
  const spinGlobeIntro = () => {
    if (!map.current) return;
    
    const secondsPerRevolution = 240;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;
    
    const zoom = map.current.getZoom();
    if (zoom < maxSpinZoom) {
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

  // Content component for reuse
  const CardContent = () => {
    if (selectedEvent) {
      return (
        <>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
            <h2 className="text-sm font-bold uppercase text-gray-500">{selectedEvent.lead_type}</h2>
            <button onClick={handleDeselect} className="text-gray-400 hover:text-gray-700 text-2xl leading-none" aria-label="Close panel">&times;</button>
          </div>
          
          {/* Mobile: Mini card view */}
          {isMobile ? (
            <div className="flex flex-col">
              <div className="flex items-start space-x-3 mb-4">
                {selectedEvent.image_url ? (
                  <img src={selectedEvent.image_url} alt={selectedEvent.lead_name} className="h-12 w-12 flex-shrink-0 rounded-full object-cover border-2 border-gray-100" />
                ) : (
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold text-base">
                    {getInitials(selectedEvent.lead_name || selectedEvent.event_name)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base line-clamp-2">
                        {selectedEvent.lead_type === 'Contact' ? selectedEvent.lead_name : selectedEvent.event_name}
                      </h3>
                      <p className="text-xs text-gray-600 truncate">
                        {selectedEvent.organization || 'Organization not specified'}
                      </p>
                    </div>
                    <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      selectedEvent.lead_type === 'Event' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedEvent.lead_type}
                    </span>
                  </div>
                </div>
              </div>

              <a 
                href="https://app.speakerdrive.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
              >
                VIEW MORE DETAILS →
              </a>
            </div>
          ) : (
            /* Desktop: Full view */
            <div className="overflow-y-auto">
              {selectedEvent.image_url && <img src={selectedEvent.image_url} alt={selectedEvent.event_name} className="w-full h-32 object-cover rounded-md mb-3" />}
              <h1 className="text-xl font-bold text-gray-800 mb-4">{selectedEvent.event_name || selectedEvent.lead_name}</h1>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-4">
                <div><div className="font-semibold text-gray-700">Format</div><div className="text-gray-600">{selectedEvent.event_format || 'N/A'}</div></div>
                <div><div className="font-semibold text-gray-700">Fee Potential</div><div className="text-gray-600">{selectedEvent.fee_potential || 'N/A'}</div></div>
                <div><div className="font-semibold text-gray-700">Industry</div><div className="text-gray-600">{selectedEvent.industry || 'N/A'}</div></div>
                <div><div className="font-semibold text-gray-700">Keywords</div><div className="text-gray-600">{selectedEvent.keywords || 'N/A'}</div></div>
                <div className="col-span-2"><div className="font-semibold text-gray-700">Organization</div><div className="text-gray-600">{selectedEvent.organization || 'N/A'} ({selectedEvent.organization_type || 'N/A'})</div></div>
              </div>
              <a 
                href="https://app.speakerdrive.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-base rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
              >
                VIEW DETAILS →
              </a>
            </div>
          )}
        </>
      );
    }

    if (clusterItems && clusterItems.length > 0) {
      const item = clusterItems[currentItemIndex];
      return (
        <>
          <div className="flex items-center justify-between pb-2 mb-2 border-b">
            <h2 className="text-gray-800">
              <span className="font-bold text-base lg:text-lg">{clusterLocation.replace('in ', '').replace('Featured Opportunities', 'Featured')}</span>
              {clusterItems.length > 1 && <span className="font-normal text-gray-500 text-xs lg:text-sm ml-2">{currentItemIndex + 1} of {clusterItems.length}</span>}
            </h2>
            <button onClick={handleDeselect} className="text-gray-400 hover:text-gray-700 text-2xl leading-none" aria-label="Close panel">&times;</button>
          </div>
          
          {/* Mobile: Simplified view */}
          {isMobile ? (
            <div className="flex flex-col">
              <div className="flex items-start space-x-3 mb-4">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.lead_name} className="h-12 w-12 flex-shrink-0 rounded-full object-cover border-2 border-gray-100" />
                ) : (
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold text-base">
                    {getInitials(item.lead_name || item.event_name)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base line-clamp-2">
                        {item.lead_type === 'Contact' ? item.lead_name : item.event_name}
                      </h3>
                      <p className="text-xs text-gray-600 truncate">
                        {item.organization || 'Organization not specified'}
                      </p>
                    </div>
                    <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.lead_type === 'Event' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.lead_type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {clusterItems.length > 1 && (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentItemIndex(Math.max(0, currentItemIndex - 1))}
                      disabled={currentItemIndex === 0}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        currentItemIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      ← Previous
                    </button>
                    
                    <span className="text-xs text-gray-500">
                      {currentItemIndex + 1} / {clusterItems.length}
                    </span>
                    
                    <button
                      onClick={() => setCurrentItemIndex((currentItemIndex + 1) % clusterItems.length)}
                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                )}
                
                <a 
                  href="https://app.speakerdrive.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
                >
                  VIEW DETAILS →
                </a>
              </div>
            </div>
          ) : (
            /* Desktop: Full view with scrollable content area */
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto pb-4">
                <div className="flex items-start space-x-3 mb-4">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.lead_name} className="h-16 w-16 flex-shrink-0 rounded-full object-cover border-2 border-gray-100" />
                  ) : (
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold text-lg">
                      {getInitials(item.lead_name || item.event_name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {item.lead_type === 'Contact' ? (
                          <>
                            <h3 className="font-bold text-gray-900 text-lg line-clamp-2">{item.lead_name}</h3>
                            <p className="text-sm text-gray-600 truncate">{item.job_title || 'Position not specified'}</p>
                            <p className="text-sm text-gray-500 truncate">{item.organization || 'Organization not specified'}</p>
                          </>
                        ) : (
                          <>
                            <h3 className="font-bold text-gray-900 text-lg line-clamp-2">{item.event_name}</h3>
                            <p className="text-sm text-gray-600 truncate">{item.organization || 'Organization not specified'}</p>
                          </>
                        )}
                      </div>
                      <span className={`flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.lead_type === 'Event' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.lead_type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 mb-4">
                  {item.lead_type === 'Event' && (
                    <>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Format</p>
                        <p className="text-sm text-gray-900 mt-0.5">{item.event_format || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee Potential</p>
                        <p className="text-sm text-gray-900 mt-0.5">{item.fee_potential || 'Not specified'}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Industry</p>
                    <p className="text-sm text-gray-900 mt-0.5 truncate">{item.industry || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="text-sm text-gray-900 mt-0.5">{item.city}, {item.state}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">At A Glance</p>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {(() => {
                      const text = item.detailed_info || 'No additional details available.';
                      const maxLength = 180;
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
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentItemIndex(Math.max(0, currentItemIndex - 1))}
                    disabled={currentItemIndex === 0}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      currentItemIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    ← Previous
                  </button>
                  
                  <span className="text-sm text-gray-500">
                    {currentItemIndex + 1} / {clusterItems.length}
                  </span>
                  
                  <button
                    onClick={() => setCurrentItemIndex((currentItemIndex + 1) % clusterItems.length)}
                    className="px-3 py-1.5 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    Next →
                  </button>
                </div>
                
                <a 
                  href="https://app.speakerdrive.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-base rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
                >
                  VIEW DETAILS →
                </a>
              </div>
            </div>
          )}
        </>
      );
    }

    return null;
  };

  // Main map initialization
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const currentIsMobile = window.innerWidth < 1024;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-98, 35],
      zoom: 1.5,
      pitch: 35,
      projection: 'globe' as any,
      // Disable rotation on mobile for better UX
      dragRotate: !currentIsMobile,
      pitchWithRotate: !currentIsMobile
    });

    map.current.on('style.load', () => {
      map.current!.setFog({
        'range': [-1, 2], 'horizon-blend': 0.1, 'color': 'white', 'high-color': '#245bde',
        'space-color': '#000000', 'star-intensity': 0.5
      });
    });

    map.current.on('load', async () => {
      map.current!.flyTo({ center: [-95, 38], zoom: 3.2, pitch: 15, duration: 5000, essential: true });
      
      // Enhanced stop function that cancels animations
      const stopSpin = () => {
        if (spinTimeoutRef.current) {
          clearInterval(spinTimeoutRef.current);
          spinTimeoutRef.current = null;
        }
        map.current?.stop(); // CRITICAL: Cancels any in-flight animations
      };
      
      // Start the 10-second intro spin after flyTo completes
      map.current!.once('moveend', () => {
        let spinCount = 0;
        const maxSpins = 10;
        
        // Stop on user interaction
        map.current!.on('mousedown', stopSpin);
        map.current!.on('touchstart', stopSpin);
        
        // Run spin every second for 10 seconds
        spinTimeoutRef.current = window.setInterval(() => {
          spinGlobeIntro();
          spinCount++;
          if (spinCount >= maxSpins) {
            stopSpin();
          }
        }, 1000);
      });

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

        // All your existing visual layers
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

        map.current!.addLayer({
          id: 'point-glow', type: 'circle', source: 'events', filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-radius': ['match', ['get', 'lead_type'], 'Event', 14, 'Contact', 10, 12],
            'circle-opacity': 0.25,
            'circle-color': ['match', ['get', 'lead_type'], 'Event', '#42d679', 'Contact', '#1292e4', 'Conference', '#1292e4', 'Association', '#42d679', 'Corporate', '#8a3ffc', 'University', '#ff832b', '#9e9e9e'],
            'circle-blur': 1
          }
        });

        map.current!.addLayer({
          id: 'unclustered-point', type: 'circle', source: 'events', filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': ['match', ['get', 'lead_type'], 'Event', '#42d679', 'Contact', '#1292e4', 'Conference', '#1292e4', 'Association', '#42d679', 'Corporate', '#8a3ffc', 'University', '#ff832b', '#9e9e9e'],
            'circle-radius': ['match', ['get', 'lead_type'], 'Event', 7, 'Contact', 4, 5],
            'circle-opacity': ['match', ['get', 'lead_type'], 'Event', 1, 'Contact', 0.85, 0.9]
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

        // ADD INVISIBLE HIT LAYERS FOR BETTER MOBILE TOUCH TARGETS
        map.current!.addLayer({
          id: 'clusters-hit',
          type: 'circle',
          source: 'events',
          filter: ['has', 'point_count'],
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['get', 'point_count'], 
              2, 24, 50, 28, 100, 32, 500, 36, 1000, 40],
            'circle-opacity': 0,
            'circle-color': '#000000'
          }
        });

        map.current!.addLayer({
          id: 'unclustered-hit',
          type: 'circle',
          source: 'events',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-radius': ['step', ['zoom'], 
              16,  // Base size for mobile taps
              6, 20,  // Increase size at higher zoom
              10, 24],
            'circle-opacity': 0,
            'circle-color': '#000000'
          }
        });
        
        // Cluster click handler - use hit layer
        const onClusterActivate = (point: mapboxgl.PointLike) => {
          handleDeselect();
          
          const features = map.current!.queryRenderedFeatures(point, { layers: ['clusters-hit'] });
          if (!features?.length) return;
          
          const feature = features[0] as mapboxgl.MapboxGeoJSONFeature;
          const clusterId = feature.properties!.cluster_id;
          const coords = (feature.geometry as any).coordinates;
          const source = map.current!.getSource('events') as GeoJSONSource;

          setIsLoadingCluster(true);

          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (!err) map.current!.easeTo({ center: coords, zoom: zoom + 0.5, duration: 800 });
          });

          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?types=place,region&access_token=${mapboxgl.accessToken}`)
            .then(r => r.json())
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

          const maxLeaves = window.innerWidth < 1024 ? 50 : Infinity;
          source.getClusterLeaves(clusterId, maxLeaves, 0, (err, leaves) => {
            if (err) return setIsLoadingCluster(false);
            setClusterItems(leaves.map(l => JSON.parse(JSON.stringify(l.properties))));
            setCurrentItemIndex(0);
            setIsLoadingCluster(false);
          });
        };

        // Point click handler with tolerance - use hit layer
        const onPointActivate = (point: mapboxgl.PointLike) => {
          // Use bounding box for better touch detection
          const bbox: [mapboxgl.PointLike, mapboxgl.PointLike] = [
            [(point as any).x - 20, (point as any).y - 20],
            [(point as any).x + 20, (point as any).y + 20]
          ];
          
          const features = map.current!.queryRenderedFeatures(bbox, { layers: ['unclustered-hit'] });
          if (!features?.length) {
            return;
          }
          
          const feature = features[0] as mapboxgl.MapboxGeoJSONFeature;
          const props = JSON.parse(JSON.stringify(feature.properties || {}));
          handleSelectEvent(props);
          
          const coords = (feature.geometry as any).coordinates;
          const targetZoom = window.innerWidth < 1024 ? 14 : 16;
          map.current!.flyTo({ center: coords, zoom: targetZoom, duration: 800 });
        };

        // Bind both click and touchend to HIT LAYERS
        map.current!.on('click', 'clusters-hit', (e) => onClusterActivate(e.point));
        map.current!.on('touchend', 'clusters-hit', (e) => {
          e.preventDefault();
          onClusterActivate(e.point);
        });

        map.current!.on('click', 'unclustered-hit', (e) => onPointActivate(e.point));
        map.current!.on('touchend', 'unclustered-hit', (e) => {
          e.preventDefault();
          onPointActivate(e.point);
        });

        // Cursor changes on hover (desktop)
        map.current!.on('mouseenter', 'clusters-hit', () => { 
          if(map.current) map.current.getCanvas().style.cursor = 'pointer'; 
        });
        map.current!.on('mouseleave', 'clusters-hit', () => { 
          if(map.current) map.current.getCanvas().style.cursor = ''; 
        });
        map.current!.on('mouseenter', 'unclustered-hit', () => { 
          if(map.current) map.current.getCanvas().style.cursor = 'pointer'; 
        });
        map.current!.on('mouseleave', 'unclustered-hit', () => { 
          if(map.current) map.current.getCanvas().style.cursor = ''; 
        });

        const eventCount = data.filter(lead => lead.lead_type === 'Event').length;
        const contactCount = data.filter(lead => lead.lead_type === 'Contact').length;
        setStats({ events: eventCount, contacts: contactCount, regions: new Set(data.map(e => e.region)).size, states: new Set(data.map(e => e.state)).size, cities: new Set(data.map(e => `${e.city},${e.state}`)).size, loading: false });

        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const randomLeads = shuffled.slice(0, 10);
        setRandomLead(randomLeads[0]);
        
        if (!currentIsMobile && initialLoadRef.current) {
          setTimeout(() => {
            setClusterItems(randomLeads);
            setCurrentItemIndex(0);
            setClusterLocation('Featured Opportunities');
          }, 2000);
          initialLoadRef.current = false;
        }

      } catch (error) {
        console.error('Error loading data:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    });

    return () => {
      if (spinTimeoutRef.current) {
        clearInterval(spinTimeoutRef.current);
      }
      map.current?.remove();
      map.current = null;
    };
  }, []); // Empty dependency array

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Top Right Controls */}
      {/* Loading indicator while data loads */}
      {stats.loading && (
        <div className="absolute top-6 left-6 z-40 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-3 flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div> {/* <-- This closing div is missing in your code */}
            <span className="text-sm font-medium text-gray-700">Opportunities Populating</span>
          </div>
        </div>
      )}
      <div className="absolute top-6 right-6 flex flex-col items-end space-y-3">
        <button
          onClick={() => {
            if (map.current) {
              const currentZoom = map.current.getZoom();
              map.current.flyTo({ zoom: Math.max(1.5, currentZoom - 2), duration: 800 });
            }
          }}
          className="px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
          <span>Zoom Out</span>
        </button>
        
        {/* Stats - Hidden on mobile */}
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
      
      {/* Mobile Card - Floating within map */}
      {isMobile && (selectedEvent || isLoadingCluster || (clusterItems && clusterItems.length > 0)) && (
        <div className="absolute bottom-1/3 left-3 right-3 z-50 animate-slide-in" style={{ maxWidth: 'calc(100% - 1.5rem)' }}>
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4">
            {isLoadingCluster ? (
              <div className="py-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">Loading opportunities...</p>
              </div>
            ) : (
              <CardContent />
            )}
          </div>
        </div>
      )}
      
      {/* Desktop Cards */}
      {!isMobile && (selectedEvent || (clusterItems && clusterItems.length > 0)) && (
        <div className="absolute top-6 left-6 w-96 animate-slide-in">
          <div className="rounded-lg bg-white p-4 shadow-xl">
            <CardContent />
          </div>
        </div>
      )}
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}