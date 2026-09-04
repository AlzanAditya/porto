import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  isVisible: boolean;
  isExiting: boolean;
  onExitComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isVisible,
  isExiting,
  onExitComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const exitStartedRef = useRef(false);

  // Lock scroll when visible, unlock when exiting or unmounted
  useEffect(() => {
    if (isVisible && !isExiting) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible, isExiting]);

  // Entrance animation matching reference 055205-j862gu.js exactly
  useGSAP(
    () => {
      if (!isVisible) return;
      exitStartedRef.current = false;

      // Reset transform in case of reuse
      gsap.set(containerRef.current, { yPercent: 0 });

      // Entrance items
      gsap
        .timeline()
        .from(".loading-item", {
          opacity: 0,
          y: 10,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });

      // Infinite loop on progress bar
      gsap.to(".loading-bar", {
        left: "150%",
        duration: 1.2,
        ease: "power2.inOut",
        repeat: -1,
      });
    },
    { scope: containerRef, dependencies: [isVisible] }
  );

  // Exit animation: curtain slides UP (yPercent: -100) revealing the page below
  useEffect(() => {
    if (isExiting && containerRef.current && !exitStartedRef.current) {
      exitStartedRef.current = true;
      document.body.style.overflow = "unset";

      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          if (onExitComplete) {
            onExitComplete();
          }
        },
      });
    }
  }, [isExiting, onExitComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="app-loading-screen"
      aria-hidden={!isVisible}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background select-none pointer-events-none"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Brand Name Text with signature gradient */}
        <h2 className="loading-item text-xl md:text-2xl font-bold tracking-widest bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase">
          Alzan Aditya
        </h2>

        {/* Animated Progress Bar matching reference exactly */}
        <div className="loading-item w-28 md:w-36 h-[2px] bg-primary/10 rounded-full overflow-hidden relative">
          <div className="loading-bar absolute top-0 -left-[60%] w-1/2 h-full bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </div>
    </div>
  );
};
