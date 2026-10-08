import { Cta } from "@/components/ui/Cta";

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center px-[var(--gutter)] py-24 text-center">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="h1-page mt-4">This page isn&apos;t here.</h1>
        <p className="lead mx-auto mt-5 max-w-[36ch]">The link may be old or mistyped. Let&apos;s get you somewhere useful.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Cta href="/">Back home</Cta>
          <Cta href="/work" variant="ghost" arrow={false}>
            See our work
          </Cta>
        </div>
      </div>
    </section>
  );
}
