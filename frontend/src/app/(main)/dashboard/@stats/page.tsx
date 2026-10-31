import { getTodos } from "@/lib/todos";

export default async function StatsSlot() {
  const todos = await getTodos();
  const done = todos.filter((todo) => todo.done).length;
  return <><h2>Stats slot</h2><p>Total: {todos.length}</p><p>Done: {done}</p><p>Open: {todos.length - done}</p></>;
}
