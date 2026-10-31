"use client";

import { useState } from "react";

export default function Counter({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  return <button className="btn btn-secondary" onClick={() => setCount((current) => current + 1)}>
    {label}: {count}
  </button>;
}
