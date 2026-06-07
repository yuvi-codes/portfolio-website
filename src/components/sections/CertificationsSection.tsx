"use client";

import { useEffect, useRef, useState } from "react";

interface CertificationsSectionProps {
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
              el.style.transform = "translateY(0)";
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
const CERTS = [
  {
    name: "The Complete Python Pro Bootcamp",
    issuer: "Udemy",
    description:
      "Python programming, data visualization, web development, and GUI application development.",
  },
  {
    name: "Developing Back-End Apps with Node.js and Express",
    issuer: "IBM",
    description:
      "RESTful API design, middleware, and server-side application development.",
  },
  {
    name: "Getting Started with Git and GitHub",
    issuer: "IBM",
    description:
      "Version control fundamentals, branching strategies, and collaborative development workflows.",
  },
  {
    name: "Principles of UI/UX Design",
    issuer: "Meta",
    description:
      "User-centered design methodology, wireframing, and interface evaluation.",
  },
];

/* ── Cert card ──────────────────────────────────────────────── */
function CertCard({
  cert,
  animRef,
  delay,
}: {
  cert: (typeof CERTS)[number];
  animRef: React.RefObject<HTMLDivElement | null>;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={animRef} data-delay={delay} style={HIDDEN}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          backgroundColor: "var(--charcoal)",
          border: hovered
            ? "1px solid rgba(201,168,76,0.30)"
            : "1px solid rgba(201,168,76,0.10)",
          borderRadius: "2px",
          padding: "32px",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.3s ease, border-color 0.3s ease",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Top accent */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, var(--crimson), var(--gold), transparent)",
          }}
        />

        {/* Issuer logo placeholder */}
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "var(--dark)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "var(--font-staatliches)",
              fontSize: "20px",
              color: "var(--gold)",
              lineHeight: 1,
            }}
          >
            {cert.issuer[0]}
          </span>
        </div>

        {/* Cert name */}
        <h3
          style={{
            fontFamily: "var(--font-staatliches)",
            fontSize: "22px",
            color: "var(--cream)",
            letterSpacing: "1px",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {cert.name}
        </h3>

        {/* Issuer */}
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 600,
            fontSize: "15px",
            letterSpacing: "3px",
            color: "var(--crimson)",
            margin: "8px 0 0",
          }}
        >
          {cert.issuer}
        </p>

        {/* Subtle divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            backgroundColor: "rgba(201,168,76,0.08)",
            margin: "12px 0",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 300,
            fontSize: "15px",
            color: "var(--muted)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {cert.description}
        </p>
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
export default function CertificationsSection({
  className = "",
}: CertificationsSectionProps) {
  const tagRef     = useRef<HTMLDivElement>(null);
  const h1Ref      = useRef<HTMLDivElement>(null);
  const h2Ref      = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const cardRefs = useRef(
    CERTS.map(() => ({ current: null as HTMLDivElement | null }))
  );

  useReveal(
    [tagRef, h1Ref, h2Ref, dividerRef] as React.RefObject<HTMLElement | null>[]
  );
  useReveal(
    cardRefs.current as unknown as React.RefObject<HTMLElement | null>[]
  );

  return (
    <section
      id="certifications"
      className={`w-full ${className}`}
      style={{ backgroundColor: "var(--obsidian)" }}
      aria-labelledby="certifications-heading"
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
            05 — CREDENTIALS
          </p>
        </div>

        {/* Heading line 1 */}
        <div ref={h1Ref} data-delay="100" style={HIDDEN}>
          <h2
            id="certifications-heading"
            style={{
              fontFamily: "var(--font-staatliches)",
              fontSize: "clamp(48px, 7vw, 88px)",
              color: "var(--cream)",
              lineHeight: 1.0,
              letterSpacing: "2px",
              margin: 0,
            }}
          >
            Continuously
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
            Upskilling.
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
              margin: "24px 0 48px",
            }}
            aria-hidden="true"
          />
        </div>

        {/* 2-col grid */}
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          style={{ gap: "24px" }}
        >
          {CERTS.map((cert, i) => (
            <CertCard
              key={cert.name}
              cert={cert}
              animRef={
                cardRefs.current[i] as React.RefObject<HTMLDivElement | null>
              }
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
