import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitWords } from "../common/SplitWords";

gsap.registerPlugin(ScrollTrigger);

interface SpecializeItem {
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const SPECIALIZE_DATA: SpecializeItem[] = [
  {
    number: "01.",
    title: "Website Development",
    description:
      "Creating high-converting and scalable websites tailored for your business needs. From landing pages to full company profiles, I focus on blazing-fast speed, SEO, responsive design, and intuitive user experiences.",
    tags: [
      "React & Next.js",
      "Full-Stack Architecture",
      "Responsive UI/UX",
      "Performance & SEO",
      "Database Design",
    ],
    image: "/_next/web-dev5af2.jpeg",
  },
  {
    number: "02.",
    title: "Digital System Builder",
    description:
      "Building efficient internal systems and automating repetitive tasks to streamline your business operations. I create custom CRM, dashboard, and automation flows that save you hundreds of hours.",
    tags: [
      "Custom CRM System",
      "Workflow Automation",
      "API Integration",
      "Dashboard Management",
      "Internal Tools Development",
    ],
    image: "/_next/system-builder5212.jpeg",
  },
  {
    number: "03.",
    title: "WordPress Development",
    description:
      "Transforming your ideas into powerful, manageable, and SEO-friendly WordPress websites. From custom themes to advanced plugin integration, I ensure your site is fast, secure, and easy to maintain.",
    tags: [
      "Custom Theme Development",
      "WooCommerce Expert",
      "Performance Optimization",
      "Elementor & Gutenberg",
      "WordPress Security",
    ],
    image: "/_next/wordpress4c44.jpeg",
  },
  {
    number: "04.",
    title: "Digital Advertising",
    description:
      "Driving growth through strategic content and data-driven marketing. I help businesses build their digital presence, engage audiences, and convert followers into loyal customers.",
    tags: [
      "Social Media Ads",
      "Search Engine Marketing",
      "Conversion Tracking",
      "Content Strategy",
      "Audience Targeting",
    ],
    image: "/_next/advertising1387.jpeg",
  },
];

export const ServicesSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        })
        .from(".spec-header", {
          y: 40,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".spec-item",
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );
    },
    { scope: containerRef }
  );

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      ref={containerRef}
      id="specialize"
      className="py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden select-none"
    >
      {/* Header */}
      <div className="spec-header flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <h2 className="font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
          <SplitWords text="Solutions I Specialize In" />
        </h2>
        <p className="md:text-lg font-medium text-text-secondary lg:w-[32%] lg:text-right">
          A combination of technical and strategic skills designed for digital growth.
        </p>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col">
        {SPECIALIZE_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="spec-item">
              <div
                data-cursor={isOpen ? "Close" : "Open"}
                className={`transition-all duration-500 border-b border-foreground/15 last:border-0 p-4 md:p-8 rounded-2xl ${
                  isOpen
                    ? "bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 md:p-8 my-4"
                    : "hover:bg-card/25"
                }`}
              >
                {/* Accordion Trigger Row */}
                <div
                  onClick={() => toggleItem(idx)}
                  className="grid grid-cols-12 items-center cursor-pointer group"
                >
                  <p className="col-span-1 hidden md:block text-3xl font-medium text-text-secondary">
                    {item.number}
                  </p>
                  <h3 className="col-span-10 text-xl md:text-3xl font-medium text-text-primary group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="col-span-2 md:col-span-1 flex justify-end">
                    <button
                      className="flex items-center justify-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-foreground size-9 md:size-12 rounded-full btn-hover"
                      aria-label="Toggle details"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        className={`text-lg md:text-2xl transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-primary" : "text-text-primary"
                        }`}
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[600px] opacity-100 mt-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid lg:grid-cols-12 items-center gap-8 pt-4">
                    <div className="hidden lg:block col-span-1 lg:order-1"></div>

                    {/* Description & Tags */}
                    <div className="order-2 lg:order-2 lg:col-span-6">
                      <p className="text-sm md:text-base mb-6 leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 md:gap-x-3">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`tag-item-${idx} px-3 md:px-4 py-2 text-xs md:text-sm bg-white shadow-2xs border border-foreground/20 text-text-primary font-medium rounded-full`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Preview Image */}
                    <div className="order-1 lg:order-3 lg:col-span-5 overflow-hidden rounded-2xl relative h-48 md:h-56 p-2 bg-white shadow-xs">
                      <img
                        alt={item.title}
                        loading="lazy"
                        width="800"
                        height="400"
                        className="w-full h-full object-cover rounded-xl"
                        src={item.image}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
