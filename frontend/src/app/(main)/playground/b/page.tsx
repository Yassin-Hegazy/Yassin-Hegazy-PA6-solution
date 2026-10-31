import Link from "next/link";

export default function PageB() {
  return <><h3>Playground B</h3><p>Did the layout value persist while the template reset?</p><Link href="/playground/a">Go to A</Link></>;
}
