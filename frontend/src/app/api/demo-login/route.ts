import { NextResponse } from "next/server";

/** Assignment-only demo cookie; not a real authentication system. */
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("demo-auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
