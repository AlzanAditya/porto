import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Blog, BlogContentBlock } from "../../types";
import { BlogCardItem } from "./BlogCardItem";
import { ChevronRight, Calendar, Link as LinkIcon, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface BlogDetailPageProps {
  blog: Blog;
  allBlogs: Blog[];
  onNavigate: (path: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  blog,
  allBlogs,
  onNavigate,
}) => {
  const [shareText, setShareText] = useState("Share Link");
  const [isCopied, setIsCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const relatedBlogs = allBlogs
    .filter((b) => b.id !== blog.id && b.slug !== blog.slug)
    .slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog.slug, blog.id]);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareText("Copied!");
      setIsCopied(true);
      setTimeout(() => {
        setShareText("Share Link");
        setIsCopied(false);
      }, 2000);
    }
  };

  useGSAP(
    () => {
      // Main Entrance Timeline matching reference GSAP animation exactly
      gsap
        .timeline()
        .from(".animate-breadcrumb", {
          x: -10,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".animate-title .word",
          {
            y: 30,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.6"
        )
        .from(
          ".animate-date",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".animate-author-bar",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".animate-image",
          {
            scale: 0.95,
            opacity: 0,
            y: 40,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".animate-content",
          {
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        );

      // Related blog cards ScrollTrigger animation
      if (relatedBlogs.length > 0) {
        gsap.from(".blog-card-wrapper", {
          scrollTrigger: {
            trigger: ".animate-related",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    },
    { scope: containerRef, dependencies: [blog.slug, blog.id] }
  );

  // Helper to split text into animated words
  const renderSplitTitle = (titleText: string) => {
    const words = titleText.split(" ");
    return words.map((word, idx) => (
      <span key={idx} className="word inline-block mr-1.5">
        {word}
      </span>
    ));
  };

  // Helper to parse formatted inline marks (bold, italic, code, quotes, links)
  const renderInlineFormatted = (text: string) => {
    // Check if text has backtick code format `**"..."**` or `code`
    const parts = text.split(/(`\*\*".*?"\*\*`|`.*?`|\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, idx) => {
      if (!part) return null;
      if (part.startsWith("`**\"") && part.endsWith("\"**`")) {
        const clean = part.replace(/^`\*\*"/, "").replace(/"\*\*`$/, "");
        return (
          <span
            key={idx}
            className="font-mono bg-card px-2.5 py-1 rounded text-sm text-text-primary border border-foreground/10 font-bold block my-3"
          >
            &ldquo;{clean}&rdquo;
          </span>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        const clean = part.slice(1, -1);
        return (
          <code
            key={idx}
            className="font-mono bg-card px-2 py-0.5 rounded text-sm text-text-primary border border-foreground/10 font-medium"
          >
            {clean}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        const clean = part.slice(2, -2);
        return (
          <strong key={idx} className="font-semibold text-text-primary">
            {clean}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        const clean = part.slice(1, -1);
        return (
          <em key={idx} className="italic">
            {clean}
          </em>
        );
      }
      if (part.startsWith("[") && part.includes("](")) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a
              key={idx}
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 hover:underline transition-all duration-300 font-semibold underline-offset-4"
            >
              {match[1]}
            </a>
          );
        }
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Helper to render Sanity structured blocks
  const renderSanityBlocks = (blocks: BlogContentBlock[]) => {
    const renderedElements: React.ReactNode[] = [];
    let currentList: { type: "bullet" | "number"; items: React.ReactNode[] } | null = null;

    const flushList = () => {
      if (currentList) {
        if (currentList.type === "bullet") {
          renderedElements.push(
            <ul
              key={`list-${renderedElements.length}`}
              className="list-disc pl-6 mb-6 text-text-secondary md:text-lg leading-relaxed flex flex-col gap-2 font-medium"
            >
              {currentList.items}
            </ul>
          );
        } else {
          renderedElements.push(
            <ol
              key={`list-${renderedElements.length}`}
              className="list-decimal pl-6 mb-6 text-text-secondary md:text-lg leading-relaxed flex flex-col gap-2 font-medium"
            >
              {currentList.items}
            </ol>
          );
        }
        currentList = null;
      }
    };

    blocks.forEach((block, index) => {
      // Handle list items
      if (block.listItem) {
        const itemContent = block.children?.map((child, childIdx) => {
          let childText: React.ReactNode = child.text;
          if (child.marks && child.marks.length > 0) {
            if (child.marks.includes("strong")) {
              childText = <strong className="font-semibold text-text-primary">{childText}</strong>;
            }
            if (child.marks.includes("em")) {
              childText = <em className="italic">{childText}</em>;
            }
            if (child.marks.includes("code")) {
              childText = (
                <code className="font-mono bg-card px-2 py-0.5 rounded text-sm text-text-primary border border-foreground/10">
                  {childText}
                </code>
              );
            }
            // Check link marks in markDefs
            const linkDef = block.markDefs?.find((m) => child.marks?.includes(m._key));
            if (linkDef && linkDef.href) {
              const isInternal = linkDef.href.startsWith("/") || linkDef.href.startsWith("#");
              childText = (
                <a
                  href={linkDef.href}
                  onClick={(e) => {
                    if (isInternal) {
                      e.preventDefault();
                      onNavigate(linkDef.href!);
                    }
                  }}
                  target={isInternal ? undefined : "_blank"}
                  rel={isInternal ? undefined : "noopener noreferrer"}
                  className="text-primary hover:text-primary/80 hover:underline transition-all duration-300 font-semibold underline-offset-4"
                >
                  {childText}
                </a>
              );
            }
          }
          return <React.Fragment key={childIdx}>{childText}</React.Fragment>;
        });

        if (!currentList || currentList.type !== block.listItem) {
          flushList();
          currentList = { type: block.listItem, items: [] };
        }
        currentList.items.push(
          <li key={`li-${index}`} className="font-medium">
            {itemContent}
          </li>
        );
        return;
      }

      // Flush any pending list before standard blocks
      flushList();

      // Render children spans
      const childrenNodes = block.children?.map((child, childIdx) => {
        let childText: React.ReactNode = child.text;
        if (child.marks && child.marks.length > 0) {
          if (child.marks.includes("strong")) {
            childText = <strong className="font-semibold text-text-primary">{childText}</strong>;
          }
          if (child.marks.includes("em")) {
            childText = <em className="italic">{childText}</em>;
          }
          if (child.marks.includes("code")) {
            childText = (
              <code className="font-mono bg-card px-2 py-0.5 rounded text-sm text-text-primary border border-foreground/10">
                {childText}
              </code>
            );
          }
          const linkDef = block.markDefs?.find((m) => child.marks?.includes(m._key));
          if (linkDef && linkDef.href) {
            const isInternal = linkDef.href.startsWith("/") || linkDef.href.startsWith("#");
            childText = (
              <a
                href={linkDef.href}
                onClick={(e) => {
                  if (isInternal) {
                    e.preventDefault();
                    onNavigate(linkDef.href!);
                  }
                }}
                target={isInternal ? undefined : "_blank"}
                rel={isInternal ? undefined : "noopener noreferrer"}
                className="text-primary hover:text-primary/80 hover:underline transition-all duration-300 font-semibold underline-offset-4"
              >
                {childText}
              </a>
            );
          }
        }
        return <React.Fragment key={childIdx}>{childText}</React.Fragment>;
      });

      // Style switch
      switch (block.style) {
        case "h2":
          renderedElements.push(
            <h2
              key={`h2-${index}`}
              className="text-xl md:text-3xl font-semibold mt-10 mb-4 text-text-primary"
            >
              {childrenNodes}
            </h2>
          );
          break;
        case "h3":
          renderedElements.push(
            <h3
              key={`h3-${index}`}
              className="text-lg md:text-2xl font-semibold mt-8 mb-3 text-text-primary"
            >
              {childrenNodes}
            </h3>
          );
          break;
        case "blockquote":
          renderedElements.push(
            <blockquote
              key={`quote-${index}`}
              className="border-l-4 border-primary pl-4 italic my-6 text-text-secondary font-medium"
            >
              {childrenNodes}
            </blockquote>
          );
          break;
        default:
          // Skip completely empty blocks
          if (block.children?.length === 1 && block.children[0].text.trim() === "") {
            return;
          }
          renderedElements.push(
            <p
              key={`p-${index}`}
              className="md:text-lg text-text-secondary leading-relaxed mb-5 font-medium"
            >
              {childrenNodes}
            </p>
          );
          break;
      }
    });

    flushList();
    return renderedElements;
  };

  // Helper to render markdown/plain text content if structured blocks not present
  const renderMarkdownContent = (content: string) => {
    const paragraphs = content.split("\n\n");
    return paragraphs.map((para, index) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-lg md:text-2xl font-semibold mt-8 mb-3 text-text-primary"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      }

      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-xl md:text-3xl font-semibold mt-10 mb-4 text-text-primary"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }

      if (trimmed.startsWith("> ")) {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-primary pl-4 italic my-6 text-text-secondary font-medium"
          >
            {renderInlineFormatted(trimmed.replace("> ", ""))}
          </blockquote>
        );
      }

      // Check if multi-line bullet list
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").filter((l) => l.trim().length > 0);
        return (
          <ul
            key={index}
            className="list-disc pl-6 mb-6 text-text-secondary md:text-lg leading-relaxed flex flex-col gap-2 font-medium"
          >
            {items.map((it, itIdx) => (
              <li key={itIdx}>
                {renderInlineFormatted(it.replace(/^[-*]\s+/, ""))}
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p
          key={index}
          className="md:text-lg text-text-secondary leading-relaxed mb-5 font-medium"
        >
          {renderInlineFormatted(trimmed)}
        </p>
      );
    });
  };

  const categoryName = blog.category || blog.tags?.[0] || "Freelance";
  const authorName = blog.author?.name || "Mahendra Arya";
  const authorRole = blog.author?.role || "Web Developer";
  const authorAvatar = blog.author?.avatar || "/avatar/photo-profile.jpeg";

  return (
    <section
      ref={containerRef}
      className="px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto relative pb-16 md:pb-24"
    >
      {/* Main Grid: Left Sticky Cover Media + Right Article Info & Body */}
      <div className="grid lg:grid-cols-12 mt-8 md:mt-12 gap-8 lg:gap-12 mb-8 md:mb-16">
        {/* Left Column: Sticky Cover Image */}
        <div className="lg:col-span-5 animate-image">
          <div className="relative overflow-hidden lg:sticky top-24 rounded-xl aspect-4/5 bg-card w-full">
            <img
              src={blog.coverImage}
              alt={blog.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-103"
            />
          </div>
        </div>

        {/* Right Column: Header, Breadcrumb, Title, Meta, Author Bar, and Body */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="border-b mb-8 pb-8 border-black/10">
            {/* Breadcrumb matching reference */}
            <div className="animate-breadcrumb mb-6">
              <nav className="flex items-center flex-wrap gap-2 gap-y-1 text-sm md:text-base font-medium select-none">
                <a
                  href="/blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/blogs");
                  }}
                  className="breadcrumb-item text-text-secondary hover:text-text-primary transition-colors duration-300 whitespace-nowrap"
                >
                  Blog
                </a>
                <ChevronRight className="breadcrumb-item text-text-secondary/40 text-lg shrink-0" />
                <a
                  href="/blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/blogs");
                  }}
                  className="breadcrumb-item text-text-secondary hover:text-text-primary transition-colors duration-300 whitespace-nowrap"
                >
                  {categoryName}
                </a>
                <ChevronRight className="breadcrumb-item text-text-secondary/40 text-lg shrink-0" />
                <span className="breadcrumb-item text-text-primary font-medium whitespace-nowrap truncate max-w-64 md:max-w-82">
                  {blog.title}
                </span>
              </nav>
            </div>

            {/* Split Title for GSAP Staggered Entrance */}
            <h1 className="text-2xl md:text-[32px] leading-[1.4] font-semibold text-text-primary animate-title mb-2.5">
              {renderSplitTitle(blog.title)}
            </h1>

            {/* Date Badge */}
            <div className="animate-date flex items-center gap-4 mb-12">
              <div className="bg-card p-2.5 rounded-xl w-fit border border-foreground/5">
                <Calendar className="text-xl w-5 h-5 text-text-primary" />
              </div>
              <strong className="font-medium text-sm md:text-base">
                Uploaded : {blog.publishDate}
              </strong>
            </div>

            {/* Author Bar matching reference layout and styling */}
            <div className="animate-author-bar flex items-center justify-between border-t border-b border-foreground/10 mt-8 py-3.5">
              <div className="flex items-center gap-3.5">
                <div className="size-11 rounded-full overflow-hidden bg-card relative border border-foreground/10">
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-sm md:text-base mb-0.5">
                    By {authorName}
                  </h4>
                  <p className="text-xs text-text-secondary font-medium">
                    {authorRole}
                  </p>
                </div>
              </div>

              {/* Share Link Interactive Button */}
              <button
                onClick={handleCopyLink}
                className="px-4 py-3 btn-hover hidden md:flex items-center gap-2 rounded-xl bg-card border border-foreground/10 hover:border-foreground/20 text-text-primary transition-all duration-300 font-medium text-sm cursor-pointer"
                title="Copy blog link"
              >
                {isCopied ? (
                  <Check className="text-base md:text-lg text-emerald-500" />
                ) : (
                  <LinkIcon className="text-base md:text-lg" />
                )}
                <span className="scroll-text flex font-semibold overflow-hidden">
                  <span>{shareText}</span>
                  <span>{shareText}</span>
                </span>
              </button>
            </div>
          </div>

          {/* Article Content Area */}
          <div className="animate-content leading-relaxed mb-12">
            {blog.contentBlocks && blog.contentBlocks.length > 0
              ? renderSanityBlocks(blog.contentBlocks)
              : renderMarkdownContent(blog.content)}
          </div>
        </div>
      </div>

      {/* Other Articles Section */}
      {relatedBlogs.length > 0 && (
        <div className="mt-16 md:mt-24 border-t border-foreground/10 pt-12 md:pt-16 animate-related">
          <h2 className="text-2xl md:text-[32px] font-semibold mb-8 md:mb-12 text-left">
            Other Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6 gap-y-10">
            {relatedBlogs.map((item) => (
              <BlogCardItem
                key={item.id}
                blog={item}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
