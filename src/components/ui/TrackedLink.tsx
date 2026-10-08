"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & { event?: string; eventLabel?: string };

/** Link that reports a CTA/nav click. Use for anything worth measuring. */
export function TrackedLink({ event = "cta_click", eventLabel, onClick, children, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        track(event, { label: eventLabel ?? (typeof children === "string" ? children : String(rest.href)), href: String(rest.href) });
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
