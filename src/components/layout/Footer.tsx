import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../../context/LanguageContext";
import { CtaSection } from "../Section/CtaSection";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentPath }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      // Ensure initial visibility before animation or if ScrollTrigger doesn't fire
      const ctx = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            refreshPriority: -1,
            onRefresh: (self) => {
              // If footer is already visible in viewport on mount, play immediately
              if (self.progress > 0) {
                gsap.set([".footer-content", ".footer-text"], {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  clearProps: "transform,opacity",
                });
              }
            },
          },
        })
        .fromTo(
          ".footer-content",
          { y: 50, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" }
        )
        .fromTo(
          ".footer-text",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [currentPath] }
  );

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer ref={containerRef} className="px-4 md:px-18 2xl:container mx-auto bg-white pt-8">
      {/* Call To Action Box */}
      <CtaSection />

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
              src="/logo.webp"
            />
            <div>
              <strong className="text-lg font-semibold block text-text-primary">
                Alzan Adytia J.
              </strong>
              <p className="text-sm text-text-secondary">{t("footer.status")}</p>
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
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer"
                  href="/about"
                  onClick={(e) => handleNav(e, "/about")}
                >
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer"
                  href="/projects"
                  onClick={(e) => handleNav(e, "/projects")}
                >
                  {t("nav.projects")}
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-text-secondary hover:text-text-primary transition ease-in-out duration-300 cursor-pointer"
                  href="/blogs"
                  onClick={(e) => handleNav(e, "/blogs")}
                >
                  {t("nav.blogs")}
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="flex justify-center md:justify-end">
            <span className="text-sm font-medium text-text-secondary text-center md:text-right">
              {t("footer.rights")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

