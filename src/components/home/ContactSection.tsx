import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitWords } from "../common/SplitWords";

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
                ".contact-form",
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
            gsap.from(".contact-form", {
              scrollTrigger: {
                trigger: ".contact-form",
                start: "top 70%",
                toggleActions: "play none none none",
              },
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
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
      type: "linkedin",
      icon: null,
      url: "https://www.linkedin.com/in/karyasite-12a6a130b/",
    },
    {
      name: "aryndraa",
      type: "github",
      icon: "/icons/github-logo.png",
      url: "https://github.com/aryndraa",
    },
    {
      name: "karyasite",
      type: "tiktok",
      icon: "/icons/tiktok.png",
      url: "https://www.tiktok.com/@karyasite",
    },
    {
      name: "karyasite",
      type: "instagram",
      icon: "/icons/instagram.png",
      url: "https://www.instagram.com/karyasite/",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-8 p-4 py-6 md:p-10 bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl md:rounded-3xl">
        {/* Left Column: Form */}
        <div className="contact-form bg-white order-last lg:order-first flex flex-col gap-8 items-center rounded-2xl col-span-1 lg:col-span-5 p-6 md:p-8 shadow-xs">
          <div className="flex flex-col gap-4 items-center">
            <div className="p-3 w-fit bg-linear-to-r from-primary/10 to-secondary/10 rounded-full">
              <img
                alt="Mahendra Arya"
                loading="lazy"
                width="100"
                height="100"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-sm"
                src="/logo.png"
              />
            </div>
            <h3 className="text-xl font-semibold text-text-primary">Connect With Me!</h3>
          </div>

          <div className="w-full">
            <div className="flex flex-col gap-4 mb-6">
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card w-full rounded-xl font-medium px-5 py-4 transition-all text-text-primary placeholder:text-text-secondary/60"
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-28 max-h-28 bg-card w-full rounded-xl font-medium px-5 py-4 transition-all text-text-primary placeholder:text-text-secondary/60"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-gradient-to-br from-primary to-secondary text-white px-6 btn-hover py-2.5 rounded-full"
                href={`mailto:aryacoder1102@gmail.com?subject=Contact from ${encodeURIComponent(
                  email
                )}&body=${encodeURIComponent(message)}`}
              >
                <div className="flex gap-2 items-center">
                  <span className="scroll-text flex">
                    <span className="font-semibold">Send Message</span>
                    <span className="font-semibold">Send Message</span>
                  </span>
                  <div className="p-1.5 bg-white/20 rounded-full transition-all duration-300 ease-in-out group-hover:bg-white/40">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-lg"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M435.9 64.9l-367.1 160c-6.5 3.1-6.3 12.4.3 15.3l99.3 56.1c5.9 3.3 13.2 2.6 18.3-1.8l195.8-168.8c1.3-1.1 4.4-3.2 5.6-2 1.3 1.3-.7 4.3-1.8 5.6L216.9 320.1c-4.7 5.3-5.4 13.1-1.6 19.1l64.9 104.1c3.2 6.3 12.3 6.2 15.2-.2L447.2 76c3.3-7.2-4.2-14.5-11.3-11.1z"></path>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Say Hello Content & Social Buttons */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-10 justify-center">
          <div className="contact-header">
            <h2 className="font-medium text-4xl md:text-6xl mb-4 md:mb-6 leading-[1.1] tracking-tight text-text-primary">
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
                  className="p-4 md:p-5 flex flex-col justify-between gap-8 md:gap-10 btn-hover rounded-xl group transition-all duration-300 bg-white hover:bg-card shadow-xs"
                  href={social.url}
                >
                  <div className="flex items-center justify-between">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      {social.icon ? (
                        <img
                          alt={social.name}
                          loading="lazy"
                          className="object-contain w-full h-full"
                          src={social.icon}
                        />
                      ) : (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 448 512"
                          className="w-7 h-7 text-[#0A66C2]"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                        </svg>
                      )}
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
