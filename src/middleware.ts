import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  //login and signup path made public and accesible to everybody except a user  that is logged in
  const isPublicPath = path === '/login' || path === '/signup'

  const token = request.cookies.get('token')?.value || ""

  //if user is logged in and the token from jwt isnt empty, the middleware redirects them to home page whenever they try to acccess the login or signup pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  //else if a user isnt logged in and consequently has no browser token and tries to access a path that isnt public/specified in isPublicPath, they will be redirected to login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [ //paths we want our middleware to execute on before response is fetched
    '/',
    '/profile',
    '/login',
    '/signup'
  ]
}