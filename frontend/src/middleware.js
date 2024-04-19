import { NextResponse } from 'next/server'
import getTokenData from './lib/getTokenData'

export function middleware(request) {
  const cookies = request.cookies.get('token')
  const userData = getTokenData(cookies?.value)
  const { pathname } = request.nextUrl
  console.log(pathname)
  // if (
  //   pathname === '/guru' ||
  //   pathname === '/admin' ||
  //   userData?.role != 'ADMIN' ||
  //   userData?.role != 'GURU'
  // ) {
  //   // Redirect to login or unauthorized page if no valid token is found
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  if (!userData) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Differentiate routes based on user role
  if (pathname.startsWith('/admin' || '/admin/') && userData?.role) {
    if (userData.role !== 'ADMIN') {
      // Redirect unauthorized users (non-admins) to a specific page (e.g., teacher dashboard)
      return NextResponse.redirect(new URL('/guru', request.url))
    }
  } else if (pathname.startsWith('/guru') || ('/guru/' && userData?.role)) {
    if (userData.role !== 'GURU') {
      // Redirect unauthorized users (non-teachers) to a specific page (e.g., admin dashboard or login)
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // Allow access to the requested route if authorized
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/guru/:path*'],
}
