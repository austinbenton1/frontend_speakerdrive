import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const APP_PATHS = ['/signup', '/login'];
const MAIN_DOMAIN = 'speakerdrive.com';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname
  const host = request.headers.get('host') || ''
  const referer = request.headers.get('referer') || ''
  
  // Check if we're going to app.speakerdrive.com from the main site
  if (
    host.startsWith('app.speakerdrive.com') && 
    APP_PATHS.includes(pathname) &&
    referer.includes(MAIN_DOMAIN)
  ) {
    const bypass = url.searchParams.get('bypass') === 'true'
    
    if (!bypass) {
      return NextResponse.redirect(new URL('https://speakerdrive.com/coming-soon'))
    }
  }
  
  return NextResponse.next()
}