import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the URL so we can modify it (if needed)
  const url = request.nextUrl.clone();

  // 1. Check if the request is going to the app subdomain
  if (url.hostname === 'app.speakerdrive.com') {
    const path = url.pathname || '';

    // 2. If the user is trying to access /signup or /login
    if (path === '/signup' || path === '/login') {
      // 3. Allow bypass if the URL has ?bypass=true
      const bypassParam = url.searchParams.get('bypass');

      if (bypassParam !== 'true') {
        // 4. Redirect to main site's coming-soon page
        return NextResponse.redirect('https://www.speakerdrive.com/coming-soon');
      }
    }
  }

  // If none of the above conditions match, just continue
  return NextResponse.next();
}

// --- IMPORTANT: This "config" ensures the middleware runs on all paths 
// so it can check the conditions above. You can tailor the matcher
// if needed, but this is the simplest "catch-all" approach.
export const config = {
  matcher: '/:path*',
};
