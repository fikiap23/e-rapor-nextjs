import { NextResponse } from 'next/server'
import getTokenData from './lib/getTokenData'

export function middleware(request) {
  const cookies = request.cookies.get('token')
  const userData = getTokenData(cookies?.value)

  if (!userData || (userData?.role != 'ADMIN' && userData?.role != 'TEACHER')) {
    // Redirect to login or unauthorized page if no valid token is found
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Differentiate routes based on user role
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin' || '/admin/' || '/login' || '/')) {
    if (userData.role !== 'ADMIN') {
      // Redirect unauthorized users (non-admins) to a specific page (e.g., teacher dashboard)
      return NextResponse.redirect(new URL('/teacher', request.url))
    }
  } else if (
    pathname.startsWith('/teacher') ||
    '/teacher/' ||
    '/login' ||
    '/'
  ) {
    if (userData.role !== 'TEACHER') {
      // Redirect unauthorized users (non-teachers) to a specific page (e.g., admin dashboard or login)
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // Allow access to the requested route if authorized
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/teacher/:path*', '/'],
}
