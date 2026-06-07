"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  className?: string;
}

/* ─── Framer Motion variants ─────────────────────────────── */
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function HeroSection({ className = "" }: HeroSectionProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Hold text for 2.5s while the video plays, then animate in
    const t = setTimeout(() => setAnimate(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className={`relative flex items-center justify-center min-h-[100svh] w-full overflow-hidden ${className}`}
      style={{ backgroundColor: "var(--obsidian)" }}
      aria-label="Hero section"
    >
      {/* ── Background video — plays once, freezes on last frame ── */}
      <video
        src="/hero-bg-video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        /* No `loop` — browser naturally holds the last decoded frame */
        className="absolute inset-0 w-full h-full pointer-events-none object-cover object-[75%_center] md:object-center"
        aria-hidden="true"
      />

      {/* ── Dark scrim — makes text legible over any video frame ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgba(10,10,8,0.52)" }}
        aria-hidden="true"
      />

      {/* ── Radial gold glow ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ───────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-[1200px] pl-[12vw] pr-4 md:px-10 py-20 md:py-[100px]"
        variants={containerVariant}
        initial="hidden"
        animate={animate ? "visible" : "hidden"}
      >

        {/* 3. Crimson location tag (Moved to top) */}
        <motion.p
          variants={fadeUpVariant}
          className="mb-4 md:mb-5 uppercase max-w-[280px] md:max-w-none leading-relaxed"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 600,
            fontSize: "clamp(9px, 2.5vw, 10px)",
            letterSpacing: "6px",
            color: "var(--crimson)",
          }}
        >
          Bengaluru, India - Open to Opportunities
        </motion.p>

        {/* 2. Name — line 1 */}
        <motion.h1
          variants={fadeUpVariant}
          className="leading-none tracking-[4px] select-none"
          style={{
            fontFamily: "var(--font-staatliches)",
            fontSize: "clamp(48px, 14vw, 148px)",
            color: "var(--cream)",
            lineHeight: 0.92,
            letterSpacing: "4px",
          }}
        >
          YUVRAJ
        </motion.h1>

        {/* 2. Name — line 2 */}
        <motion.div
          variants={fadeUpVariant}
          className="select-none"
          style={{
            fontFamily: "var(--font-staatliches)",
            fontSize: "clamp(48px, 14vw, 148px)",
            color: "var(--cream)",
            lineHeight: 0.92,
            letterSpacing: "4px",
          }}
          aria-hidden="true"
        >
          UMANG M
        </motion.div>

        {/* 1. Subtitle tag (Moved below name) */}
        <motion.p
          variants={fadeUpVariant}
          className="mt-3 md:mt-2 max-w-[320px] md:max-w-none leading-snug"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(18px, 5vw, 20px)",
            color: "var(--gold)",
          }}
        >
          Forward Deployed Engineer&nbsp;&middot;&nbsp;AI Builder&nbsp;&middot;&nbsp;Systems Thinker
        </motion.p>

        {/* 4. Gold divider */}
        <motion.div
          variants={fadeUpVariant}
          className="md:bg-gradient-to-r md:from-transparent md:via-[var(--gold)] md:to-transparent"
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(90deg, var(--gold), transparent)",
            margin: "32px 0",
          }}
          aria-hidden="true"
        />

        {/* 5. Metadata columns */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col gap-6 sm:flex-row sm:gap-12"
        >
          {/* Column 1 — Role */}
          <div className="flex flex-col gap-1">
            <span
              className="uppercase"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "3px",
                color: "var(--dim)",
              }}
            >
              ROLE
            </span>
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 300,
                fontSize: "14px",
                color: "var(--cream)",
              }}
            >
              AI Engineer &amp; FDE
            </span>
          </div>

          {/* Column 2 — Stack */}
          <div className="flex flex-col gap-1">
            <span
              className="uppercase"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "3px",
                color: "var(--dim)",
              }}
            >
              STACK
            </span>
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 300,
                fontSize: "14px",
                color: "var(--cream)",
              }}
            >
              Python&nbsp;&middot;&nbsp;LangChain&nbsp;&middot;&nbsp;RAG&nbsp;&middot;&nbsp;Agents
            </span>
          </div>

          {/* Column 3 — Status */}
          <div className="flex flex-col gap-1">
            <span
              className="uppercase"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "3px",
                color: "var(--dim)",
              }}
            >
              STATUS
            </span>
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 300,
                fontSize: "14px",
                color: "var(--gold)",
              }}
            >
              Available for Hire
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
