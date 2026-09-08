import React from "react";
import { YobssHeroSection } from "../../components/apps/yobss/YobssHeroSection";
import { useSeo } from "../../hooks/useSeo";
import { useLanguage } from "../../context/LanguageContext";
import { home as yobssHome } from "../../locales/yobss/home";

interface YobssHomePageProps {
  onNavigate?: (path: string) => void;
}

export const YobssHomePage: React.FC<YobssHomePageProps> = ({ onNavigate }) => {
  const { lang } = useLanguage();
  const content = yobssHome[lang];

  useSeo({
    title: `Yobss - Your Business System | ${content.hero.titlePart1} ${content.hero.titlePart2}`,
    description: content.hero.description,
    image: "/logos/yobss.png",
    imageWidth: 256,
    imageHeight: 256,
    url: "/apps/yoobs",
    siteName: "Yobss - Your Business System",
    type: "website",
  });

  return (
    <main className="flex flex-col w-full overflow-x-clip">
      <YobssHeroSection onNavigate={onNavigate} />
      <div id="features" className="scroll-mt-24" />
      <div id="solutions" className="scroll-mt-24" />
      <div id="pricing" className="scroll-mt-24" />
      <div id="testimonial" className="scroll-mt-24" />
      <div id="contact" className="scroll-mt-24" />
      <div id="pre-order" className="scroll-mt-24" />
      <div id="modules" className="scroll-mt-24" />
    </main>
  );
};

export default YobssHomePage;
