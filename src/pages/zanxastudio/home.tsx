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
    url: "/apps/zanxa-studio",
    type: "website",
  });

  return (
    <main className="flex flex-col w-full overflow-x-clip">
      <ZanxaStudioHeroSection onNavigate={onNavigate} />
    </main>
  );
};

export default ZanxaStudioHomePage;
