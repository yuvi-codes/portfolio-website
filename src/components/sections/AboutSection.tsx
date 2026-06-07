"use client";

import { useEffect, useRef, useState } from "react";

interface AboutSectionProps {
  className?: string;
}

/* ── Animation helper ──────────────────────────────────────── */
interface AnimatedItem {
  ref: React.RefObject<HTMLDivElement | null>;
  delay: number;
}

function useRevealOnScroll(items: AnimatedItem[]) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

const HIDDEN_STYLE: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
};

const INFO_ROWS = [
  { label: "EDUCATION", value: "New Horizon College of Engineering" },
  { label: "LOCATION",  value: "Bengaluru, India"                   },
  { label: "CGPA",      value: "8.15"                               },
  { label: "STATUS",    value: "Open to Opportunities"              },
];

export default function AboutSection({ className = "" }: AboutSectionProps) {
  const tagRef       = useRef<HTMLDivElement>(null);
  const heading1Ref  = useRef<HTMLDivElement>(null);
  const heading2Ref  = useRef<HTMLDivElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const bodyRef      = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);

  const [cardHovered, setCardHovered] = useState(false);

  useRevealOnScroll([
    { ref: tagRef,      delay: 0   },
    { ref: heading1Ref, delay: 100 },
    { ref: heading2Ref, delay: 200 },
    { ref: dividerRef,  delay: 300 },
    { ref: bodyRef,     delay: 400 },
    { ref: cardRef,     delay: 500 },
  ]);

  return (
    <section
      id="about"
      className={`w-full ${className}`}
      style={{ backgroundColor: "var(--obsidian)" }}
      aria-labelledby="about-heading"
    >
      {/* Gold rule above section */}
      <div style={{ borderTop: "1px solid rgba(201,168,76,0.12)", width: "100%" }} aria-hidden="true" />

      <div
        style={{ maxWidth: "1200px", padding: "100px 40px", margin: "0 auto", width: "100%" }}
      >
        {/* ── Two-column layout ────────────────────────────── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 lg:justify-between lg:items-start">
          
          {/* Left Column — Headings & Body */}
          <div style={{ flex: "0 0 55%", display: "flex", flexDirection: "column" }}>
            {/* ── Section tag ──────────────────────────────────── */}
            <div ref={tagRef} data-delay="0" style={HIDDEN_STYLE}>
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
                01 — WHO I AM
              </p>
            </div>

            {/* ── Heading line 1 ───────────────────────────────── */}
            <div ref={heading1Ref} data-delay="100" style={HIDDEN_STYLE}>
              <h2
                id="about-heading"
                style={{
                  fontFamily: "var(--font-staatliches)",
                  fontSize: "clamp(48px, 7vw, 88px)",
                  color: "var(--cream)",
                  lineHeight: 1.0,
                  letterSpacing: "2px",
                  margin: 0,
                }}
              >
                Builder.
              </h2>
            </div>

            {/* ── Heading line 2 ───────────────────────────────── */}
            <div ref={heading2Ref} data-delay="200" style={HIDDEN_STYLE}>
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
                Closer.
              </p>
            </div>

            {/* ── Gold divider ─────────────────────────────────── */}
            <div
              ref={dividerRef}
              data-delay="300"
              style={{
                ...HIDDEN_STYLE,
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out, width 0.8s ease-out",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                  margin: "24px 0",
                }}
                aria-hidden="true"
              />
            </div>

            {/* ── Body text ────────────────────────────────────── */}
            <div ref={bodyRef} data-delay="400" style={{ ...HIDDEN_STYLE }}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 300,
                  fontSize: "15px",
                  lineHeight: 1.9,
                  color: "var(--muted)",
                  maxWidth: "600px",
                }}
              >
                CS undergraduate in Data Science at NHCE Bengaluru with a CGPA of 8.15.
                I build and ship production AI systems — not prototypes, not demos, things
                that run in the real world. I have deployed mobile apps to the App Store
                and Play Store, built AI-powered assessment platforms with real-time
                proctoring, engineered RAG document agents, and designed voice AI workflows
                for lead reactivation. I think in systems, communicate in outcomes, and
                close in results. Aspiring Forward Deployed Engineer.
              </p>
            </div>
          </div>

          {/* Right Column — Info card */}
          <div
            ref={cardRef}
            data-delay="500"
            style={{ ...HIDDEN_STYLE, flex: "0 0 35%", marginTop: "10px" }}
          >
            <div
              onMouseEnter={() => setCardHovered(true)}
              onMouseLeave={() => setCardHovered(false)}
              style={{
                position: "relative",
                backgroundColor: "var(--charcoal)",
                border: cardHovered
                  ? "1px solid rgba(201,168,76,0.30)"
                  : "1px solid rgba(201,168,76,0.10)",
                borderRadius: "2px",
                padding: "32px",
                transform: cardHovered ? "translateY(-4px)" : "translateY(0)",
                transition: "transform 0.3s ease, border-color 0.3s ease",
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, var(--crimson), var(--gold), transparent)",
                }}
              />

              {/* Info rows */}
              <dl className="flex flex-col">
                {INFO_ROWS.map((row, idx) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1"
                    style={{
                      padding: "16px 0",
                      borderBottom:
                        idx < INFO_ROWS.length - 1
                          ? "1px solid rgba(201,168,76,0.08)"
                          : "none",
                    }}
                  >
                    <dt
                      className="uppercase"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 600,
                        fontSize: "12px",
                        letterSpacing: "3px",
                        color: "var(--dim)",
                      }}
                    >
                      {row.label}
                    </dt>
                    <dd
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 300,
                        fontSize: "15px",
                        color: "var(--cream)",
                        margin: 0,
                      }}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
