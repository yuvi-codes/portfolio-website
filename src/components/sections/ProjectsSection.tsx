"use client";

import { useEffect, useRef, useState } from "react";

interface ProjectsSectionProps {
  className?: string;
}

/* ── Reveal hook ───────────────────────────────────────────── */
function useReveal(refs: React.RefObject<HTMLElement | null>[], threshold = 0.15) {
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
    refs.forEach((r) => { if (r.current) observer.observe(r.current); });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
};

/* ── Tech pill ─────────────────────────────────────────────── */
function TechPill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        border: "1px solid var(--crimson)",
        color: "var(--crimson)",
        fontFamily: "var(--font-montserrat)",
        fontWeight: 600,
        fontSize: "12px",
        letterSpacing: "2px",
        padding: "3px 10px",
        borderRadius: "2px",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}

/* ── Button ────────────────────────────────────────────────── */
function ProjectButton({
  label,
  variant,
  href,
}: {
  label: string;
  variant: "outline" | "filled";
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        fontFamily: "var(--font-montserrat)",
        fontWeight: 600,
        fontSize: "15px",
        letterSpacing: "3px",
        textTransform: "uppercase",
        padding: "10px 24px",
        borderRadius: "2px",
        textDecoration: "none",
        transition: "opacity 0.2s ease",
        ...(variant === "outline"
          ? {
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              background: "transparent",
            }
          : {
              background: "var(--crimson)",
              color: "var(--cream)",
              border: "none",
            }),
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
    >
      {label}
    </a>
  );
}

/* ── Project card data ─────────────────────────────────────── */
interface Project {
  id: string;
  name: string;
  tags: string[];
  title: string;
  description: string;
  category: string;
  imageFirst: boolean;
  delay: number;
}

const PROJECTS: Project[] = [
  {
    id: "cardiorisk",
    name: "CardioRisk",
    tags: ["Python", "Scikit-learn", "Random Forest", "SHAP", "MAPIE"],
    title: "CardioRisk",
    description:
      "End-to-end cardiovascular risk prediction system trained on Framingham and UCI Cleveland datasets. Fairness-aware evaluation across demographic subgroups. SHAP explainability for per-patient feature contributions. MAPIE conformal prediction for calibrated confidence intervals.",
    category: "Machine Learning · Explainability · Clinical AI",
    imageFirst: true,
    delay: 200,
  },
  {
    id: "ai-knowledge-agent",
    name: "AI Knowledge Agent",
    tags: ["Python", "RAG", "LangChain", "ChromaDB", "LLM"],
    title: "AI Knowledge Agent",
    description:
      "RAG system that ingests PDFs, performs semantic chunking and vector embedding, and answers natural language queries with context-grounded responses. Supports Q&A, summarization, and structured extraction with hallucination-reducing pipelines.",
    category: "RAG · LangChain · Document Intelligence",
    imageFirst: false,
    delay: 400,
  },
];

/* ── Project card ──────────────────────────────────────────── */
function ProjectCard({
  project,
  animRef,
}: {
  project: Project;
  animRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [hovered, setHovered] = useState(false);

  const ImageBlock = (
    <div
      className="flex items-center justify-center"
      style={{
        flex: "0 0 40%",
        minHeight: "320px",
        background: "var(--dark)",
        position: "relative",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-staatliches)",
          fontSize: "24px",
          color: "var(--dim)",
          letterSpacing: "2px",
          textAlign: "center",
          padding: "24px",
        }}
      >
        {project.name}
      </span>
    </div>
  );

  const ContentBlock = (
    <div
      className="flex flex-col justify-center"
      style={{ flex: "0 0 60%", padding: "40px 36px" }}
    >
      {/* Tech tags */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: "20px" }}>
        {project.tags.map((tag) => (
          <TechPill key={tag} label={tag} />
        ))}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-staatliches)",
          fontSize: "42px",
          color: "var(--cream)",
          letterSpacing: "2px",
          lineHeight: 1.0,
          margin: "0 0 16px",
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 300,
          fontSize: "15px",
          color: "var(--muted)",
          lineHeight: 1.8,
          margin: "0 0 20px",
        }}
      >
        {project.description}
      </p>

      {/* Category tag */}
      <p
        className="uppercase"
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "4px",
          color: "var(--gold)",
          marginBottom: "28px",
        }}
      >
        {project.category}
      </p>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap">
        <ProjectButton label="GitHub ↗" variant="outline" href="#" />
        <ProjectButton label="Live Demo ↗" variant="filled" href="#" />
      </div>
    </div>
  );

  return (
    <div ref={animRef} data-delay={project.delay} style={HIDDEN}>
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
          overflow: "hidden",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.3s ease, border-color 0.3s ease",
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
            zIndex: 1,
            background: "linear-gradient(90deg, var(--crimson), var(--gold), transparent)",
          }}
        />

        {/* Two-column inner layout */}
        <div className="flex flex-col lg:flex-row" style={{ minHeight: "320px" }}>
          {project.imageFirst ? (
            <>
              {ImageBlock}
              {ContentBlock}
            </>
          ) : (
            <>
              <div className="lg:order-2">{ImageBlock}</div>
              <div className="lg:order-1">{ContentBlock}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────── */
export default function ProjectsSection({ className = "" }: ProjectsSectionProps) {
  const tagRef     = useRef<HTMLDivElement>(null);
  const h1Ref      = useRef<HTMLDivElement>(null);
  const h2Ref      = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const card1Ref   = useRef<HTMLDivElement>(null);
  const card2Ref   = useRef<HTMLDivElement>(null);

  useReveal(
    [tagRef, h1Ref, h2Ref, dividerRef, card1Ref, card2Ref] as React.RefObject<HTMLElement | null>[]
  );

  const cardRefs = [card1Ref, card2Ref];

  return (
    <section
      id="projects"
      className={`w-full ${className}`}
      style={{ backgroundColor: "var(--obsidian)" }}
      aria-labelledby="projects-heading"
    >
      {/* Gold rule */}
      <div style={{ borderTop: "1px solid rgba(201,168,76,0.12)", width: "100%" }} aria-hidden="true" />

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
            03 — SHIPPED WORK
          </p>
        </div>

        {/* Heading line 1 */}
        <div ref={h1Ref} data-delay="100" style={HIDDEN}>
          <h2
            id="projects-heading"
            style={{
              fontFamily: "var(--font-staatliches)",
              fontSize: "clamp(48px, 7vw, 88px)",
              color: "var(--cream)",
              lineHeight: 1.0,
              letterSpacing: "2px",
              margin: 0,
            }}
          >
            Things I&apos;ve
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
            Actually Built.
          </p>
        </div>

        {/* Divider */}
        <div ref={dividerRef} data-delay="300" style={HIDDEN}>
          <div
            style={{
              width: "80px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              margin: "24px 0 56px",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Project cards */}
        <div className="flex flex-col" style={{ gap: "40px" }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              animRef={cardRefs[i] as React.RefObject<HTMLDivElement | null>}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
