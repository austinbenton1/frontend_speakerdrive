import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname
  
  // Check if it's an app.speakerdrive.com link
  // Check if it's an app route or app.speakerdrive.com
  if (url.href.includes('app.speakerdrive.com') || pathname.startsWith('/app/')) {
    // You can add conditions here to bypass the redirect
    // Example: Check for specific IPs or query parameters
    const bypass = url.searchParams.get('bypass') === 'true'
    
    if (!bypass) {
      // Redirect to coming-soon page
      return NextResponse.redirect(new URL('/coming-soon', request.url))
    }
  }
  
  return NextResponse.next()
}

// Only run middleware on navigation routes, not on assets or api routes
export const config = {
  matcher: [
    // Match all paths starting with /app/
    '/app/:path*',
    // Match all paths on app.speakerdrive.com
    '/:path*'
  ]
}