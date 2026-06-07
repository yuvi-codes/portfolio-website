"use client";

import { useEffect, useRef, useState } from "react";

interface ContactSectionProps {
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

/* ── Contact card data ──────────────────────────────────────── */
const CARDS = [
  {
    label: "EMAIL",
    value: "saiumangm@gmail.com",
    href: "mailto:saiumangm@gmail.com",
  },
  {
    label: "LINKEDIN",
    value: "yuvraj-umang-m",
    href: "https://linkedin.com/in/yuvraj-umang-m",
  },
  {
    label: "GITHUB",
    value: "yuvi-codes",
    href: "https://github.com/yuvi-codes",
  },
];

/* ── Contact card ───────────────────────────────────────────── */
function ContactCard({
  card,
  animRef,
  delay,
}: {
  card: (typeof CARDS)[number];
  animRef: React.RefObject<HTMLAnchorElement | null>;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={animRef as unknown as React.RefObject<HTMLDivElement>} data-delay={delay} style={{ ...HIDDEN, flex: "1 1 0" }}>
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "var(--charcoal)",
          border: hovered
            ? "1px solid rgba(201,168,76,0.30)"
            : "1px solid rgba(201,168,76,0.10)",
          borderRadius: "2px",
          padding: "28px",
          textDecoration: "none",
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

        {/* Arrow icon — top right */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            fontFamily: "var(--font-montserrat)",
            fontSize: "15px",
            color: "var(--gold)",
            lineHeight: 1,
          }}
        >
          ↗
        </span>

        {/* Label */}
        <span
          className="uppercase"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "3px",
            color: "var(--dim)",
            marginBottom: "10px",
            marginTop: "4px",
          }}
        >
          {card.label}
        </span>

        {/* Value */}
        <span
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 300,
            fontSize: "15px",
            color: "var(--cream)",
            wordBreak: "break-word",
          }}
        >
          {card.value}
        </span>
      </a>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
export default function ContactSection({ className = "" }: ContactSectionProps) {
  const tagRef     = useRef<HTMLDivElement>(null);
  const h1Ref      = useRef<HTMLDivElement>(null);
  const h2Ref      = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bodyRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  const cardRefs = useRef(
    CARDS.map(() => ({ current: null as HTMLAnchorElement | null }))
  );

  const [ctaHovered, setCtaHovered] = useState(false);

  useReveal(
    [tagRef, h1Ref, h2Ref, dividerRef, bodyRef, ctaRef] as React.RefObject<HTMLElement | null>[]
  );
  useReveal(
    cardRefs.current as unknown as React.RefObject<HTMLElement | null>[]
  );

  return (
    <section
      id="contact"
      className={`w-full ${className}`}
      style={{ backgroundColor: "var(--obsidian)" }}
      aria-labelledby="contact-heading"
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
            06 — LET&apos;S WORK
          </p>
        </div>

        {/* Heading line 1 */}
        <div ref={h1Ref} data-delay="100" style={HIDDEN}>
          <h2
            id="contact-heading"
            style={{
              fontFamily: "var(--font-staatliches)",
              fontSize: "clamp(48px, 7vw, 88px)",
              color: "var(--cream)",
              lineHeight: 1.0,
              letterSpacing: "2px",
              margin: 0,
            }}
          >
            Open To
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
            Opportunities.
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
              margin: "24px 0",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Body text */}
        <div ref={bodyRef} data-delay="400" style={HIDDEN}>
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
              fontSize: "15px",
              lineHeight: 1.9,
              color: "var(--muted)",
              maxWidth: "560px",
              marginBottom: "48px",
            }}
          >
            Forward Deployed Engineer roles, AI engineering positions, and
            high-impact consulting engagements. Based in Bengaluru. Open to
            relocation and remote.
          </p>
        </div>

        {/* Contact cards row */}
        <div className="flex flex-col gap-5 sm:flex-row" style={{ gap: "20px" }}>
          {CARDS.map((card, i) => (
            <ContactCard
              key={card.label}
              card={card}
              animRef={
                cardRefs.current[i] as React.RefObject<HTMLAnchorElement | null>
              }
              delay={500 + i * 100}
            />
          ))}
        </div>

        {/* CTA button */}
        <div
          ref={ctaRef}
          data-delay="850"
          style={{ ...HIDDEN, display: "flex", justifyContent: "center", marginTop: "48px" }}
        >
          <a
            href="https://drive.google.com/file/d/1hrg_isPoOnj0gmUDyI91hIpkn0MUYYGS/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              fontSize: "15px",
              letterSpacing: "4px",
              color: "var(--cream)",
              background: ctaHovered ? "#A0302A" : "var(--crimson)",
              border: "none",
              padding: "16px 48px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "background 0.3s ease",
              cursor: "pointer",
            }}
          >
            Download Resume ↓
          </a>
        </div>
      </div>
    </section>
  );
}
