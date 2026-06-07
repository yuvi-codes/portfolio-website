"use client";

import { useEffect, useRef, useState } from "react";

interface IntroOverlayProps {
  className?: string;
}

export default function IntroOverlay({ className = "" }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const hasTriggered = useRef(false);

  const triggerFadeOut = () => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setIsFadingOut(true);

    // After 1-second fade completes, hide completely so the site is interactive
    setTimeout(() => {
      setIsHidden(true);
    }, 1000);
  };

  useEffect(() => {
    // Auto-dismiss after 2.5 seconds — hero text rises as overlay fades
    const timer = setTimeout(() => {
      triggerFadeOut();
    }, 2500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the video ends before the 2.5s timer, trigger fade immediately
  const handleVideoEnd = () => {
    triggerFadeOut();
  };

  if (isHidden) return null;

  return (
    <div
      ref={overlayRef}
      className={`
        fixed inset-0 z-[1000] flex items-center justify-center
        transition-opacity duration-1000
        ${isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"}
        ${className}
      `}
      style={{ backgroundColor: "#0A0A08" }}
      aria-hidden={isFadingOut}
    >
      {/* Full-viewport hero background video — plays once at full quality */}
      <video
        ref={videoRef}
        src="/hero-bg-video.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />

      {/* Skip button — fades in after 1.5s */}
      <button
        onClick={triggerFadeOut}
        className="skip-fade-in absolute bottom-8 right-8 z-10 bg-transparent border-none cursor-pointer tracking-[5px] uppercase hover:opacity-70 transition-opacity duration-300"
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "5px",
          color: "var(--gold)",
        }}
        aria-label="Skip intro"
      >
        SKIP →
      </button>
    </div>
  );
}
