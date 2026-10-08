import { Breadcrumbs } from "./Breadcrumbs";

type Section = { h: string; p: string[] };

/** Shared shell for policy pages. Content lives in each route as plain data. */
export function LegalPage({ title, path, updated, intro, sections }: { title: string; path: string; updated: string; intro: string; sections: Section[] }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,#fafaf8,#ffffff)]">
        <div aria-hidden className="absolute -top-[30%] right-[-10%] -z-10 h-[90%] w-[70%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(243_241_255/0.95),rgb(234_242_255/0.5)_60%,transparent)]" />
        <div className="container-x page-top pb-12 md:pb-16">
          <div className="mt-4">
            <Breadcrumbs items={[{ name: title, path }]} />
          </div>
          <h1 className="h1-page mt-8">{title}</h1>
          <p className="meta mt-4">Last updated {updated}</p>
        </div>
      </section>
      <section className="section-tight">
        <div className="container-x">
          <div className="article">
            <p className="rounded-xl border border-line bg-bg-3 p-4 text-[0.9375rem] text-fg-2">
              Draft for launch. Have this reviewed by qualified legal counsel and add your registered company details before going live.
            </p>
            <p className="text-[1.25rem] text-fg">{intro}</p>
            {sections.map((s) => (
              <div key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((t, i) => (
                  <p key={i} className={i ? "mt-4" : "mt-3"}>
                    {t}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
