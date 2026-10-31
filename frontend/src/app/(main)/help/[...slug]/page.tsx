import Link from "next/link";

export default async function HelpPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <section className="card">
    <h1>Help</h1>
    <nav aria-label="Breadcrumbs" className="row">
      <Link href="/">Help</Link>
      {slug.map((segment, index) => <span key={`${segment}-${index}`}>
        &gt; {segment}
      </span>)}
    </nav>
  </section>;
}
