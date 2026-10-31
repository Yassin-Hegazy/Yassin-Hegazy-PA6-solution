import Link from "next/link";
import { getTodos } from "@/lib/todos";

export default async function RecentSlot() {
  const todos = await getTodos();
  return <><h2>Recent 3 todos</h2><ul>{todos.slice(-3).reverse().map((todo) =>
    <li key={todo.id}><Link href={`/todos/${todo.id}`}>{todo.title}</Link></li>
  )}</ul></>;
}
