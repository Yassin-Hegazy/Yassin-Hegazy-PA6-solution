import Link from "next/link";
import Counter from "../../_components/Counter";

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return <section className="card">
    <h1>Layout vs Template</h1>
    <p className="muted">The layout counter persists across A/B navigation. The template counter resets.</p>
    <div className="row">
      <Counter label="Layout counter (persists)" />
      <Link href="/playground/a">Page A</Link>
      <Link href="/playground/b">Page B</Link>
    </div>
    {children}
  </section>;
}
