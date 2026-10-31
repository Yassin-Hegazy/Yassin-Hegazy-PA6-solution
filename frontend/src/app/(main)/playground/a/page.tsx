import Link from "next/link";

export default function PageA() {
  return <><h3>Playground A</h3><p>Click the counters, then switch pages.</p><Link href="/playground/b">Go to B</Link></>;
}
