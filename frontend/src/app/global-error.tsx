"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: 30 }}>
        <h1>Something went wrong</h1>
        <p role="alert">{error.message || "An unexpected error occurred."}</p>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
