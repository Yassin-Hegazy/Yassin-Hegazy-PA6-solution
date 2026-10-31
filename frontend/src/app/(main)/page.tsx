import Link from "next/link";
import Stats from "../_components/Stats";

const demonstrations = [
  ["Todos list & filters", "/todos"],
  ["Done todos", "/todos?status=done"],
  ["Open todos", "/todos?status=open"],
  ["Create todo", "/todos/new"],
  ["Dynamic todo detail", "/todos/1"],
  ["Custom 404", "/todos/99999"],
  ["Catch-all slug", "/todos/5/edit"],
  ["Help breadcrumb", "/help/todos/create"],
  ["All archives", "/archive"],
  ["Archive for 2025", "/archive/2025"],
  ["Persistent vs reset counter", "/playground/a"],
  ["Second playground page", "/playground/b"],
  ["Protected dashboard", "/dashboard"],
  ["Parallel slot settings", "/dashboard/settings"],
  ["Login without navbar", "/login"],
  ["Stats JSON endpoint", "/api/stats"],
] as const;

export default function Home() {
  return <>
    <h1>Todo App</h1>
    <p className="muted">Next.js 16 App Router — Practice Assignment 6</p>
    <h2>Live statistics from /api/stats</h2>
    <Stats />
    <section className="card">
      <h2>Exercise pages</h2>
      <ul>{demonstrations.map(([label, href]) => <li key={href} style={{ marginBottom: 8 }}>
        {/* Interception would treat /todos/new as /todos/[id] during a soft navigation. */}
        {href === "/todos/new" ? <a href={href}>{label}</a> : <Link href={href}>{label}</Link>}
      </li>)}</ul>
    </section>
  </>;
}
