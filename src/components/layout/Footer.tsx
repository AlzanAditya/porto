import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [projectIdea, setProjectIdea] = useState("");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        })
        .from(".footer-content", {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 1.2,
          ease: "power3.out",
        })
        .from(
          ".footer-text",
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        );
    },
    { scope: containerRef }
  );

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer ref={containerRef} className="px-4 md:px-18 2xl:container mx-auto bg-white pt-8">
      {/* Call To Action Box */}
      <div className="bg-card rounded-2xl md:rounded-3xl relative overflow-hidden footer-content shadow-xs">
        <div className="flex flex-col gap-8 md:gap-12 justify-center items-center min-h-[50vh] md:min-h-[65vh] lg:min-h-[70vh] p-6 py-12 relative z-10">
          <div className="text-center flex flex-col items-center footer-text">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-3 md:mb-6 leading-tight text-text-primary">
              Let's Build Something <br /> Great Together
            </h2>
            <p className="text-sm md:text-lg w-[90%] md:w-[60%] text-text-secondary leading-relaxed font-medium">
              Have an idea? Let's turn it into a scalable digital solution that drives real results.
            </p>
          </div>

          {/* Quick email CTA form */}
          <div className="bg-white/90 border border-white backdrop-blur-md w-full max-w-md pl-6 pr-2 py-2 rounded-full flex gap-3 justify-between items-center shadow-lg">
            <input
              type="text"
              placeholder="Tell me about your project…"
              className="text-sm md:text-base focus:outline-none font-medium w-full text-text-primary placeholder:text-text-secondary/60 bg-transparent"
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-gradient-to-br from-primary to-secondary text-white rounded-full shrink-0"
              href={`mailto:aryacoder1102@gmail.com?subject=Project%20Inquiry&body=${encodeURIComponent(
                projectIdea
              )}`}
            >
              <span className="flex items-center gap-2 px-4 py-3 lg:py-2 lg:pr-2 text-sm md:text-base lg:gap-3 btn-hover">
                <span className="hidden sm:block">
                  <span className="scroll-text flex">
                    <span className="font-semibold">Send</span>
                    <span className="font-semibold">Send</span>
                  </span>
                </span>
                <span className="p-1.5 lg:p-2 rounded-full transition-all duration-300 ease-in-out group-hover:bg-white/40">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-sm transition-all duration-300 ease-in-out group-hover:scale-120"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"></path>
                  </svg>
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Ambient background particles */}
        <img
          alt="particle"
          width="850"
          height="850"
          className="absolute -bottom-40 md:-bottom-72 -left-40 md:-left-72 opacity-50 md:opacity-90 particle-blue pointer-events-none"
          src="/particle/blue.png"
        />
        <img
          alt="particle"
          width="850"
          height="850"
          className="absolute -top-40 md:-top-80 -right-40 md:-right-80 opacity-50 md:opacity-90 particle-purple pointer-events-none"
          src="/particle/purple.png"
        />
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-foreground/10 py-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Logo & Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-center md:justify-start">
            <img
              alt="Logo"
              width="60"
              height="60"
              className="object-cover rounded-full size-14 shadow-md border-2 border-white"
              src="/logo.png"
            />
            <div>
              <strong className="text-lg font-semibold block text-text-primary">
                Mahendra Arya | Karyasite
              </strong>
              <p className="text-sm text-text-secondary">Available for Freelance Projects</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center">
            <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer"
                  href="/"
                  onClick={(e) => handleNav(e, "/")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer"
                  href="/about"
                  onClick={(e) => handleNav(e, "/about")}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer"
                  href="/projects"
                  onClick={(e) => handleNav(e, "/projects")}
                >
                  Project
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer"
                  href="/blogs"
                  onClick={(e) => handleNav(e, "/blogs")}
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="flex justify-center md:justify-end">
            <span className="text-sm font-medium text-text-secondary text-center md:text-right">
              © 2026 Karyasite. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
