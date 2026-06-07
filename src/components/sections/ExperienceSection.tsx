"use client";

import { useEffect, useRef } from "react";

interface ExperienceSectionProps {
  className?: string;
}

/* ── Reveal hook ────────────────────────────────────────────── */
function useReveal(
  refs: React.RefObject<HTMLElement | null>[],
  threshold = 0.15
) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform =
                el.dataset.scaley === "true" ? "scaleY(1)" : "translateY(0)";
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );
    refs.forEach((r) => {
      if (r.current) observer.observe(r.current);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
};

/* ── Data ───────────────────────────────────────────────────── */
const ENTRIES = [
  {
    company: "LS OptimAIze",
    role: "Project Execution & Technical Operations Associate",
    date: "Jul 2025 – Mar 2026",
    bullets: [
      "Owned full client lifecycle: outreach, sales meetings, deal closing, onboarding, delivery, post-launch maintenance",
      "Shipped a production React Native mobile app for a real estate firm with RBAC, AWS S3, MongoDB — live on App Store and Play Store",
      "Built an AI-powered student assessment platform with MediaPipe proctoring, OpenAI Whisper verbal scoring, multi-role RBAC — Next.js, NestJS, MongoDB",
      "Built AI voice agents for lead reactivation (Omnidimension, VAPI, Synthflow) and RAG chatbots on company knowledge bases",
    ],
  },
  {
    company: "Business & IT Club, NHCE",
    role: "Program Vice Chair",
    date: "Oct 2024 – Oct 2025",
    bullets: [
      "Led technical events, workshops, and industry sessions for the club",
    ],
  },
];

/* ── Single timeline entry ──────────────────────────────────── */
function TimelineEntry({
  entry,
  lineRef,
  contentRef,
  lineDelay,
  contentDelay,
}: {
  entry: (typeof ENTRIES)[number];
  lineRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  lineDelay: number;
  contentDelay: number;
}) {
  return (
    <div className="relative flex" style={{ paddingLeft: "40px" }}>
      {/* Vertical timeline line — draws downward via scaleY */}
      <div
        ref={lineRef}
        data-delay={lineDelay}
        data-scaley="true"
        style={{
          position: "absolute",
          left: "3px",
          top: "16px",
          bottom: "-64px",
          width: "1px",
          backgroundColor: "rgba(201,168,76,0.25)",
          opacity: 0,
          transform: "scaleY(0)",
          transformOrigin: "top center",
          transition: "opacity 0.6s ease-out, transform 0.8s ease-out",
        }}
        aria-hidden="true"
      />

      {/* Diamond dot marker */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "16px",
          width: "8px",
          height: "8px",
          backgroundColor: "var(--gold)",
          transform: "rotate(45deg)",
          flexShrink: 0,
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Entry content */}
      <div
        ref={contentRef}
        data-delay={contentDelay}
        style={{ ...HIDDEN, flex: 1 }}
      >
        {/* Company */}
        <h3
          style={{
            fontFamily: "var(--font-staatliches)",
            fontSize: "28px",
            color: "var(--cream)",
            letterSpacing: "1px",
            lineHeight: 1.1,
            margin: "0 0 6px",
          }}
        >
          {entry.company}
        </h3>

        {/* Role */}
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 600,
            fontSize: "15px",
            letterSpacing: "2px",
            color: "var(--gold)",
            margin: "0 0 6px",
          }}
        >
          {entry.role}
        </p>

        {/* Date */}
        <p
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "15px",
            color: "var(--dim)",
            margin: "0 0 20px",
            letterSpacing: "1px",
          }}
        >
          {entry.date}
        </p>

        {/* Bullets */}
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {entry.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-3"
              style={{ marginBottom: "10px" }}
            >
              <span
                style={{
                  color: "var(--crimson)",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 700,
                  fontSize: "15px",
                  lineHeight: 1.8,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                •
              </span>
              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 300,
                  fontSize: "15px",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                }}
              >
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
export default function ExperienceSection({
  className = "",
}: ExperienceSectionProps) {
  const tagRef     = useRef<HTMLDivElement>(null);
  const h1Ref      = useRef<HTMLDivElement>(null);
  const h2Ref      = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  // Per-entry refs
  const line1Ref    = useRef<HTMLDivElement>(null);
  const content1Ref = useRef<HTMLDivElement>(null);
  const line2Ref    = useRef<HTMLDivElement>(null);
  const content2Ref = useRef<HTMLDivElement>(null);

  useReveal(
    [
      tagRef,
      h1Ref,
      h2Ref,
      dividerRef,
      line1Ref,
      content1Ref,
      line2Ref,
      content2Ref,
    ] as React.RefObject<HTMLElement | null>[]
  );

  return (
    <section
      id="experience"
      className={`w-full ${className}`}
      style={{ backgroundColor: "var(--obsidian)" }}
      aria-labelledby="experience-heading"
    >
      {/* Gold rule */}
      <div
        style={{ borderTop: "1px solid rgba(201,168,76,0.12)", width: "100%" }}
        aria-hidden="true"
      />

      <div
        style={{ maxWidth: "1200px", padding: "100px 40px", margin: "0 auto", width: "100%" }}
      >
        {/* Tag */}
        <div ref={tagRef} data-delay="0" style={HIDDEN}>
          <p
            className="uppercase"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "5px",
              color: "var(--crimson)",
              marginBottom: "20px",
            }}
          >
            04 — WHERE I&apos;VE WORKED
          </p>
        </div>

        {/* Heading line 1 */}
        <div ref={h1Ref} data-delay="100" style={HIDDEN}>
          <h2
            id="experience-heading"
            style={{
              fontFamily: "var(--font-staatliches)",
              fontSize: "clamp(48px, 7vw, 88px)",
              color: "var(--cream)",
              lineHeight: 1.0,
              letterSpacing: "2px",
              margin: 0,
            }}
          >
            Real Work.
          </h2>
        </div>

        {/* Heading line 2 */}
        <div ref={h2Ref} data-delay="200" style={HIDDEN}>
          <p
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-staatliches)",
              fontSize: "clamp(48px, 7vw, 88px)",
              color: "var(--gold)",
              lineHeight: 1.0,
              letterSpacing: "2px",
              margin: 0,
            }}
          >
            Real Clients.
          </p>
        </div>

        {/* Gold divider */}
        <div ref={dividerRef} data-delay="300" style={HIDDEN}>
          <div
            style={{
              width: "80px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, var(--gold), transparent)",
              margin: "24px 0 64px",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Timeline entries */}
        <div className="flex flex-col" style={{ gap: "64px" }}>
          <TimelineEntry
            entry={ENTRIES[0]}
            lineRef={line1Ref as React.RefObject<HTMLDivElement | null>}
            contentRef={content1Ref as React.RefObject<HTMLDivElement | null>}
            lineDelay={400}
            contentDelay={500}
          />
          <TimelineEntry
            entry={ENTRIES[1]}
            lineRef={line2Ref as React.RefObject<HTMLDivElement | null>}
            contentRef={content2Ref as React.RefObject<HTMLDivElement | null>}
            lineDelay={600}
            contentDelay={700}
          />
        </div>
      </div>
    </section>
  );
}
