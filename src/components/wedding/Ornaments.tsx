import { cn } from "@/lib/utils";
import type React from "react";
import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

/* ------------------------------------------------------------------ */
/*  Reveal wrapper                                                     */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string | undefined;
  delay?: number | undefined;
  as?: "div" | "section" | "li" | "article" | "header" | "footer" | undefined;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      data-visible={visible ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Lotus                                                              */
/* ------------------------------------------------------------------ */

/** Elegant line-art lotus bloom. */
export function LotusLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    >
      <path d="M60 70c0-16 0-30 0-44" opacity=".45" />
      <path d="M60 70c-3-13 1-27 0-40 1 13 3 27 0 40Z" />
      <path d="M60 70c-9-9-16-20-20-33 9 7 17 19 20 33Z" />
      <path d="M60 70c9-9 16-20 20-33-9 7-17 19-20 33Z" />
      <path d="M60 70c-15-4-27-12-36-23 14 1 28 9 36 23Z" />
      <path d="M60 70c15-4 27-12 36-23-14 1-28 9-36 23Z" />
      <path d="M60 70c-18 2-34-1-48-8 15-5 33-4 48 8Z" opacity=".7" />
      <path d="M60 70c18 2 34-1 48-8-15-5-33-4-48 8Z" opacity=".7" />
    </svg>
  );
}

/** Softer, filled decorative lotus (used for background blooms). */
export function LotusSolid({
  className = "",
  style,
}: {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}) {
  return (
    <svg viewBox="0 0 120 84" className={className} style={style} aria-hidden="true">
      <g fill="currentColor">
        <path d="M60 78c-3-14 1-30 0-45 1 15 3 31 0 45Z" opacity=".85" />
        <path d="M60 78c-10-10-17-22-21-36 10 8 18 21 21 36Z" opacity=".7" />
        <path d="M60 78c10-10 17-22 21-36-10 8-18 21-21 36Z" opacity=".7" />
        <path d="M60 78c-16-4-29-13-38-25 15 1 30 10 38 25Z" opacity=".55" />
        <path d="M60 78c16-4 29-13 38-25-15 1-30 10-38 25Z" opacity=".55" />
        <path d="M60 78c-19 2-36-1-51-9 16-5 35-4 51 9Z" opacity=".4" />
        <path d="M60 78c19 2 36-1 51-9-16-5-35-4-51 9Z" opacity=".4" />
      </g>
    </svg>
  );
}

/** Tiny lotus bud, good for inline accents and list bullets. */
export function LotusBud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 21c-1-4 0-9 0-13 0 4 1 9 0 13Z" opacity=".9" />
      <path d="M12 21c-4-3-6-7-7-12 4 3 6 7 7 12Z" opacity=".7" />
      <path d="M12 21c4-3 6-7 7-12-4 3-6 7-7 12Z" opacity=".7" />
      <path d="M12 21c-5 0-9-1-12-3 4-2 9-1 12 3Z" opacity=".5" />
      <path d="M12 21c5 0 9-1 12-3-4-2-9-1-12 3Z" opacity=".5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Swans — exactly two, always rendered as a pair                     */
/* ------------------------------------------------------------------ */

/** A single graceful white swan, gold-outlined (mirror with `flip`). */
export function Swan({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 130 110"
      className={cn(className, flip && "-scale-x-100")}
      aria-hidden="true"
      fill="none"
    >
      {/* body */}
      <path
        d="M12 84C16 60 34 46 58 46c14 0 25 5 32 13-11-1-19 3-25 10-8 9-14 18-27 21-11 3-22 1-26-6Z"
        fill="var(--color-card)"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* raised wing */}
      <path
        d="M26 78c5-16 19-27 37-30-9 6-15 14-19 23-4 9-11 13-18 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        opacity=".7"
      />
      {/* tail feathers */}
      <path
        d="M13 78c-4-3-8-4-11-3 3 2 5 5 6 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".7"
      />
      {/* neck */}
      <path
        d="M90 60c-9-9-11-23-4-33 5-8 15-11 24-9"
        stroke="var(--color-card)"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M90 60c-9-9-11-23-4-33 5-8 15-11 24-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".85"
      />
      {/* head */}
      <circle
        cx="111"
        cy="19"
        r="7.5"
        fill="var(--color-card)"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* beak */}
      <path d="M118 19l11 3-11 4z" fill="currentColor" opacity=".85" />
      {/* eye */}
      <circle cx="112" cy="17" r="1.4" fill="currentColor" />
      {/* water ripple */}
      <path
        d="M6 92c12 5 24 7 38 7s28-2 40-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity=".4"
      />
    </svg>
  );
}

/**
 * The recurring motif: exactly two white swans facing each other,
 * their necks forming a heart.
 */
export function SwanPair({
  className = "",
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  const swan = "h-full w-auto text-gold drop-shadow-[0_3px_8px_oklch(0.36_0.115_19/0.18)]";
  return (
    <div
      className={cn("pointer-events-none flex items-end justify-center", className)}
      aria-hidden="true"
    >
      <Swan className={cn(swan, animated && "float-swan")} />
      <Swan flip className={cn(swan, "-ml-2", animated && "float-swan-alt")} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Kandyan-inspired ornaments                                         */
/* ------------------------------------------------------------------ */

/** Gold liyavel (creeper) corner flourish. */
export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    >
      <path d="M4 4c22 2 38 14 46 34" />
      <path d="M4 4c2 22 14 38 34 46" />
      <path d="M20 10c8 6 12 14 12 24-8-4-12-13-12-24Z" opacity=".75" />
      <path d="M10 20c6 8 14 12 24 12-4-8-13-12-24-12Z" opacity=".75" />
      <circle cx="52" cy="52" r="2.4" fill="currentColor" />
      <path d="M50 38c8 0 14 6 14 14" opacity=".6" />
      <path d="M38 50c0 8 6 14 14 14" opacity=".6" />
    </svg>
  );
}

/** Horizontal gold divider with a central lotus. */
export function LotusDivider({
  className = "",
  width = "w-56",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 text-primary", className)}
      aria-hidden="true"
    >
      <span className={cn("gold-rule", width, "max-w-[28vw]")} />
      <LotusLine className="h-6 w-9 shrink-0 opacity-90" />
      <span className={cn("gold-rule", width, "max-w-[28vw]")} />
    </div>
  );
}

/** Repeating Kandyan-inspired band, drawn with pure CSS gradients. */
export function KandyanBand({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-[6px] w-full opacity-70", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, color-mix(in oklab, var(--gold) 75%, transparent) 0 6px, transparent 6px 12px), linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 30%, transparent), transparent)",
        backgroundSize: "12px 2px, 100% 100%",
        backgroundPosition: "center, center",
        backgroundRepeat: "repeat-x, no-repeat",
      }}
    />
  );
}

/** Section heading with kicker + lotus divider. */
export function SectionHeading({
  kicker,
  title,
  className,
  langClass,
}: {
  kicker?: string | undefined;
  title: string;
  className?: string | undefined;
  langClass?: string | undefined;
}) {
  return (
    <Reveal className={cn("text-center", className)}>
      {kicker ? (
        <p
          className={cn(
            "font-display text-[10px] uppercase tracking-[0.34em] text-secondary/80 sm:text-xs dark:text-primary/90",
            langClass,
          )}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-2 font-script text-3xl leading-tight font-semibold text-gold sm:text-4xl md:text-5xl",
          langClass,
        )}
      >
        {title}
      </h2>
      <LotusDivider className="mt-4" width="w-24 sm:w-32" />
    </Reveal>
  );
}

/** Soft floating background lotus blooms (decorative, never over text). */
export function LotusField({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <LotusSolid className="float-lotus absolute -left-6 top-10 w-24 text-lotus/40 sm:w-32" />
      <LotusSolid
        className="float-lotus absolute -right-8 bottom-12 w-28 text-lotus/30 sm:w-40"
        style={{ animationDelay: "-3s" }}
      />
      <LotusLine className="absolute right-6 top-24 w-16 text-primary/20" />
    </div>
  );
}
