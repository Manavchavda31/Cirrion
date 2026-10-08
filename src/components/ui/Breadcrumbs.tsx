import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-[0.875rem] text-fg-3">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-fg-2">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="transition-colors hover:text-accent">
                    {c.name}
                  </Link>
                )}
                {!last && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}
