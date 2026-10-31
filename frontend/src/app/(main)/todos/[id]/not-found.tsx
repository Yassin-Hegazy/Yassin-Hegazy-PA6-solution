import Link from "next/link";

export default function TodoNotFound() {
  return <section className="card"><h1>Todo not found</h1><p>There is no todo with that ID.</p><Link href="/todos">Back to todos</Link></section>;
}
