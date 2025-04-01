import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname
  const url = request.nextUrl.clone()
  
  // Check if it's an app.speakerdrive.com link
  if (url.href.includes('app.speakerdrive.com')) {
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
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}