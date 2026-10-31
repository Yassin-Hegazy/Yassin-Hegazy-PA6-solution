import { NextResponse } from "next/server";
import { backendTodosUrl } from "@/lib/todos";

/** Same-origin bridge: the client form still uses plain fetch. */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(backendTodosUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Backend unavailable" }, { status: 502 });
  }
}
