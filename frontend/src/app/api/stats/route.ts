import { NextResponse } from "next/server";
import { getTodos } from "@/lib/todos";

export async function GET() {
  try {
    const todos = await getTodos();
    const done = todos.filter((todo) => todo.done).length;
    return NextResponse.json({ total: todos.length, done, open: todos.length - done });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 502 });
  }
}
