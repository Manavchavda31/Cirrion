import Image from "next/image";
import type { TeamMember } from "@/content/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Team card. Falls back to a plain monogram tile until a real photo is provided. */
export function TeamCard({ member: m, compact }: { member: TeamMember; compact?: boolean }) {
  return (
    <article>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-line bg-[linear-gradient(140deg,#f3f1ff,#eaf2ff)]">
        {m.photo ? (
          <Image src={m.photo} alt={`Portrait of ${m.name}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover object-top" />
        ) : (
          <span aria-hidden className="absolute inset-0 grid place-items-center font-display text-[4.5rem] font-extrabold tracking-[-0.05em] text-indigo-deep/80">
            {initials(m.name)}
          </span>
        )}
        {m.placeholder && <span className="tag absolute top-3 left-3">Placeholder</span>}
      </div>
      <h3 className="mt-5 text-[1.5rem] font-bold tracking-[-0.03em]">{m.name}</h3>
      <p className="meta mt-0.5">{m.role}</p>
      {!compact && (
        <>
          <p className="mt-4 max-w-[44ch] text-fg-2">{m.bio}</p>
          <p className="mt-3 text-[0.9375rem] text-fg-3">
            <span className="font-medium text-fg-2">Specialises in</span> {m.specialization}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
            {m.skills.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
          {m.linkedin && (
            <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="link-u mt-5 inline-block text-[0.9375rem]">
              LinkedIn <span aria-hidden>↗</span>
              <span className="sr-only"> profile of {m.name} (opens in a new tab)</span>
            </a>
          )}
        </>
      )}
    </article>
  );
}
