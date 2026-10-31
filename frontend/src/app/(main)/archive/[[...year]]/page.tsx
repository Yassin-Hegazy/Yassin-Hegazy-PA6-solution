export default async function ArchivePage({ params }: {
  params: Promise<{ year?: string[] }>;
}) {
  const { year } = await params;
  return <section className="card"><h1>Archive</h1>
    <p>{year?.length ? `Year: ${year.join(" / ")}` : "All years"}</p>
  </section>;
}
