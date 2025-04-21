import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname

  // Check if the path is for a protected route
  const isProtectedRoute = path.startsWith("/dashboard/tools/") || path === "/dashboard/upgrade"

  // If it's not a protected route, allow the request
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Check for wallet connection from cookies
  const walletAddress = request.cookies.get("walletAddress")?.value

  // If no wallet is connected, redirect to the dashboard
  if (!walletAddress) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // For tier-restricted routes, we would check the tier here
  // But since we can't reliably do that in middleware (the tier is calculated client-side),
  // we'll handle that check in the individual route components

  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/dashboard/:path*"],
}
