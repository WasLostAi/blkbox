import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname

  // Check if the path is for a protected route
  const isProtectedRoute =
    path.startsWith("/dashboard/tools/") ||
    path === "/dashboard/upgrade" ||
    path === "/dashboard/settings" ||
    path.startsWith("/admin")

  // If it's not a protected route, allow the request
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Check for wallet connection from cookies
  const walletAddress = request.cookies.get("walletAddress")?.value

  // Check for admin status from cookies (in a real app, this would be verified server-side)
  const isAdmin = request.cookies.get("isAdmin")?.value === "true"

  // Check for kill switch status
  const killSwitchActive = request.cookies.get("killSwitchActive")?.value === "true"

  // If kill switch is active and the user is not an admin, redirect to dashboard
  if (killSwitchActive && !isAdmin && path.startsWith("/dashboard/tools/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If no wallet is connected, redirect to the dashboard
  if (!walletAddress) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // For admin-only routes, check admin status
  if ((path === "/dashboard/settings" || path.startsWith("/admin")) && !isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // For tier-restricted routes, we would check the tier here
  // But since we can't reliably do that in middleware (the tier is calculated client-side),
  // we'll handle that check in the individual route components

  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
