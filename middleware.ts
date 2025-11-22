import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const isDev = process.env.NODE_ENV === 'development';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Skip if it's a static file or an API route
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return response;
  }

  // Security Headers
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  };

  // Performance Headers
  const performanceHeaders = {
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'Vary': 'Accept-Encoding',
  };

  // Set all headers
  Object.entries({
    ...securityHeaders,
    ...(!isDev && performanceHeaders),
  }).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add preload headers for critical resources
  if (!isDev) {
    const preloadHeaders = {
      'Link': '</_next/static/css/app/layout.css>; rel=preload; as=style',
    };
    
    Object.entries(preloadHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sw.js|workbox-*.js).*)',
  ],
};
