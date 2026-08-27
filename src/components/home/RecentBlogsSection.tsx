import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Blog } from "../../types";
import { SplitWords } from "../common/SplitWords";

gsap.registerPlugin(ScrollTrigger);

interface RecentBlogsSectionProps {
  blogs: Blog[];
  onNavigate: (path: string) => void;
}

export const RecentBlogsSection: React.FC<RecentBlogsSectionProps> = ({
  blogs,
  onNavigate,
}) => {
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
              .from(".blog-header", {
                y: 40,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1,
                ease: "power3.out",
              })
              .from(
                ".blog-card-wrapper",
                {
                  y: 60,
                  opacity: 0,
                  stagger: 0.15,
                  duration: 1,
                  ease: "power2.out",
                  clearProps: "all",
                },
                "-=0.7"
              );
          } else {
            gsap.from(".blog-header", {
              scrollTrigger: {
                trigger: ".blog-header",
                start: "top 70%",
                toggleActions: "play none none none",
              },
              y: 30,
              opacity: 0,
              filter: "blur(8px)",
              duration: 1,
            });
            gsap.utils.toArray<HTMLElement>(".blog-card-wrapper").forEach((e) => {
              gsap.from(e, {
                scrollTrigger: {
                  trigger: e,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                clearProps: "all",
              });
            });
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="blog"
      className="pt-12 md:pt-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden overflow-y-clip select-none"
    >
      {/* Header */}
      <div className="blog-header flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <h2 className="font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
          <SplitWords text="What's on My Mind" />
        </h2>
        <p className="md:text-lg font-medium text-text-secondary lg:w-[42%] lg:text-right">
          Sharing thoughts, experiences, and practical insights on web development and digital growth.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid md:grid-cols-2 gap-5 gap-y-8 pb-16 md:pb-24">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card-wrapper">
            <a
              data-cursor="read"
              className="block h-full"
              href={`/blogs/${blog.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/blogs/${blog.slug}`);
              }}
            >
              <div className="flex flex-col gap-4 group cursor-pointer h-full">
                {/* Cover Image */}
                <div className="overflow-hidden rounded-xl bg-card aspect-4/2.5 relative">
                  <img
                    alt={blog.title}
                    loading="lazy"
                    decoding="async"
                    className="group-hover:scale-110 transition-transform duration-500 ease-in-out object-cover will-change-transform rounded-xl w-full h-full"
                    src={blog.coverImage}
                  />
                </div>

                {/* Meta info & content */}
                <div className="flex flex-col gap-4 flex-grow">
                  <div className="flex gap-6">
                    <div className="flex gap-3 items-center bg-card px-4 py-2 rounded-full">
                      <div className="size-3 bg-linear-to-br from-primary to-secondary text-white rounded-full"></div>
                      <strong className="font-semibold text-sm text-text-primary">
                        {blog.tags[0] || "Freelance"}
                      </strong>
                    </div>
                    <div className="text-text-secondary flex items-center gap-2 text-sm">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"></path>
                      </svg>
                      <p className="font-medium">{blog.publishDate}</p>
                    </div>
                  </div>

                  <div className="px-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="blog-title text-xl lg:text-2xl font-medium mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 text-text-primary">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
