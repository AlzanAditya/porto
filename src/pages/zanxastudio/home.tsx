import React from "react";
import { ZanxaStudioHeroSection } from "../../components/apps/zanxastudio/ZanxaStudioHeroSection";
import { useSeo } from "../../hooks/useSeo";
import { useLanguage } from "../../context/LanguageContext";
import { home as zanxaHome } from "../../locales/zanxastudio/home";

interface ZanxaStudioHomePageProps {
  onNavigate?: (path: string) => void;
}

export const ZanxaStudioHomePage: React.FC<ZanxaStudioHomePageProps> = ({
  onNavigate,
}) => {
  const { lang } = useLanguage();
  const content = zanxaHome[lang];

  useSeo({
    title: `Zanxa Studio | ${content.hero.title}`,
    description: content.hero.description,
    image: "/logos/zanxa-studio.png",
    imageWidth: 256,
    imageHeight: 256,
    url: "/apps/zanxa-studio",
    siteName: "Zanxa Studio",
    type: "website",
  });

  return (
    <main className="flex flex-col w-full overflow-x-clip">
      <ZanxaStudioHeroSection onNavigate={onNavigate} />
      <div id="work" className="scroll-mt-24" />
      <div id="testimonial" className="scroll-mt-24" />
      <div id="pricing" className="scroll-mt-24" />
      <div id="about" className="scroll-mt-24" />
      <div id="contact" className="scroll-mt-24" />
    </main>
  );
};

export default ZanxaStudioHomePage;
