import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitWords } from "../common/SplitWords";
import { TextMarquee } from "../common/TextMarquee";

gsap.registerPlugin(ScrollTrigger);

interface AboutPageViewProps {
  onNavigate: (path: string) => void;
}

export const AboutPageView: React.FC<AboutPageViewProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSliderRef = useRef<HTMLDivElement>(null);
  const rightSliderRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [openWorkExp, setOpenWorkExp] = useState<number | null>(0);

  const galleryList = [
    "/gallery/laptop.jpeg",
    "/gallery/image1.jpeg",
    "/gallery/image2.jpeg",
    "/gallery/image3.jpeg",
    "/gallery/image4.jpeg",
    "/gallery/image5.jpeg",
    "/gallery/laptop.jpeg",
  ];

  const heroProjectList = [
    "/projects/Taksu Explore - Travel Operational System/cover.png",
    "/projects/Perpusku - Smart Library Platform/cover.png",
    "/projects/Athlix Sport Platform/cover.png",
    "/projects/Perpusku - ERP Library Management System/cover.png",
    "/projects/Taksu Explore - Tour & Travel Booking/cover.png",
    "/projects/Point Of Sale Restaurant/cover.jpeg",
    "/projects/Luxury Surya Nitya/cover.jpeg",
    "/projects/DocLink - Doctor & Patient Appointment/cover.jpeg",
    "/projects/Aurora Cinema - Ticket Booking/cover.jpeg",
  ];
  const loopHeroProjects = [...heroProjectList, heroProjectList[0]];

  const techIcons = [
    "/icons/react.png",
    "/icons/nextjs.png",
    "/icons/laravel.png",
    "/icons/wordpress.png",
    "/icons/tailwind.png",
    "/icons/alpine-js.png",
    "/icons/inertia-js.png",
    "/icons/laravel-livewire.png",
    "/icons/supabase.png",
  ];

  const toolIcons = [
    "/icons/github.png",
    "/icons/vercel.png",
    "/icons/tiktok.png",
    "/icons/instagram.png",
  ];

  // GSAP Right Slider (reverse slide up loop)
  useGSAP(
    () => {
      const inner = rightSliderRef.current?.querySelector(".web-slider-inner");
      const items = rightSliderRef.current?.querySelectorAll(".web-image");
      if (inner && items && items.length > 1) {
        const count = items.length;
        gsap.set(inner, { yPercent: -100 * (count - 1) });
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power4.inOut", duration: 0.8 },
        });
        for (let l = count - 2; l >= 0; l--) {
          tl.to(inner, { yPercent: -100 * l, delay: 2 });
        }
        tl.set(inner, { yPercent: -100 * (count - 1) });
      }
    },
    { scope: rightSliderRef }
  );

  // GSAP Left Slider (slide up forwards loop)
  useGSAP(
    () => {
      const inner = leftSliderRef.current?.querySelector(".web-slider-inner");
      const items = leftSliderRef.current?.querySelectorAll(".web-image");
      if (inner && items && items.length > 1) {
        const count = items.length;
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power4.inOut", duration: 0.8 },
        });
        for (let l = 1; l < count; l++) {
          tl.to(inner, { yPercent: -100 * l, delay: 2.2 });
        }
        tl.set(inner, { yPercent: 0 });
      }
    },
    { scope: leftSliderRef }
  );

  // GSAP Gallery Carousel (horizontal loop)
  useGSAP(
    () => {
      const inner = galleryRef.current?.querySelector(".image-slider-inner");
      if (inner) {
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power4.inOut", duration: 0.8 },
        });
        for (let t = 1; t < galleryList.length; t++) {
          tl.to(inner, { xPercent: -100 * t, delay: 3 });
        }
        tl.set(inner, { xPercent: 0 });
      }
    },
    { scope: galleryRef }
  );

  useGSAP(
    () => {
      // Hero entrance
      gsap
        .timeline()
        .from(".hero-badge", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
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

      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };

          // Hero images & sliding window entrance
          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".hero-images",
                start: "top 85%",
                toggleActions: "play none none none",
              },
            })
            .from(".hero-phone", {
              scale: 0.9,
              opacity: 0,
              filter: "blur(10px)",
              duration: 1,
              ease: "power3.out",
            })
            .from(
              ".hero-avatar",
              {
                y: 60,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1.2,
                ease: "power3.out",
              },
              "-=0.4"
            );

          gsap.from(".slider-window", {
            scrollTrigger: {
              trigger: ".hero-images",
              start: "top 70%",
              toggleActions: "play none none none",
            },
            scale: 0.8,
            delay: 0.6,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".hero-images",
                start: isMobile ? "top 65%" : "top 85%",
                toggleActions: "play none none none",
              },
            })
            .from(".hero-bg-particle", {
              scale: 0,
              opacity: 0,
              duration: 1.5,
              stagger: 0.2,
              ease: "power2.out",
            });

          // Section 1: About Me story (#about)
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#about",
                start: "top 70%",
                toggleActions: "play none none none",
              },
            })
            .from(".about-title .word", {
              y: 40,
              opacity: 0,
              filter: "blur(10px)",
              duration: 1,
              stagger: 0.05,
              ease: "power3.out",
            })
            .from(
              ".about-content p",
              {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
              },
              "-=0.6"
            )
            .to(
              ".about-image-curtain",
              {
                xPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
              },
              "-=0.8"
            )
            .from(
              ".about-image",
              {
                xPercent: 100,
                duration: 1.2,
                ease: "power4.inOut",
              },
              "<"
            )
            .from(
              ".about-btns",
              {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.6"
            );

          // Section 2: Background in Tech (#background)
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#background",
                start: "top 70%",
                toggleActions: "play none none none",
              },
            })
            .from(".bg-title", {
              y: 30,
              opacity: 0,
              filter: "blur(10px)",
              duration: 1,
              ease: "power3.out",
            })
            .from(
              ".bg-desc",
              {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.6"
            )
            .from(
              ".work-exp-item",
              {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
              },
              "-=0.4"
            )
            .from(
              ".achievement-item",
              {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
              },
              "-=0.6"
            )
            .from(
              ".edu-item",
              {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
              },
              "-=0.6"
            )
            .to(
              ".image-slider-curtain",
              {
                xPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
              },
              "-=0.4"
            )
            .from(
              ".image-slider-inner",
              {
                xPercent: 100,
                duration: 1.2,
                ease: "power4.inOut",
              },
              "<"
            );

          // Section 3: Say Hello
          gsap
            .timeline({
              scrollTrigger: {
                trigger: "#socialMedia",
                start: "top 70%",
                toggleActions: "play none none none",
              },
            })
            .from(".social-title", {
              y: 30,
              opacity: 0,
              filter: "blur(10px)",
              duration: 1,
              ease: "power3.out",
            })
            .from(
              ".social-desc",
              {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.6"
            )
            .from(
              ".social-item",
              {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
              },
              "-=0.4"
            );
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* SECTION 0: HERO */}
      <section className="px-4 pt-6 md:pt-8 min-h-[80vh] md:min-h-screen max-h-[95vh] md:max-h-[115vh] lg:max-h-[130vh] 2xl:max-h-[110vh] 2xl:container mx-auto relative overflow-y-clip select-none">
        <div className="flex flex-col items-center">
          <div className="hero-badge flex items-center gap-3 px-4 py-2 border border-text-secondary/30 w-fit rounded-full">
            <span className="size-3 bg-primary rounded-full animate-pulse"></span>
            <strong className="font-medium text-sm md:text-lg">About Me</strong>
          </div>

          <div className="mt-6 md:mt-8 flex flex-col items-center text-center">
            <h1 className="hero-title font-semibold text-[32px] leading-[1.2] md:text-6xl md:leading-[1.3] mb-4 md:mb-6">
              <span className="inline-block pb-1">
                <span className="word inline-block">Hi,&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">I'm&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">Mahendra&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">Arya,&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">The&nbsp;</span>
              </span>
              <br className="hidden lg:block" />{" "}
              <span className="inline-block pb-1">
                <span className="word inline-block">developer&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">behind&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">the&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">build.&nbsp;</span>
              </span>
            </h1>
          </div>
        </div>

        {/* Hero visual composition with phone, avatar, and 2 sliding windows */}
        <div className="hero-images flex flex-col items-center mt-20 lg:mt-12 scale-82 md:scale-86 lg:scale-72 relative">
          <img
            alt="phone"
            width="600"
            height="1000"
            className="hero-phone w-auto h-auto -z-2"
            src="/phone/hero.png"
          />
          <img
            alt="avatar"
            width="910"
            height="1000"
            className="hero-avatar absolute inset-0 object-contain scale-150 md:scale-112 lg:scale-100 -translate-x-2 lg:translate-x-48 2xl:translate-x-70 translate-y-2 lg:-translate-y-41"
            src="/avatar/about.png"
          />

          {/* Right Slider Window */}
          <div
            ref={rightSliderRef}
            className="slider-window absolute -z-5 bottom-8 md:bottom-24 2xl:bottom-12 -right-48 2xl:-right-64 w-96 h-76 md:w-148 md:h-124 2xl:w-180 2xl:h-132 overflow-hidden rounded-2xl border-4 border-white shadow-2xl rotate-3"
          >
            <div className="web-slider-inner w-full h-full flex flex-col">
              {loopHeroProjects.map((imgSrc, idx) => (
                <div key={idx} className="web-image w-full h-full shrink-0">
                  <img
                    alt="web"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={imgSrc}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Left Slider Window */}
          <div
            ref={leftSliderRef}
            className="slider-window absolute -z-5 bottom-8 md:bottom-24 2xl:bottom-12 -left-48 2xl:-left-64 w-96 h-76 md:w-148 md:h-124 2xl:w-180 2xl:h-132 overflow-hidden rounded-2xl border-4 border-white shadow-2xl -rotate-3"
          >
            <div className="web-slider-inner w-full h-full flex flex-col">
              {loopHeroProjects.map((imgSrc, idx) => (
                <div key={idx} className="web-image w-full h-full shrink-0">
                  <img
                    alt="web"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={imgSrc}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ambient atmospheric particles */}
        <img
          alt=""
          width="900"
          height="900"
          className="hero-bg-particle absolute -right-48 lg:-right-96 bottom-32 lg:-bottom-72 -z-1 pointer-events-none"
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

      {/* ROLES MARQUEE BANNER */}
      <TextMarquee />

      {/* SECTION 1: GET TO KNOW ME (#about) */}
      <section
        id="about"
        className="px-4 md:px-18 lg:px-36 xl:px-48 py-12 lg:py-20 2xl:container mx-auto overflow-hidden select-none"
      >
        <div className="grid gap-4 lg:gap-0 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-0 justify-between">
            <h2 className="text-2xl font-medium about-title">
              <span className="inline-block pb-1">
                <span className="word inline-block">Get&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">To&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">Know&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">Me&nbsp;</span>
              </span>
            </h2>

            {/* Desktop blog image */}
            <div className="about-image-wrapper relative hidden lg:block overflow-hidden rounded-xl h-40">
              <div className="absolute inset-0 bg-card z-10 about-image-curtain pointer-events-none"></div>
              <img
                alt="project preview"
                className="w-full h-full object-cover about-image rounded-xl"
                src="/projects/Taksu Explore - Travel Operational System/cover.png"
              />
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-0">
            <div className="flex flex-col gap-5 about-content text-text-secondary md:text-lg leading-relaxed">
              <p>
                I'm Mahendra Arya, a web developer with over 3 years of experience building websites and digital solutions. I didn't just learn from theory I've been actively working on real projects, handling different clients, and turning ideas into functional products. Along the way, I've also been involved in tech competitions, robotics, and IoT, which helped me sharpen my problem-solving skills and think beyond just code.
              </p>
              <p>
                I enjoy the whole process of building from figuring out how things work to creating solutions that actually make an impact. I'm always curious, always learning, and always looking for new challenges that push me to grow, both as a developer and as a person.
              </p>
            </div>

            {/* Mobile blog image */}
            <div className="about-image-wrapper relative lg:hidden overflow-hidden rounded-xl h-40 mt-4">
              <div className="absolute inset-0 bg-card z-10 about-image-curtain pointer-events-none"></div>
              <img
                alt="project preview"
                className="w-full h-full object-cover about-image rounded-xl"
                src="/projects/Taksu Explore - Travel Operational System/cover.png"
              />
            </div>

            {/* Action Buttons */}
            <div className="about-btns mt-8 md:mt-16 flex items-center gap-3">
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
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-foreground px-4 py-3 lg:pr-2 lg:py-2 rounded-xl btn-hover"
                href="/cv.pdf"
              >
                <div className="flex gap-3 items-center">
                  <span className="scroll-text flex">
                    <span className="font-semibold">Read My CV</span>
                    <span className="font-semibold">Read My CV</span>
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
        </div>
      </section>

      {/* SECTION 2: MY BACKGROUND IN TECH (#background) */}
      <section
        id="background"
        className="py-12 md:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden overflow-y-clip select-none"
      >
        <div className="blog-header flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
          <h2 className="bg-title font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
            My Background in Tech
          </h2>
          <p className="bg-desc md:text-lg font-medium text-text-secondary lg:w-[28%] lg:text-right">
            Showcasing my journey, tools, and the work that defines my growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Work Experience (Col 8) */}
          <div className="lg:col-span-8">
            <div className="p-4 py-5 md:p-5 bg-card rounded-xl h-full">
              <h3 className="text-2xl font-medium mb-6 md:mb-8">My Work Experience</h3>
              <div className="flex flex-col gap-3">
                {/* Exp 1 */}
                <div className="work-exp-item">
                  <div
                    data-cursor="Read"
                    onClick={() => setOpenWorkExp(openWorkExp === 0 ? null : 0)}
                    className="bg-white cursor-pointer flex flex-col group btn-hover transition duration-400 ease-in-out p-5 rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-text-secondary text-sm md:text-base">
                          2025 - Present
                        </p>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                          <h4 className="text-lg md:text-xl font-medium">Cupsite Project</h4>
                          <p className="text-xl hidden md:block">•</p>
                          <strong className="text-base md:text-lg text-text-secondary font-medium">
                            Freelance Web Developer
                          </strong>
                        </div>
                      </div>
                      <button
                        className={`flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out size-9 md:size-12 rounded-full btn-hover transition-colors duration-300 ${
                          openWorkExp === 0
                            ? "bg-gradient-to-br from-primary to-secondary text-white"
                            : "bg-foreground text-text-primary"
                        }`}
                      >
                        <div className="flex items-center justify-center w-full">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            className="text-lg md:text-2xl"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {openWorkExp === 0 ? (
                              <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
                            ) : (
                              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
                            )}
                          </svg>
                        </div>
                      </button>
                    </div>
                    {openWorkExp === 0 && (
                      <div className="overflow-hidden pt-4">
                        <p className="text-text-secondary text-sm md:text-base font-medium border-foreground leading-relaxed">
                          Developing and managing my own freelance agency, handling end-to-end website projects using WordPress and Laravel. I work closely with clients to build landing pages, company profiles, travel platforms, and e-commerce solutions, while also running Meta Ads campaigns to help drive traffic, leads, and measurable business growth.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Exp 2 */}
                <div className="work-exp-item">
                  <div
                    data-cursor="Read"
                    onClick={() => setOpenWorkExp(openWorkExp === 1 ? null : 1)}
                    className="bg-white cursor-pointer flex flex-col group btn-hover transition duration-400 ease-in-out p-5 rounded-xl hover:bg-foreground"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-text-secondary text-sm md:text-base">
                          2024 - Present
                        </p>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                          <h4 className="text-lg md:text-xl font-medium">SBX One Studio</h4>
                          <p className="text-xl hidden md:block">•</p>
                          <strong className="text-base md:text-lg text-text-secondary font-medium">
                            Co-Founder &amp; Lead Developer
                          </strong>
                        </div>
                      </div>
                      <button
                        className={`flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out size-9 md:size-12 rounded-full btn-hover transition-colors duration-300 ${
                          openWorkExp === 1
                            ? "bg-gradient-to-br from-primary to-secondary text-white"
                            : "bg-foreground text-text-primary"
                        }`}
                      >
                        <div className="flex items-center justify-center w-full">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            className="text-lg md:text-2xl"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {openWorkExp === 1 ? (
                              <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
                            ) : (
                              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
                            )}
                          </svg>
                        </div>
                      </button>
                    </div>
                    {openWorkExp === 1 && (
                      <div className="overflow-hidden pt-4">
                        <p className="text-text-secondary text-sm md:text-base font-medium border-foreground leading-relaxed">
                          Co-founding and growing a studio that started from competition projects into a collaborative team of skilled creators. As a Lead Developer, I guide the development process, manage technical decisions, and ensure each project is built with clean structure, scalability, and strong performance across different digital solutions.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Exp 3 */}
                <div className="work-exp-item">
                  <div
                    data-cursor="Read"
                    onClick={() => setOpenWorkExp(openWorkExp === 2 ? null : 2)}
                    className="bg-white cursor-pointer flex flex-col group btn-hover transition duration-400 ease-in-out p-5 rounded-xl hover:bg-foreground"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <p className="font-medium text-text-secondary text-sm md:text-base">
                          July 2024 - Dec 2024
                        </p>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                          <h4 className="text-lg md:text-xl font-medium">PT Timedoor Indonesia</h4>
                          <p className="text-xl hidden md:block">•</p>
                          <strong className="text-base md:text-lg text-text-secondary font-medium">
                            Internship Back-end Developer
                          </strong>
                        </div>
                      </div>
                      <button
                        className={`flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out size-9 md:size-12 rounded-full btn-hover transition-colors duration-300 ${
                          openWorkExp === 2
                            ? "bg-gradient-to-br from-primary to-secondary text-white"
                            : "bg-foreground text-text-primary"
                        }`}
                      >
                        <div className="flex items-center justify-center w-full">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            className="text-lg md:text-2xl"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {openWorkExp === 2 ? (
                              <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
                            ) : (
                              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
                            )}
                          </svg>
                        </div>
                      </button>
                    </div>
                    {openWorkExp === 2 && (
                      <div className="overflow-hidden pt-4">
                        <p className="text-text-secondary text-sm md:text-base font-medium border-foreground leading-relaxed">
                          Completed a back-end development internship focused on strengthening core programming skills using PHP and Laravel. Gained hands-on experience in building APIs, managing databases, and understanding how scalable systems are structured, while working on real-world tasks that improved both technical and problem-solving abilities.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements (Col 4) */}
          <div className="lg:col-span-4">
            <div className="p-4 py-5 md:p-5 bg-card rounded-xl h-full">
              <h3 className="text-2xl font-medium mb-6 md:mb-8">Achievements</h3>
              <div className="flex flex-col gap-3">
                <div className="achievement-item bg-white p-5 rounded-xl transition-colors duration-300 group">
                  <p className="font-medium text-text-secondary text-sm md:text-base mb-3">2026</p>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-medium transition-colors duration-300">
                      Junior Coder Certificate
                    </h4>
                    <p className="text-sm font-medium text-text-secondary">
                      LSP TIK Triatma Kompetensi
                    </p>
                  </div>
                </div>
                <div className="achievement-item bg-white p-5 rounded-xl transition-colors duration-300 group">
                  <p className="font-medium text-text-secondary text-sm md:text-base mb-3">2025</p>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-medium transition-colors duration-300">
                      1st Web Development Competition
                    </h4>
                    <p className="text-sm font-medium text-text-secondary">
                      Konkiti Competition Vol. II
                    </p>
                  </div>
                </div>
                <div className="achievement-item bg-white p-5 rounded-xl transition-colors duration-300 group">
                  <p className="font-medium text-text-secondary text-sm md:text-base mb-3">2024</p>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-medium transition-colors duration-300">
                      1st Web Development Competition
                    </h4>
                    <p className="text-sm font-medium text-text-secondary">
                      Tech Festival | Timedoor Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies & Tools I Use (Col 4) */}
          <div className="lg:col-span-4 overflow-y-hidden overflow-auto">
            <div className="p-4 py-5 md:p-5 bg-card rounded-xl h-full overflow-y-hidden flex flex-col justify-between w-full overflow-hidden">
              <h3 className="text-2xl font-medium mb-6 md:mb-8 lg:w-[50%]">
                Technologies &amp; Tools I Use
              </h3>
              <div className="flex flex-col gap-4">
                {/* Techs scrolling left */}
                <div className="relative w-full overflow-hidden rounded-xl">
                  <div className="flex gap-2 animate-marquee w-max">
                    {[...techIcons, ...techIcons].map((icon, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl min-w-17.5 h-17.5 flex items-center justify-center"
                      >
                        <img
                          alt="tech"
                          className="object-contain w-9 md:min-w-12"
                          src={icon}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Tools scrolling right */}
                <div className="relative w-full overflow-hidden rounded-xl">
                  <div className="flex gap-2 animate-marquee-reverse w-max">
                    {[...toolIcons, ...toolIcons].map((icon, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl min-w-17.5 h-17.5 flex items-center justify-center"
                      >
                        <img
                          alt="tool"
                          className="object-contain w-9 md:min-w-12"
                          src={icon}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education (Col 4) */}
          <div className="lg:col-span-4">
            <div className="p-4 py-5 md:p-5 bg-card rounded-xl h-full">
              <h3 className="text-2xl font-medium mb-6 md:mb-8">Education</h3>
              <div className="flex flex-col gap-3">
                <div className="edu-item bg-white p-5 rounded-xl transition-colors duration-300 group">
                  <p className="font-medium text-text-secondary text-sm md:text-base mb-3">
                    2026 - Now
                  </p>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-medium transition-colors duration-300">
                      Primakara University
                    </h4>
                    <p className="text-sm font-medium text-text-secondary">S1 Informatika</p>
                  </div>
                </div>
                <div className="edu-item bg-white p-5 rounded-xl transition-colors duration-300 group">
                  <p className="font-medium text-text-secondary text-sm md:text-base mb-3">
                    2023 - 2026
                  </p>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-medium transition-colors duration-300">
                      SMK TI Bali Global Denpasar
                    </h4>
                    <p className="text-sm font-medium text-text-secondary">
                      Rekayasa Perangkat Lunak
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery Carousel (Col 4) */}
          <div className="lg:col-span-4">
            <div
              ref={galleryRef}
              className="rounded-xl overflow-hidden bg-card aspect-[4/4] lg:aspect-[4/4.5] relative group"
            >
              <div className="absolute inset-0 bg-card z-10 image-slider-curtain pointer-events-none"></div>
              <div className="image-slider-inner flex w-full h-full relative">
                {galleryList.map((imgSrc, idx) => (
                  <div key={idx} className="web-image w-full h-full shrink-0">
                    <img
                      alt="gallery"
                      loading="lazy"
                      className="w-full h-full object-cover grayscale-100 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                      src={imgSrc}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SAY HELLO (#socialMedia) */}
      <section
        id="socialMedia"
        className="pt-12 md:pt-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden overflow-y-clip select-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-0">
          <div className="contact-header col-span-1 md:col-span-4">
            <h2 className="social-title font-medium text-4xl md:text-6xl mb-4 md:mb-6 leading-[1.1] tracking-tight">
              Say Hello
            </h2>
            <p className="social-desc md:text-lg font-medium text-text-secondary">
              Feel free to reach out, connect, or just say hi, I'm always open to meeting new people.
            </p>
          </div>

          <div className="hidden lg:block col-span-2"></div>

          <div className="col-span-1 md:col-span-6 grid grid-cols-2 gap-4 md:gap-5">
            {/* LinkedIn */}
            <div className="social-item">
              <a
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="visit"
                className="p-4 flex flex-col gap-10 btn-hover rounded-xl group transition-all duration-300 bg-card hover:bg-white"
                href="https://www.linkedin.com/in/karyasite-12a6a130b/"
              >
                <div className="flex items-center justify-between">
                  <div className="relative w-8 h-8 flex items-center justify-center">
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
                  </div>
                  <div className="p-3 bg-card group-hover:bg-primary rounded-full transition-all duration-400 ease-in-out">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      className="-rotate-45 text-primary transition-all duration-400 ease-in-out group-hover:text-background text-lg"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium md:text-lg text-text-primary">Mahendra Arya</h3>
                </div>
              </a>
            </div>

            {/* GitHub */}
            <div className="social-item">
              <a
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="visit"
                className="p-4 flex flex-col gap-10 btn-hover rounded-xl group transition-all duration-300 bg-card hover:bg-white"
                href="https://github.com/aryndraa"
              >
                <div className="flex items-center justify-between">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <img
                      alt="aryndraa"
                      className="object-contain w-full h-full"
                      src="/icons/github-logo.png"
                    />
                  </div>
                  <div className="p-3 bg-card group-hover:bg-primary rounded-full transition-all duration-400 ease-in-out">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      className="-rotate-45 text-primary transition-all duration-400 ease-in-out group-hover:text-background text-lg"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium md:text-lg text-text-primary">aryndraa</h3>
                </div>
              </a>
            </div>

            {/* TikTok */}
            <div className="social-item">
              <a
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="visit"
                className="p-4 flex flex-col gap-10 btn-hover rounded-xl group transition-all duration-300 bg-card hover:bg-white"
                href="https://www.tiktok.com/@karyasite"
              >
                <div className="flex items-center justify-between">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <img
                      alt="karyasite"
                      className="object-contain w-full h-full"
                      src="/icons/tiktok.png"
                    />
                  </div>
                  <div className="p-3 bg-card group-hover:bg-primary rounded-full transition-all duration-400 ease-in-out">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      className="-rotate-45 text-primary transition-all duration-400 ease-in-out group-hover:text-background text-lg"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium md:text-lg text-text-primary">karyasite</h3>
                </div>
              </a>
            </div>

            {/* Instagram */}
            <div className="social-item">
              <a
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="visit"
                className="p-4 flex flex-col gap-10 btn-hover rounded-xl group transition-all duration-300 bg-card hover:bg-white"
                href="https://www.instagram.com/karyasite/"
              >
                <div className="flex items-center justify-between">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <img
                      alt="karyasite"
                      className="object-contain w-full h-full"
                      src="/icons/instagram.png"
                    />
                  </div>
                  <div className="p-3 bg-card group-hover:bg-primary rounded-full transition-all duration-400 ease-in-out">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      className="-rotate-45 text-primary transition-all duration-400 ease-in-out group-hover:text-background text-lg"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium md:text-lg text-text-primary">karyasite</h3>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
