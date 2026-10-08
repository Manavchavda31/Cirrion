/** Small line icons used in metrics, capability lists and process steps (24px grid, stroke follows currentColor). */
const paths: Record<string, string> = {
  layers: "M4 7.5 12 3l8 4.5-8 4.5-8-4.5Zm0 4.5 8 4.5 8-4.5M4 16.5 12 21l8-4.5",
  rocket: "M12 3c3 2 5 5.5 5 9.5L15 15H9l-2-2.5C7 8.5 9 5 12 3Zm-3 12-2 4 3-1m5-3 2 4-3-1m-2-9.5v.01",
  route: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 15V9a3 3 0 0 1 3-3h7M18 9v6a3 3 0 0 1-3 3H8",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  team: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0m1.5-9a3 3 0 1 0-1-5.8M17 14.2A5.5 5.5 0 0 1 21 20",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4",
  pen: "m4 20 1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1Zm9-13 3 3",
  code: "m8 8-4 4 4 4m8-8 4 4-4 4m-2.5-11-3 14",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-4-9 3 3 5-6",
  launch: "M5 19 19 5M19 5h-8m8 0v8",
  growth: "M4 19h16M6 15l4-4 3 3 5-6m0 0h-3.5M18 8v3.5",
  spark: "M12 3c.4 3.9 2.6 6.1 6.5 6.5-3.9.4-6.1 2.6-6.5 6.5-.4-3.9-2.6-6.1-6.5-6.5C9.4 9.1 11.6 6.9 12 3Z",
  monitor: "M3 5h18v11H3zM8 20h8m-4-4v4",
  server: "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01",
  db: "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3",
  cloud: "M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.2 9.4 4.3 4.3 0 0 0 7 18Z",
  handoff: "M4 12h10m-4-4 4 4-4 4M20 5v14",
  demo: "M3 5h18v11H3zM10 8.5v4l3.5-2-3.5-2ZM8 20h8",
  shield: "M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
};

export function Glyph({ name, className = "h-5 w-5", strokeWidth = 1.6 }: { name: string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={paths[name] ?? paths.spark} />
    </svg>
  );
}
