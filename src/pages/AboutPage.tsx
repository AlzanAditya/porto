import React from "react";
import { AboutPageView } from "../components/about/AboutPageView";

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return <AboutPageView onNavigate={onNavigate} />;
};

export default AboutPage;
