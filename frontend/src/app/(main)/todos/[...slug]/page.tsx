import Link from "next/link";

export default async function TodoCatchAll({ params }: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <section className="card">
    <h1>Todo catch-all route</h1>
    <p>Matched slug array:</p>
    <pre>{JSON.stringify(slug)}</pre>
    <p className="muted">/todos/new → static; /todos/5 → dynamic; /todos/5/edit → this catch-all.</p>
    <Link href="/todos">Back to todos</Link>
  </section>;
}
