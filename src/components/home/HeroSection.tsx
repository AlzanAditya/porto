import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitWords } from "../common/SplitWords";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      tl.from(
        ".hero-title .word",
        {
          y: 60,
          opacity: 0,
          filter: "blur(15px)",
          duration: 1.2,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.5"
      );
      tl.from(
        ".hero-subtitle .word",
        {
          x: -30,
          opacity: 0,
          filter: "blur(6px)",
          duration: 1,
          stagger: 0.03,
          ease: "power3.out",
        },
        "-=0.8"
      );
      tl.from(
        ".hero-btns",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".hero-images",
                start: "top 85%",
                toggleActions: "play none none none",
              },
            })
            .from(".hero-phone", {
              y: 100,
              opacity: 0,
              duration: 1.2,
              ease: "power4.out",
            })
            .from(
              ".hero-avatar",
              {
                y: 80,
                opacity: 0,
                filter: "blur(15px)",
                duration: 1.2,
                ease: "power4.out",
              },
              "-=0.5"
            );

          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".hero-images",
                start: isMobile ? "top 65%" : "top 85%",
                toggleActions: "play none none none",
              },
            })
            .from(".hero-particles, .hero-bg-particle", {
              scale: 0,
              opacity: 0,
              duration: 1.5,
              stagger: 0.2,
              ease: "power2.out",
            });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="px-4 pt-6 md:pt-8 min-h-screen max-h-[112vh] md:max-h-[115vh] lg:max-h-[155vh] 2xl:max-h-[125vh] 2xl:container mx-auto relative overflow-y-clip select-none"
    >
      <div className="flex flex-col items-center">
        {/* Availability Badge */}
        <div className="hero-badge flex items-center gap-3 px-4 py-2 border border-text-secondary/30 w-fit rounded-full">
          <span className="size-3 bg-primary rounded-full animate-pulse"></span>
          <strong className="font-medium text-sm md:text-lg">
            Mahendra Arya | Available For Freelance
          </strong>
        </div>

        {/* Title and Subtitle */}
        <div className="mt-6 md:mt-8 flex flex-col items-center text-center">
          <h1 className="hero-title font-semibold text-[32px] leading-[1.2] md:text-6xl md:leading-[1.3] mb-4 md:mb-6">
            <span className="inline-block pb-1">
              <span className="word inline-block">Professional&nbsp;</span>
            </span>
            <span className="inline-block pb-1">
              <span className="word inline-block">Website&nbsp;</span>
            </span>
            <span className="inline-block pb-1">
              <span className="word inline-block">Developer&nbsp;</span>
            </span>
            <br className="hidden lg:block" />
            <span className="inline-block pb-1">
              <span className="word inline-block">&amp;&nbsp;</span>
            </span>
            <span className="inline-block pb-1">
              <span className="word inline-block">Creative&nbsp;</span>
            </span>
            <span className="inline-block pb-1">
              <span className="word inline-block">Agency&nbsp;</span>
            </span>
            <span className="inline-block pb-1">
              <span className="word inline-block">Founder&nbsp;</span>
            </span>
          </h1>
          <h2 className="hero-subtitle font-medium w-[90%] md:w-[50%] md:text-xl text-text-secondary">
            <SplitWords text="I'm a freelance web developer building digital solutions that scale with your ideas." />
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="hero-btns mt-8 md:mt-16 flex items-center gap-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-gradient-to-br from-primary to-secondary text-white px-4 py-3 lg:pl-2 lg:py-2 rounded-xl btn-hover"
            href="mailto:aryacoder1102@gmail.com"
          >
            <div className="flex gap-3 items-center">
              <span className="lg:p-2 rounded-lg transition-all duration-300 ease-in-out group-hover:bg-white/40">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-xl transition-all duration-300 ease-in-out group-hover:scale-120"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                  <path d="M15 7a2 2 0 0 1 2 2"></path>
                  <path d="M15 3a6 6 0 0 1 6 6"></path>
                </svg>
              </span>
              <span className="scroll-text flex">
                <span className="font-semibold">Let's Talk!</span>
                <span className="font-semibold">Let's Talk!</span>
              </span>
            </div>
          </a>

          <a
            className="flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-foreground px-4 py-3 lg:pr-2 lg:py-2 rounded-xl btn-hover"
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/projects");
            }}
          >
            <div className="flex gap-3 items-center">
              <span className="scroll-text flex">
                <span className="font-semibold">View My Projects</span>
                <span className="font-semibold">View My Projects</span>
              </span>
              <span className="lg:p-2 rounded-lg transition-all duration-300 ease-in-out group-hover:bg-text-primary">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  className="text-lg -rotate-45 transition-all duration-300 ease-in-out group-hover:scale-120 group-hover:text-background"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Visual Composition */}
      <div className="hero-images flex flex-col items-center mt-20 lg:mt-12 scale-82 md:scale-86 lg:scale-72 relative">
        <img
          alt="phone"
          width="600"
          height="1000"
          className="hero-phone w-auto h-auto -z-2 pointer-events-none"
          src="/assets/phone.png"
        />
        <img
          alt="avatar"
          width="910"
          height="1000"
          className="hero-avatar absolute inset-0 object-contain scale-150 md:scale-112 lg:scale-100 ml-16 md:ml-24 lg:ml-84 2xl:ml-96 translate-y-6 lg:-translate-y-30 pointer-events-none"
          src="/avatar/main.webp"
        />

        {/* Floating tech particles matching ref_index.html */}
        <img
          alt="nextjs"
          width="230"
          height="200"
          className="hero-particles absolute inset-0 -top-20 lg:top-0 -left-26 md:left-0 object-contain lg:ml-68 translate-y-2 drop-shadow-lg scale-65 md:scale-80 lg:scale-100"
          src="/icons/nextjs-logo.png"
        />
        <img
          alt="laravel"
          width="160"
          height="160"
          className="hero-particles absolute inset-0 object-contain rotate-30 -left-24 lg:left-0 md:ml-32 lg:ml-52 top-28 md:top-36 lg:top-64 drop-shadow-lg scale-65 md:scale-96 lg:scale-100"
          src="/icons/laravel-logo.png"
        />
        <img
          alt="wordpress"
          width="200"
          height="200"
          className="hero-particles absolute inset-0 object-contain -rotate-20 -left-18 lg:left-0 lg:ml-64 top-58 md:top-68 lg:top-120 scale-65 lg:scale-100 drop-shadow-lg"
          src="/icons/wordpress-logo.png"
        />
        <img
          alt="ads"
          width="400"
          height="200"
          className="hero-particles absolute inset-0 left-auto -right-40 md:-right-20 lg:right-0 object-contain -top-6 md:top-0 lg:mr-30 drop-shadow-lg -z-1 scale-60 md:scale-80 lg:scale-100"
          src="/assets/ads.png"
        />
        <img
          alt="github-activity"
          width="580"
          height="800"
          className="hero-particles absolute inset-0 left-auto -right-24 top-auto object-contain lg:mr-32 bottom-6 md:bottom-24 lg:bottom-64 -z-1 drop-shadow-lg"
          src="/assets/github-activity.png"
        />
      </div>

      {/* Atmospheric glow spheres */}
      <img
        alt=""
        width="900"
        height="900"
        className="hero-bg-particle absolute -right-48 lg:-right-96 bottom-48 lg:bottom-12 -z-1 pointer-events-none"
        src="/particle/purple.png"
      />
      <img
        alt=""
        width="900"
        height="900"
        className="hero-bg-particle absolute -left-48 lg:-left-96 -bottom-32 lg:-bottom-72 -z-1 pointer-events-none"
        src="/particle/blue.png"
      />
    </section>
  );
};
