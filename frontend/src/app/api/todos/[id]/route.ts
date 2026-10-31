import { NextResponse } from "next/server";
import { backendTodosUrl } from "@/lib/todos";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const response = await fetch(backendTodosUrl(id), { method: "DELETE", cache: "no-store" });
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Backend unavailable" }, { status: 502 });
  }
}
