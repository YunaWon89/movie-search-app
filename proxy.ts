import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createGuestSession } from "@/lib/api";
import { guestSessionCookieName } from "@/lib/constants";

export async function proxy(request: NextRequest) {
  const existingSessionId = request.cookies.get(guestSessionCookieName)?.value;

  if (existingSessionId) {
    return NextResponse.next();
  }

  try {
    const session = await createGuestSession();
    const response = NextResponse.next();

    response.cookies.set(guestSessionCookieName, session.guest_session_id, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Failed to create TMDB guest session:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
