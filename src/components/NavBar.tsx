"use client";

import { useEffect, useRef, useState } from "react";

interface NavItem {
  number: string;
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { number: "01", label: "About",         id: "about"          },
  { number: "02", label: "Skills",        id: "skills"         },
  { number: "03", label: "Projects",      id: "projects"       },
  { number: "04", label: "Experience",    id: "experience"     },
  { number: "05", label: "Certifications",id: "certifications" },
  { number: "06", label: "Contact",       id: "contact"        },
];

interface NavBarProps {
  className?: string;
}

export default function NavBar({ className = "" }: NavBarProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setActiveId(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* ─── DESKTOP NAV ─── */}
      <nav
        className={`hidden md:flex sticky top-0 z-[100] items-center ${className}`}
        style={{
          height: "52px",
          backgroundColor: "var(--charcoal)",
          borderTop: "1px solid rgba(201,168,76,0.12)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
        }}
        aria-label="Desktop navigation"
      >
        <div
          className="w-full flex items-center justify-between"
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                id={`nav-${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="group relative flex items-center gap-[4px] no-underline select-none"
                style={{ textDecoration: "none" }}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Number prefix */}
                <span
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "13px",
                    color: "var(--crimson)",
                    lineHeight: 1,
                  }}
                >
                  {item.number}
                </span>

                {/* Label */}
                <span
                  className="uppercase transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    fontSize: "12px",
                    letterSpacing: "3px",
                    color: isActive ? "var(--gold)" : "var(--muted)",
                  }}
                >
                  {item.label}
                </span>

                {/* Active / hover bottom border */}
                <span
                  className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                  style={{
                    height: "1px",
                    bottom: "-17px",
                    backgroundColor: "var(--gold)",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                  }}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>
      </nav>

      {/* ─── MOBILE NAV (Fixed Button + Fullscreen Overlay) ─── */}
      <div className="md:hidden">
        {/* Fixed Hamburger Button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-6 right-6 z-[150] w-14 h-14 rounded-full border border-[rgba(201,168,76,0.4)] flex items-center justify-center bg-[#080808] shadow-2xl transition-transform active:scale-95"
          aria-label="Open mobile menu"
          style={{
            opacity: isMobileOpen ? 0 : 1,
            pointerEvents: isMobileOpen ? "none" : "auto",
          }}
        >
          <div className="flex flex-col gap-[6px] items-end">
            <div className="h-[1.5px] w-6 bg-[var(--gold)]"></div>
            <div className="h-[1.5px] w-4 bg-[var(--gold)]"></div>
          </div>
        </button>

        {/* Fullscreen Overlay */}
        <div
          className={`fixed inset-0 bg-[#080808] z-[200] transition-opacity duration-300 flex flex-col ${
            isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Overlay Top Bar */}
          <div className="flex justify-between items-center w-full px-6 py-6">
            <span
              style={{
                fontFamily: "var(--font-staatliches)",
                color: "var(--cream)",
                fontSize: "24px",
                letterSpacing: "2px",
                lineHeight: 1,
              }}
            >
              YUM
            </span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="w-14 h-14 rounded-full border border-[rgba(201,168,76,0.4)] flex items-center justify-center bg-[#080808] transition-transform active:scale-95"
              aria-label="Close mobile menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Big Menu Links */}
          <div className="flex flex-col items-end justify-center flex-1 px-10 gap-6 pb-24">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className="group flex items-center text-right transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  <span
                    className="uppercase transition-colors duration-300 select-none"
                    style={{
                      fontFamily: "var(--font-staatliches)",
                      fontSize: "42px",
                      lineHeight: 1.1,
                      letterSpacing: "4px",
                      color: isActive ? "var(--gold)" : "var(--cream)",
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hover styles injected via a global style tag */}
      <style>{`
        a[id^="nav-"]:hover span:last-of-type {
          color: var(--gold) !important;
        }
        a[id^="nav-"]:hover span:nth-of-type(2) {
          color: var(--gold) !important;
        }
      `}</style>
    </>
  );
}
