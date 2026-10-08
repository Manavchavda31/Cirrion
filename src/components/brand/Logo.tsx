import Image from "next/image";
import { cn } from "@/lib/cn";

/** Cirrion logo: the circuit-head mark and the wordmark, supplied as transparent PNGs in /public/brand. */
export function LogoMark({ className, light }: { className?: string; light?: boolean }) {
  return <Image src={`/brand/${light ? "mark-light" : "mark"}.png`} alt="" width={258} height={262} className={cn("h-11 w-auto", className)} priority />;
}

export function Logo({ className, light, showWord = true }: { className?: string; light?: boolean; showWord?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark light={light} />
      {showWord ? (
        <Image src={`/brand/${light ? "word-light" : "word"}.png`} alt="Cirrion" width={303} height={54} className="h-[22px] w-auto" priority />
      ) : (
        <span className="sr-only">Cirrion</span>
      )}
    </span>
  );
}
