"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function login() {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/demo-login", { method: "POST" });
      if (!response.ok) throw new Error("Could not set demo cookie");
      router.push("/dashboard");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Login failed");
      setPending(false);
    }
  }

  return <section className="card">
    <h1>Demo login</h1>
    <p>Click to set the <code>demo-auth=1</code> cookie and enter the protected dashboard.</p>
    <button className="btn" disabled={pending} onClick={login}>{pending ? "Logging in..." : "Login"}</button>
    {error && <p className="error" role="alert">{error}</p>}
    <p className="muted">For routing practice only: this is not secure authentication.</p>
  </section>;
}
