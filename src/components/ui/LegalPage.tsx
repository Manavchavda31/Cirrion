import { Breadcrumbs } from "./Breadcrumbs";

type Section = { h: string; p: string[] };

/** Shared shell for policy pages. Content lives in each route as plain data. */
export function LegalPage({ title, path, updated, intro, sections }: { title: string; path: string; updated: string; intro: string; sections: Section[] }) {
  return (
    <>
      <section className="band border-t-0">
        <div className="container-x py-12 md:py-16">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1 className="h1-page mt-6">{title}</h1>
          <p className="meta mt-4">Last updated {updated}</p>
        </div>
      </section>
      <section className="section-tight">
        <div className="container-x">
          <div className="article">
            <p className="rounded-md border border-line bg-bg-2 p-4 text-[0.9375rem] text-fg-2">
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
