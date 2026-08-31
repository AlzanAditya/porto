import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky z-50 top-0 left-0 right-0 bg-linear-to-t from-background via-background/90 to-background/80 backdrop-blur-sm border-b border-white">
      <div className="2xl:container mx-auto px-4 md:px-18 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          className="flex items-center gap-3 md:gap-5 hover:opacity-75 transition-all duration-300 ease-in-out cursor-pointer"
          href="#home"
          onClick={(e) => handleNav(e, "/")}
        >
          <img
            alt="Logo"
            width="100"
            height="100"
            className="object-cover rounded-lg size-10 md:size-12 shadow-md border-4 border-white"
            src="/logo.webp"
          />
          <strong className="text-lg md:text-xl font-semibold tracking-tight">Alzan Aditya</strong>
        </a>

        {/* Right side navigation buttons & Menu */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Collaborate Button (Desktop) */}
          <a
            href="#contact"
            onClick={(e) => {
              if (currentPath !== "/") {
                handleNav(e, "/#contact");
              } else {
                e.preventDefault();
                const contactEl = document.getElementById("contact");
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
          >
            <button className="flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-foreground px-4 py-3 btn-hover hidden md:flex rounded-xl text-text-primary hover:bg-neutral-200/80">
              <span className="scroll-text flex">
                <span className="font-semibold">{t("nav.letsTalk")}</span>
                <span className="font-semibold">{t("nav.letsTalk")}</span>
              </span>
            </button>
          </a>

          {/* Menu Dropdown Button */}
          <div className="relative w-fit">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-black text-white lg:pr-2 lg:pl-4 px-4 py-3.5 lg:py-2 btn-hover rounded-xl"
              aria-label="Toggle Navigation Menu"
            >
              <span className="flex items-center gap-3 lg:gap-4">
                <span className="hidden lg:flex">
                  <span className="scroll-text flex">
                    <span className="font-semibold">Menu</span>
                    <span className="font-semibold">Menu</span>
                  </span>
                </span>
                <span className="lg:p-2 rounded-lg transition-all duration-300 ease-in-out group-hover:bg-white/40">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    className={`transition-all duration-300 ease-in-out group-hover:scale-125 ${
                      isMenuOpen ? "rotate-45" : ""
                    }`}
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
                  </svg>
                </span>
              </span>
            </button>

            {/* Dropdown Menu */}
            <nav
              className={`absolute z-50 right-0 top-full w-64 pt-4 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isMenuOpen
                  ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
                  : "-translate-y-4 opacity-0 pointer-events-none scale-95"
              }`}
            >
              <ul className="bg-white border border-foreground/10 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] rounded-xl p-2">
                <li>
                  <a
                    className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath === "/"
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/"
                    onClick={(e) => handleNav(e, "/")}
                  >
                    <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg">
                      <div className="group-hover:scale-120 transition duration-300 ease-in-out text-lg text-text-primary">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                    </div>
                    <span className="font-medium">{t("nav.home")}</span>
                  </a>
                </li>

                <li>
                  <a
                    className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath.startsWith("/projects")
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/projects"
                    onClick={(e) => handleNav(e, "/projects")}
                  >
                    <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg">
                      <div className="group-hover:scale-120 transition duration-300 ease-in-out text-lg text-text-primary">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 640 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"></path>
                        </svg>
                      </div>
                    </div>
                    <span className="font-medium">{t("nav.projects")}</span>
                  </a>
                </li>

                <li>
                  <a
                    className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath.startsWith("/blogs")
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/blogs"
                    onClick={(e) => handleNav(e, "/blogs")}
                  >
                    <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg">
                      <div className="group-hover:scale-120 transition duration-300 ease-in-out text-lg text-text-primary">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="none"
                            strokeLinejoin="round"
                            strokeWidth="32"
                            d="M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62z"
                          ></path>
                          <path
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                            d="M256 56v120a32 32 0 0 0 32 32h120m-232 80h160m-160 80h160"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <span className="font-medium">{t("nav.blogs")}</span>
                  </a>
                </li>

                <li>
                  <a
                    className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                      currentPath === "/about"
                        ? "bg-foreground text-text-primary"
                        : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                    }`}
                    href="/about"
                    onClick={(e) => handleNav(e, "/about")}
                  >
                    <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg">
                      <div className="group-hover:scale-120 transition duration-300 ease-in-out text-lg text-text-primary">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <span className="font-medium">{t("nav.about")}</span>
                  </a>
                </li>

                {/* Bilingual Switcher inside Dropdown Menu - Clean, no background on container, active option has light grey background */}
                <li className="w-full">
                  <div className="flex items-center gap-1 p-1 rounded-xl text-text-secondary w-full">
                    <button
                      type="button"
                      onClick={() => setLang("id")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold lowercase transition-all duration-300 cursor-pointer text-center ${
                        lang === "id"
                          ? "bg-foreground text-text-primary font-bold"
                          : "bg-transparent text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      id
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang("en")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold lowercase transition-all duration-300 cursor-pointer text-center ${
                        lang === "en"
                          ? "bg-foreground text-text-primary font-bold"
                          : "bg-transparent text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      en
                    </button>
                  </div>
                </li>

                {/* Mobile collaborate button in dropdown */}
                <li className="w-full mt-2 md:hidden">
                  <a
                    className="w-full block"
                    href="#contact"
                    onClick={(e) => {
                      if (currentPath !== "/") {
                        handleNav(e, "/#contact");
                      } else {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        const contactEl = document.getElementById("contact");
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                  >
                    <button className="flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-foreground px-4 py-3 btn-hover w-full justify-center text-text-secondary rounded-xl">
                      <span className="scroll-text flex">
                        <span className="font-semibold">{t("nav.letsTalk")}</span>
                        <span className="font-semibold">{t("nav.letsTalk")}</span>
                      </span>
                    </button>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

