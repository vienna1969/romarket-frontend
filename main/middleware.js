
///import { verifyJwtToken } from "@/utils/auth";

import { verifyJwtToken } from "./utils/auth";

import { NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register", "/forgot-password"];

const isAuthPages = (url) => AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      return response;
    }
    return NextResponse.redirect(new URL("/", url));
  }

  /*
  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);
    //return NextResponse.redirect(new URL("/login"), url);
    //return NextResponse.redirect("/login");

    return NextResponse.redirect(new URL("/login", url));
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/admin"],
};
