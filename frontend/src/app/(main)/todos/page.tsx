/* eslint-disable @next/next/no-html-link-for-pages -- /todos/new must not be intercepted by the (.)[id] modal. */
import Link from "next/link";
import { getTodos } from "@/lib/todos";

type Filter = "all" | "done" | "open";

export default async function TodosPage({ searchParams }: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter: Filter = status === "done" || status === "open" ? status : "all";
  const allTodos = await getTodos();
  const visibleTodos = allTodos.filter((todo) => filter === "all" || (filter === "done" ? todo.done : !todo.done));

  return <>
    <h1>Todos</h1>
    <div className="row">
      {(["all", "done", "open"] as Filter[]).map((item) => <Link key={item}
        className={`filter ${filter === item ? "selected" : ""}`}
        href={item === "all" ? "/todos" : `/todos?status=${item}`}>
        {item === "all" ? "All" : item === "done" ? "Done" : "Open"}
      </Link>)}
      <a href="/todos/new" className="btn">New todo</a>
    </div>
    <section className="card">
      <p className="muted">Showing {visibleTodos.length} of {allTodos.length} todos. Click a todo to open its modal.</p>
      {visibleTodos.length === 0 && <p>No todos in this filter.</p>}
      {visibleTodos.map((todo) => <div className="todo-row" key={todo.id}>
        <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
        <span className={`status ${todo.done ? "done" : ""}`}>{todo.done ? "Done" : "Open"}</span>
      </div>)}
    </section>
  </>;
}
