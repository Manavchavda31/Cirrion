import { Reveal } from "@/components/ui/Reveal";
import { TeamCard } from "./TeamCard";
import type { TeamMember } from "@/content/types";

const habits = [
  ["Weekly working demos", "You see the product itself, not a status slide."],
  ["A shared roadmap", "Priorities and trade-offs are visible to you at all times."],
  ["Plain-language reporting", "Clear updates you can forward to your own stakeholders."],
];

/**
 * Team layout that stays balanced for any head-count. With a single member it becomes a founder feature
 * (portrait next to how the work is run) instead of one card stranded in a grid.
 */
export function TeamGrid({ team, compact = false }: { team: TeamMember[]; compact?: boolean }) {
  if (team.length === 1) {
    const m = team[0]!;
    return (
      <div className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-12">
        <Reveal className="w-full max-w-[420px] lg:col-span-4">
          <TeamCard member={m} compact={compact} />
        </Reveal>
        <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
          <p className="eyebrow">Founder-led</p>
          <p className="h2 mt-3 max-w-[22ch]">You work directly with the person who builds your product.</p>
          <ul className="rule-list mt-8">
            {habits.map(([t, b]) => (
              <li key={t} className="py-4">
                <p className="font-medium">{t}</p>
                <p className="mt-1 text-[0.9375rem] text-fg-2">{b}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    );
  }
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((m, i) => (
        <Reveal key={m.slug} delay={(i % 4) * 60}>
          <TeamCard member={m} compact={compact} />
        </Reveal>
      ))}
    </div>
  );
}
