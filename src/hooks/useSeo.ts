import { useEffect } from "react";

export interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile" | "blog";
  author?: string;
  publishedTime?: string;
  tags?: string[];
}

export function useSeo({
  title,
  description = "Personal portfolio, showcases, project catalog, and tech blog website of Alzan Adytia J. Building scalable digital solutions with modern web technologies.",
  image = "/banner.webp",
  url,
  type = "website",
  author = "Alzan Adytia J.",
  publishedTime,
  tags = [],
}: SeoProps) {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes("Alzan Adytia") ? title : `${title} | Alzan Adytia J.`;
    document.title = fullTitle;

    // Helper to create or update meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper for link tags
    const setLinkTag = (rel: string, href: string) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    const fullImageUrl = image.startsWith("http") 
      ? image 
      : (typeof window !== "undefined" ? `${window.location.origin}${image}` : image);

    // Standard SEO
    setMetaTag("name", "description", description);
    if (tags.length > 0) {
      setMetaTag("name", "keywords", tags.join(", "));
    }
    setMetaTag("name", "author", author);

    // Open Graph
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:image", fullImageUrl);
    setMetaTag("property", "og:image:alt", title);
    setMetaTag("property", "og:site_name", "Alzan Adytia J. - Portfolio & Blog");

    // Link image_src fallback for WhatsApp/crawlers
    setLinkTag("image_src", fullImageUrl);
    setLinkTag("canonical", currentUrl);

    // Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", fullImageUrl);
    setMetaTag("name", "twitter:image:alt", title);

    if (publishedTime) {
      setMetaTag("property", "article:published_time", publishedTime);
    }
    if (author) {
      setMetaTag("property", "article:author", author);
    }
  }, [title, description, image, url, type, author, publishedTime, tags]);
}
