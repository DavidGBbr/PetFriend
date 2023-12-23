import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("@pet.token")?.value;

  const routes = {
    signInURL: new URL("/login", req.url),
    dashboardURL: new URL("/dashboard", req.url),
    petURL: new URL("/pet", req.url),
  };

  if (token) {
    if (
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")
    ) {
      return NextResponse.redirect(routes.dashboardURL);
    }
  } else {
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/pet")
    ) {
      return NextResponse.redirect(routes.signInURL);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/pet",
    "/pet/:path*",
    "/login",
    "/register",
  ],
};
