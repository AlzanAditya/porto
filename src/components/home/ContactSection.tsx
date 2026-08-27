import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitWords } from "../common/SplitWords";

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          if (isDesktop) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 50%",
                  toggleActions: "play none none none",
                },
              })
              .from(".contact-header", {
                y: 40,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1,
                ease: "power3.out",
              })
              .from(
                ".contact-item",
                {
                  scale: 0.9,
                  opacity: 0,
                  y: 20,
                  stagger: 0.1,
                  duration: 0.8,
                  ease: "back.out(1.7)",
                },
                "-=0.6"
              )
              .from(
                ".contact-visual",
                {
                  y: 50,
                  opacity: 0,
                  duration: 1,
                  ease: "power3.out",
                },
                "-=0.8"
              );
          } else {
            gsap.from(".contact-header", {
              scrollTrigger: {
                trigger: ".contact-header",
                start: "top 70%",
                toggleActions: "play none none none",
              },
              y: 30,
              opacity: 0,
              filter: "blur(8px)",
              duration: 1,
              ease: "power2.out",
            });
            gsap.from(".contact-item", {
              scrollTrigger: {
                trigger: ".contact-item-grid",
                start: "top 70%",
                toggleActions: "play none none none",
              },
              scale: 0.9,
              opacity: 0,
              y: 20,
              stagger: 0.1,
              duration: 0.8,
              ease: "back.out(1.5)",
            });
          }
        }
      );
    },
    { scope: containerRef }
  );

  const socials = [
    {
      name: "Mahendra Arya",
      icon: "/contact/linkedin.png",
      url: "https://www.linkedin.com/in/karyasite-12a6a130b/",
    },
    {
      name: "aryndraa",
      icon: "/contact/github-contact.png",
      url: "https://github.com/aryndraa",
    },
    {
      name: "karyasite",
      icon: "/contact/tiktok.png",
      url: "https://www.tiktok.com/@karyasite",
    },
    {
      name: "karyasite",
      icon: "/contact/instagram.png",
      url: "https://www.instagram.com/karyasite/",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Visual Avatar with Phone & Badges */}
        <div className="contact-visual col-span-1 lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-sm flex justify-center items-end min-h-[380px] md:min-h-[460px] bg-card rounded-2xl p-4 overflow-hidden">
            <div className="relative w-full h-full flex justify-center items-end">
              <img
                alt="Arya"
                loading="lazy"
                width="400"
                height="450"
                className="contact-avatar object-contain relative z-5 max-w-[260px] md:max-w-[300px]"
                src="/avatar/contact.png"
              />

              {/* Floating badges */}
              <img
                alt="whatsapp"
                width="160"
                height="160"
                className="contact-badge absolute -left-2 top-16 w-16 md:w-20 z-10 drop-shadow-md animate-float-slow"
                src="/contact/whatsapp.png"
              />
              <img
                alt="email"
                width="160"
                height="160"
                className="contact-badge absolute -right-2 top-8 w-16 md:w-20 z-10 drop-shadow-md animate-float-delayed"
                src="/contact/email.png"
              />
              <img
                alt="chat"
                width="200"
                height="100"
                className="contact-badge absolute left-8 -bottom-2 w-28 md:w-36 z-10 drop-shadow-lg animate-float-slow"
                src="/contact/chat.png"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Say Hello Content & Social Buttons */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-8 md:gap-10 justify-center">
          <div className="contact-header">
            <h2 className="font-semibold text-4xl md:text-6xl mb-4 md:mb-6 leading-[1.1] tracking-tight text-text-primary">
              <SplitWords text="Say Hello" />
            </h2>
            <p className="md:text-lg font-medium text-text-secondary lg:w-[85%] leading-relaxed">
              Feel free to reach out, connect, or just say hi — I'm always open to meeting new people.
            </p>
          </div>

          <div className="contact-item-grid grid grid-cols-2 gap-3 md:gap-4">
            {socials.map((social, idx) => (
              <div key={idx} className="contact-item">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="visit"
                  className="p-4 md:p-5 flex flex-col justify-between gap-8 md:gap-10 btn-hover rounded-xl group transition-all duration-300 bg-white hover:bg-card border border-foreground/10 shadow-xs"
                  href={social.url}
                >
                  <div className="flex items-center justify-between">
                    <div className="relative w-8 h-8">
                      <img
                        alt={social.name}
                        loading="lazy"
                        className="object-contain w-full h-full"
                        src={social.icon}
                      />
                    </div>
                    <div className="p-2.5 bg-card group-hover:bg-primary rounded-full transition-all duration-400 ease-in-out">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        className="-rotate-45 text-primary transition-all duration-400 ease-in-out group-hover:text-background text-base"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                      </svg>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium md:text-lg text-text-primary group-hover:text-primary transition-colors duration-300">
                      {social.name}
                    </h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
