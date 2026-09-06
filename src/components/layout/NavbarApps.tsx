import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";

export interface NavAppMenuItem {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
  image?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export interface NavbarAppsProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  brandName?: string;
  logoSrc?: string;
  logoAlt?: string;
  homePath?: string;
  menuItems?: NavAppMenuItem[];
  primaryCta?: {
    label: string;
    href: string;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
  };
}

/**
 * Modular and configurable Navbar component for apps under /apps/*
 * Designed to adapt to multiple apps while maintaining consistent styling with Navbar.tsx.
 */
export const NavbarApps: React.FC<NavbarAppsProps> = ({
  currentPath = "/apps/yoobs",
  onNavigate = (_path: string) => {},
  brandName,
  logoSrc,
  logoAlt,
  homePath,
  menuItems,
  primaryCta,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const isZanxa = currentPath.startsWith("/apps/zanxa");

  const effectiveBrandName = brandName || (isZanxa ? "Zanxa Studio" : "Yobss");
  const effectiveLogoSrc = logoSrc || (isZanxa ? "/logos/zanxa-studio.png" : "/logos/yobss.png");
  const effectiveLogoAlt = logoAlt || `${effectiveBrandName} Logo`;
  const effectiveHomePath = homePath || (isZanxa ? "/apps/zanxa-studio" : "/apps/yoobs");

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (path.startsWith("#")) {
      const el = document.querySelector(path);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    onNavigate(path);
  };

  // Default menu items for Zanxa Studio
  const defaultZanxaMenuItems: NavAppMenuItem[] = [
    {
      label: lang === "id" ? "Ringkasan" : "Overview",
      href: "/apps/zanxa-studio",
      icon: (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
    },
    {
      label: lang === "id" ? "Portofolio" : "Portfolio",
      href: "/projects",
      icon: (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
    },
    {
      label: lang === "id" ? "Diskusi Proyek" : "Let's Talk!",
      href: "/#contact",
      icon: (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
  ];

  // Default menu items for Yobss
  const defaultYobssMenuItems: NavAppMenuItem[] = [
    {
      label: lang === "id" ? "Ringkasan" : "Overview",
      href: "/apps/yoobs",
      icon: (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
    },
    {
      label: lang === "id" ? "Modul" : "Modules",
      href: "#modules",
      icon: (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
    },
    {
      label: lang === "id" ? "Fitur" : "Features",
      href: "#features",
      icon: (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      label: "Pre-Order",
      href: "#pre-order",
      icon: (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      ),
    },
  ];

  const items = menuItems || (isZanxa ? defaultZanxaMenuItems : defaultYobssMenuItems);

  // Default primary action for Zanxa Studio vs Yobss
  const defaultAction = isZanxa
    ? {
        label: lang === "id" ? "Mulai Diskusi" : "Let's Talk!",
        href: "/#contact",
        className:
          "!bg-orange-500 hover:!bg-orange-600 text-white shadow-xs",
      }
    : {
        label: lang === "id" ? "Pre-Order Sekarang" : "Pre-Order Now",
        href: "#pre-order",
        className:
          "!bg-gradient-to-r !from-emerald-500 !to-green-600 hover:!from-emerald-600 hover:!to-green-700 text-white shadow-xs",
      };

  const action = primaryCta || defaultAction;

  return (
    <header className="sticky z-50 top-0 left-0 right-0 bg-linear-to-t from-background via-background/90 to-background/80 backdrop-blur-sm border-b border-white">
      <div className="2xl:container mx-auto px-4 md:px-18 py-4 flex items-center justify-between">
        {/* Brand & Logo */}
        <a
          id="navbar-apps-brand"
          className="flex items-center gap-3 md:gap-4 hover:opacity-85 transition-all duration-300 ease-in-out cursor-pointer"
          href={effectiveHomePath}
          onClick={(e) => handleNav(e, effectiveHomePath)}
        >
          <div className="size-10 md:size-12 rounded-lg overflow-hidden shadow-md border-2 border-white shrink-0 flex items-center justify-center">
            <img
              alt={effectiveLogoAlt}
              width="100"
              height="100"
              className="w-full h-full object-cover rounded-lg"
              src={effectiveLogoSrc}
            />
          </div>
          <div className="flex flex-col">
            <strong className="text-lg md:text-xl font-semibold tracking-tight text-text-primary">
              {effectiveBrandName}
            </strong>
          </div>
        </a>

        {/* Right side navigation buttons & Menu */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Primary CTA (Desktop) */}
          <Button
            id="navbar-apps-primary-cta"
            variant="primary"
            shape="rounded-xl"
            scrollText
            className={`hidden md:inline-flex ${action.className || ""}`}
            href={action.href}
            onClick={(e) => {
              if (action.onClick) {
                action.onClick(e);
              } else {
                handleNav(e, action.href);
              }
            }}
          >
            {action.label}
          </Button>

          {/* Menu Dropdown Button */}
          <div className="relative w-fit">
            <Button
              id="navbar-apps-menu-toggle"
              variant="dark"
              shape="rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:pr-2 lg:pl-4 px-4 py-3.5 lg:py-2"
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
            </Button>

            {/* Dropdown Menu */}
            <nav
              className={`absolute z-50 right-0 top-full w-64 pt-4 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isMenuOpen
                  ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
                  : "-translate-y-4 opacity-0 pointer-events-none scale-95"
              }`}
            >
              <ul className="bg-white border border-foreground/10 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] rounded-xl p-2 space-y-1">
                {items.map((item, idx) => {
                  const isActive = currentPath === item.href;
                  return (
                    <li key={idx}>
                      <a
                        className={`flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer ${
                          isActive
                            ? "bg-foreground text-text-primary"
                            : "text-text-secondary hover:bg-foreground hover:text-text-primary"
                        }`}
                        href={item.href}
                        onClick={(e) => {
                          if (item.onClick) {
                            item.onClick(e);
                            setIsMenuOpen(false);
                          } else {
                            handleNav(e, item.href);
                          }
                        }}
                      >
                        <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg">
                          <div className="group-hover:scale-120 transition duration-300 ease-in-out text-lg text-text-primary flex items-center justify-center">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.label}
                                className="size-5 object-contain rounded-md"
                              />
                            ) : (
                              item.icon || (
                                <span className="size-2 rounded-full bg-current"></span>
                              )
                            )}
                          </div>
                        </div>
                        <span className="font-medium text-text-primary flex-1">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}

                {/* Return to Portfolio Link */}
                <li className="pt-2 border-t border-foreground/10">
                  <a
                    className="flex items-center gap-4 p-2 rounded-xl group transition-all duration-300 ease-in-out cursor-pointer text-text-secondary hover:bg-foreground hover:text-text-primary"
                    href="/"
                    onClick={(e) => handleNav(e, "/")}
                  >
                    <div className="p-2.5 bg-foreground group-hover:bg-white transition-all duration-300 ease-in-out rounded-lg">
                      <div className="group-hover:-translate-x-0.5 transition duration-300 ease-in-out text-lg text-text-primary flex items-center justify-center">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                        >
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                      </div>
                    </div>
                    <span className="font-medium">Portfolio</span>
                  </a>
                </li>

                {/* Bilingual Switcher */}
                <li className="w-full pt-1">
                  <div className="flex items-center gap-1 p-1 rounded-xl text-text-secondary w-full">
                    <button
                      type="button"
                      onClick={() => setLang("id")}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold lowercase transition-all duration-300 cursor-pointer text-center ${
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
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold lowercase transition-all duration-300 cursor-pointer text-center ${
                        lang === "en"
                          ? "bg-foreground text-text-primary font-bold"
                          : "bg-transparent text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      en
                    </button>
                  </div>
                </li>

                {/* Mobile primary CTA inside dropdown */}
                <li className="w-full pt-2 md:hidden">
                  <Button
                    variant="primary"
                    shape="rounded-xl"
                    fullWidth
                    scrollText
                    className={action.className || "!bg-gradient-to-r !from-emerald-500 !to-green-600 text-white"}
                    href={action.href}
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (action.onClick) {
                        action.onClick(e);
                      } else {
                        handleNav(e, action.href);
                      }
                    }}
                  >
                    {action.label}
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
