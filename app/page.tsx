"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { RecommendationsSection } from "@/components/sections/RecommendationsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { GitHubPulseSection } from "@/components/sections/GitHubPulseSection";
import { BounceGameTab } from "@/components/sections/BounceGameTab";
import {
  TopBar,
  Sidebar,
  IndexPanel,
  MobileSidebarDrawer,
  MobileSectionNav,
  SECTION_IDS,
  type AppTab,
} from "@/components/ide/Shell";
import { HtmlComment } from "@/components/ui/Animations";
import { Cmt, Fn } from "@/components/ui/IdeSyntax";
import { MotionProvider } from "@/components/ui/Animations";
import { ThemeProvider } from "@/components/ide/ThemeProvider";

function getSectionOffset(section: HTMLElement, container: HTMLElement) {
  return (
    section.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop
  );
}

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(120);
  const [activeSection, setActiveSection] = useState("about");
  const [activeTab, setActiveTab] = useState<AppTab>("portfolio");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const container = contentRef.current;
    const section = document.getElementById(id);
    if (!container || !section) return;

    const top = getSectionOffset(section, container) - 16;
    container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setActiveSection(id);
  }, []);

  useEffect(() => {
    if (activeTab !== "portfolio") return;

    const container = contentRef.current;
    if (!container) return;

    const updateLines = () => {
      const height = container.scrollHeight;
      setLineCount(Math.max(Math.ceil(height / 20), 80));
    };

    const updateActiveSection = () => {
      const marker = container.scrollTop + container.clientHeight * 0.28;

      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (!section) continue;
        if (getSectionOffset(section, container) <= marker) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateLines();
    updateActiveSection();

    const onScroll = () => {
      updateActiveSection();
    };

    const onResize = () => {
      updateLines();
      updateActiveSection();
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const resizeObserver = new ResizeObserver(() => {
      updateLines();
      updateActiveSection();
    });
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, [activeTab]);

  return (
    <ThemeProvider>
      <MotionProvider>
        <div className="flex h-[100dvh] flex-col overflow-hidden bg-ide-bg font-mono text-ide-text">
          <TopBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onMenuOpen={() => setMobileNavOpen(true)}
          />
          <MobileSidebarDrawer
            open={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          />

          {activeTab === "portfolio" && (
            <MobileSectionNav
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />
          )}

          <div className="flex min-h-0 flex-1">
            <Sidebar />

            <div className="flex min-w-0 flex-1 overflow-hidden">
              {activeTab === "portfolio" && (
                <div
                  aria-hidden
                  className="hidden w-12 shrink-0 select-none overflow-hidden border-r border-ide-border bg-ide-topbar py-8 text-right text-[11px] leading-5 text-ide-line-num sm:block"
                >
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i} className="pr-3">
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}

              <div
                ref={contentRef}
                className={`editor-scroll min-w-0 flex-1 ${
                  activeTab === "bouncegame"
                    ? "flex flex-col overflow-hidden p-4 md:p-6"
                    : "overflow-y-auto px-3 py-6 sm:px-4 sm:py-8 md:px-6"
                }`}
              >
                {activeTab === "portfolio" ? (
                  <div className="relative w-full max-w-5xl">
                    <HtmlComment label="About me section" />
                    <HeroSection />
                    <ExperienceSection />
                    <ProjectsSection />
                    <RecommendationsSection />
                    <EducationSection />
                    <SkillsSection />
                    <GitHubPulseSection />

                    <div className="mt-16 border-t border-ide-border pt-8 text-center font-mono text-[11px]">
                      <p>
                        <Cmt>
                          Built with curiosity · deployed with care · refactored
                          until it feels right
                        </Cmt>
                      </p>
                      <p className="mt-2 text-ide-comment">
                        © 2026 <Fn>Nezar Zakout</Fn>
                      </p>
                    </div>
                  </div>
                ) : (
                  <BounceGameTab />
                )}
              </div>
            </div>

            {activeTab === "portfolio" && (
              <IndexPanel
                activeSection={activeSection}
                onSectionClick={scrollToSection}
              />
            )}
          </div>
        </div>
      </MotionProvider>
    </ThemeProvider>
  );
}
