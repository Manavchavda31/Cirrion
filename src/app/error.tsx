"use client";

import { useEffect } from "react";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="page-top grid min-h-[80svh] place-items-center px-[var(--gutter)] pb-24 text-center">
      <div>
        <p className="eyebrow">Something went wrong</p>
        <h1 className="h1-page mt-4">That didn&apos;t load.</h1>
        <p className="lead mx-auto mt-5 max-w-[34ch]">An unexpected error occurred. Try again, and if it keeps happening let us know.</p>
        <button type="button" onClick={reset} className="btn btn-primary mt-8">
          <span>Try again</span>
        </button>
      </div>
    </section>
  );
}
