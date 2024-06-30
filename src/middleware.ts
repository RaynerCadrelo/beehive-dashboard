import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')

//   if (token && request.nextUrl.pathname.startsWith('/logout')) {
//     return Response.redirect(new URL('/logout', request.url))
//   }

  if (token && !(request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/logout'))) {
    return Response.redirect(new URL('/dashboard', request.url))
  }

  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}