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
    title: `Yobss | ${content.hero.titlePart1} ${content.hero.titlePart2}`,
    description: content.hero.description,
    image: "/logos/yobss.png",
    url: "/apps/yoobs",
    type: "website",
  });

  return (
    <main className="flex flex-col w-full overflow-x-clip">
      <YobssHeroSection onNavigate={onNavigate} />
    </main>
  );
};

export default YobssHomePage;
