"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export default function TodoModal({ children }: { children: ReactNode }) {
  const router = useRouter();
  return <div className="modal-backdrop" role="presentation" onClick={() => router.back()}>
    <section className="modal" role="dialog" aria-modal="true" aria-label="Todo details" onClick={(event) => event.stopPropagation()}>
      {children}
      <button className="btn btn-secondary" onClick={() => router.back()} style={{ marginTop: 14 }}>Close modal</button>
    </section>
  </div>;
}
