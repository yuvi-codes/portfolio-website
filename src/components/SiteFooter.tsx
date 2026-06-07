"use client";

interface SiteFooterProps {
  className?: string;
}

export default function SiteFooter({ className = "" }: SiteFooterProps) {
  return (
    <footer
      className={`w-full text-center ${className}`}
      style={{
        backgroundColor: "var(--obsidian)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      <div
        className="flex flex-col lg:flex-row gap-20 lg:gap-12 justify-between items-center lg:items-end text-left"
        style={{ maxWidth: "1200px", padding: "80px 40px", margin: "0 auto", width: "100%" }}
      >
        {/* Left Column: Free-state Enquiry Form */}
        <div className="w-full lg:w-[50%]">
          <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Y O U R   N A M E" 
              className="w-full bg-transparent border-b border-[rgba(201,168,76,0.3)] text-[var(--cream)] pb-5 pt-2 outline-none focus:border-[var(--gold)] transition-colors font-montserrat text-[11px] placeholder-[rgba(201,168,76,0.8)] uppercase tracking-[3px]" 
              required 
            />
            
            <input 
              type="email" 
              placeholder="Y O U R   E M A I L" 
              className="w-full bg-transparent border-b border-[rgba(201,168,76,0.3)] text-[var(--cream)] pb-5 pt-2 outline-none focus:border-[var(--gold)] transition-colors font-montserrat text-[11px] placeholder-[rgba(201,168,76,0.8)] uppercase tracking-[3px]" 
              required 
            />
            
            <input 
              type="text" 
              placeholder="S U B J E C T" 
              className="w-full bg-transparent border-b border-[rgba(201,168,76,0.3)] text-[var(--cream)] pb-5 pt-2 outline-none focus:border-[var(--gold)] transition-colors font-montserrat text-[11px] placeholder-[rgba(201,168,76,0.8)] uppercase tracking-[3px]" 
              required 
            />

            <input 
              type="text" 
              placeholder="M E S S A G E" 
              className="w-full bg-transparent border-b border-[rgba(201,168,76,0.3)] text-[var(--cream)] pb-5 pt-2 outline-none focus:border-[var(--gold)] transition-colors font-montserrat text-[11px] placeholder-[rgba(201,168,76,0.8)] uppercase tracking-[3px]" 
              required 
            />
            
            <div className="mt-8">
              <button 
                type="submit" 
                className="w-full bg-[var(--gold)] text-black font-montserrat font-semibold text-[15px] tracking-[4px] px-10 py-6 uppercase transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_35px_rgba(201,168,76,0.4)] hover:bg-[#d4af37]"
              >
                Get In Touch
              </button>
              <p className="text-center text-[var(--gold)] text-[12px] font-montserrat opacity-70 mt-6 tracking-wide px-4">
                I&apos;m currently seeking new grad opportunities and would love to connect. I typically respond within 24 hours.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Name & Branding */}
        <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-end text-center lg:text-right">
          {/* 1. Name */}
          <p
            className="uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-staatliches)",
              fontSize: "clamp(36px, 4vw, 56px)",
              color: "var(--cream)",
              letterSpacing: "6px",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            YUVRAJ UMANG M
          </p>

          {/* 2. Tagline */}
          <p
            className="uppercase"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "3px",
              color: "var(--muted)",
              marginTop: "16px",
              marginBottom: 0,
            }}
          >
            Forward Deployed Engineer · AI Builder
          </p>

          {/* 3. Gold divider */}
          <div
            aria-hidden="true"
            style={{
              width: "80px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              margin: "32px 0",
              alignSelf: "center", /* For mobile it centers, for desktop we override */
            }}
            className="lg:self-end lg:bg-gradient-to-l lg:from-[var(--gold)] lg:to-transparent"
          />

          {/* 4. Italic mandate */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "20px",
              color: "rgba(201,168,76,0.70)",
              letterSpacing: "1px",
              margin: 0,
            }}
          >
            Build things. Ship things. Leave a mark.
          </p>

          {/* 5. Copyright */}
          <p
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
              fontSize: "13px",
              color: "var(--dim)",
              marginTop: "48px",
              marginBottom: 0,
            }}
          >
            © 2025 Yuvraj Umang M
          </p>
        </div>
      </div>
    </footer>
  );
}
