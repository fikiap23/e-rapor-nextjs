import { NextResponse } from 'next/server'
import getTokenData from './lib/getTokenData'

export function middleware(request) {
  const cookies = request.cookies.get('token')
  const userData = getTokenData(cookies?.value)
  const { pathname } = request.nextUrl
  console.log(pathname)
  if (!userData || (userData?.role != 'ADMIN' && userData?.role != 'GURU')) {
    // Redirect to login or unauthorized page if no valid token is found
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (userData?.role === 'GURU' && pathname === '/') {
    return NextResponse.redirect(new URL('/teacher', request.url))
  } else if (userData?.role === 'ADMIN' && pathname === '/') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (
    (userData?.role === 'GURU' || userData?.role === 'ADMIN') &&
    pathname === '/login'
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Differentiate routes based on user role

  if (pathname.startsWith('/admin' || '/admin/')) {
    if (userData.role !== 'ADMIN') {
      // Redirect unauthorized users (non-admins) to a specific page (e.g., teacher dashboard)
      return NextResponse.redirect(new URL('/teacher', request.url))
    }
  } else if (pathname.startsWith('/teacher') || '/teacher/') {
    if (userData.role !== 'GURU') {
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
