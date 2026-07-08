"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  FiPhone,
  FiMapPin,
  FiDownload,
  FiTarget,
} from "react-icons/fi";
import { MdGTranslate } from "react-icons/md";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { personalInfo } from "@/data/portfolio";
import { ThemeDropdown } from "@/components/ide/ThemeDropdown";
import { Fn, Prop, Str, Ty } from "@/components/ui/IdeSyntax";

export function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })
      );
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const h12 = hours % 12 || 12;
      setTime(`${String(h12).padStart(2, "0")}:${minutes} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-ide-property">My time: {time || "--:-- --"}</span>;
}

export type AppTab = "portfolio" | "bouncegame";

export function TopBar({
  activeTab,
  onTabChange,
}: {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}) {
  return (
    <div className="sticky top-0 z-50 flex h-11 items-center justify-between border-b border-ide-border bg-ide-topbar px-4 font-mono text-[13px]">
      <div className="flex h-full items-center gap-0">
        <button
          type="button"
          onClick={() => onTabChange("portfolio")}
          className={`relative flex h-full items-center gap-2 px-4 transition ${
            activeTab === "portfolio"
              ? "border-b-2 border-ide-text"
              : "text-ide-syntax-comment hover:text-ide-text"
          }`}
        >
          <Str>nizar.info</Str>
          {activeTab === "portfolio" && (
            <span className="text-ide-syntax-comment hover:text-ide-text">×</span>
          )}
        </button>
        <button
          type="button"
          onClick={() => onTabChange("bouncegame")}
          className={`relative flex h-full items-center gap-2 px-4 transition ${
            activeTab === "bouncegame"
              ? "border-b-2 border-ide-text text-ide-text"
              : "text-ide-syntax-comment hover:text-ide-text"
          }`}
        >
          <FiTarget className="h-3.5 w-3.5 shrink-0 text-ide-type" aria-hidden />
          <Str>challenge.nezar</Str>
          {activeTab === "bouncegame" && (
            <span className="text-ide-syntax-comment hover:text-ide-text">×</span>
          )}
        </button>
      </div>

      <div className="flex items-center gap-3 text-[12px] sm:gap-4">
        <ThemeDropdown />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ide-badge-bg px-2.5 py-0.5 text-ide-type">
          <span className="h-1.5 w-1.5 rounded-full bg-ide-type" />
          Open to work
        </span>
        <span className="hidden items-center gap-1.5 text-ide-syntax-comment sm:inline-flex">
          <span className="h-1 w-1 rounded-full bg-ide-syntax-comment" />
          <Str>{personalInfo.location}</Str>
        </span>
        <span className="hidden items-center gap-1.5 text-ide-syntax-comment md:inline-flex">
          <span className="h-1 w-1 rounded-full bg-ide-syntax-comment" />
          <Clock />
        </span>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-[220px] shrink-0 flex-col justify-between border-r border-ide-border bg-ide-sidebar font-mono md:flex">
      {/* Top block */}
      <div className="flex flex-col gap-8 px-5 pt-6">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="shrink-0 border border-ide-muted p-0.5">
            <Image
              src="/profile.jpg"
              alt={`${personalInfo.name} ${personalInfo.lastName}`}
              width={48}
              height={48}
              className="h-12 w-12 object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-[14px] font-bold leading-tight">
              <Fn>
                {personalInfo.name} {personalInfo.lastName}
              </Fn>
            </h1>
            <p className="mt-0.5 text-[12px]">
              <Ty>{personalInfo.title}</Ty>
            </p>
          </div>
        </div>

        {/* Contact */}
        <ul className="flex flex-col gap-4 text-[12px] text-ide-comment">
          <li className="flex items-center gap-3">
            <span className="w-4 shrink-0 text-center text-[13px] text-ide-property">
              @
            </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="truncate text-ide-property hover:opacity-80"
            >
              {personalInfo.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FiPhone className="h-4 w-4 shrink-0 stroke-[1.5]" />
            <a href={`tel:${personalInfo.phone}`} className="hover:text-ide-text">
              {personalInfo.phoneDisplay}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FiMapPin className="h-4 w-4 shrink-0 stroke-[1.5]" />
            <Str>{personalInfo.location}</Str>
          </li>
          <li className="flex items-center gap-3">
            <MdGTranslate className="h-4 w-4 shrink-0" />
            <span>
              {personalInfo.languages.map((lang, i) => (
                <span key={lang}>
                  {i > 0 && ", "}
                  <Ty>{lang}</Ty>
                </span>
              ))}
            </span>
          </li>
        </ul>

        <a
          href="/cv.pdf"
          download="Nezar_Zakout_Resume.pdf"
          className="inline-flex w-fit overflow-hidden border border-ide-muted text-[12px] transition hover:border-ide-accent"
        >
          <span className="bg-ide-tab-bg px-4 py-2.5 text-ide-property">
            Download CV
          </span>
          <span className="flex items-center justify-center border-l border-ide-muted bg-ide-card px-3 py-2.5 text-ide-keyword">
            <FiDownload className="h-4 w-4" />
          </span>
        </a>
      </div>

      {/* Bottom block */}
      <div className="flex flex-col items-center gap-5 px-5 pb-6">
        <a
          href={`mailto:${personalInfo.email}`}
          className="flex w-full items-center justify-center bg-ide-button-bg py-3.5 text-[13px] font-medium text-ide-button-text transition hover:opacity-90"
        >
          Contact me
        </a>

        <div className="flex items-center justify-center gap-2">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-ide-muted bg-ide-tab-bg text-ide-comment transition hover:border-ide-accent hover:text-ide-text"
          >
            <FaLinkedinIn className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-ide-muted bg-ide-tab-bg text-ide-comment transition hover:border-ide-accent hover:text-ide-text"
          >
            <FaGithub className="h-4 w-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}

const INDEX_LINKS = [
  { id: "about", label: "About me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "recommendations", label: "Recommendations" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "github-pulse", label: "GitHub Pulse" },
] as const;

export const SECTION_IDS = INDEX_LINKS.map((link) => link.id);

export function IndexPanel({ activeSection }: { activeSection?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside className="hidden w-[130px] shrink-0 flex-col border-l border-ide-border bg-ide-topbar p-4 xl:w-[150px] xl:p-5 lg:flex">
      <p className="mb-4 font-mono text-[12px] text-ide-syntax-comment">\\ Index</p>
      <nav className="relative flex flex-col gap-3">
        {INDEX_LINKS.map((link) => {
          const active = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="relative pl-3 font-mono text-[12px] transition"
            >
              {active && (
                <motion.div
                  layoutId="index-active"
                  className="absolute left-0 top-0 h-full w-[2px] bg-ide-property"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={
                  active ? "text-ide-property" : "text-ide-syntax-comment"
                }
              >
                {link.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
