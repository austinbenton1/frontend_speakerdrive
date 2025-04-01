import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // If we're on the app subdomain
  if (hostname.startsWith('app.')) {
    // Check for bypass parameter
    const searchParams = request.nextUrl.searchParams;
    if (searchParams.get('bypass') !== 'true') {
      // Redirect to coming-soon page on main domain
      return NextResponse.redirect('https://speakerdrive.com/coming-soon');
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
