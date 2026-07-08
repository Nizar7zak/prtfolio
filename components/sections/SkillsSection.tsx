"use client";

import type { IconType } from "react-icons";
import { motion } from "motion/react";
import { FaAws } from "react-icons/fa";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiPython,
  SiGithub,
  SiClaude,
  SiVercel,
  SiDocker,
  SiPostgresql,
  SiReact,
} from "react-icons/si";
import { HtmlComment, Stagger, StaggerItem, CountUp, Reveal } from "@/components/ui/Animations";
import { Fn, Num, SectionHeading, Ty } from "@/components/ui/IdeSyntax";
import { skillCards, type SkillIconId } from "@/data/portfolio";

const ICONS: Record<SkillIconId, IconType> = {
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  aws: FaAws,
  javascript: SiJavascript,
  typescript: SiTypescript,
  html: SiHtml5,
  css: SiCss,
  python: SiPython,
  github: SiGithub,
  claude: SiClaude,
  vercel: SiVercel,
  docker: SiDocker,
  sql: SiPostgresql,
  react: SiReact,
};

function WireframeTriangle() {
  return (
    <motion.svg
      viewBox="0 0 200 180"
      className="h-36 w-40 text-ide-muted md:h-44 md:w-48"
      fill="none"
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <motion.polygon
        points="100,10 190,170 10,170"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-64px" }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      />
      {[0.25, 0.5, 0.75].map((t) => {
        const y = 10 + (170 - 10) * t;
        const half = ((170 - 10) * t * (190 - 10)) / (170 - 10);
        return (
          <motion.line
            key={`h-${t}`}
            x1={100 - half}
            y1={y}
            x2={100 + half}
            y2={y}
            stroke="currentColor"
            strokeWidth="0.75"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-64px" }}
            transition={{ duration: 0.6, delay: 0.6 + t * 0.2, ease: "easeInOut" }}
          />
        );
      })}
      {Array.from({ length: 4 }, (_, i) => {
        const t = (i + 1) / 4;
        const y = 10 + (170 - 10) * t;
        const half = ((170 - 10) * t * (190 - 10)) / (170 - 10);
        return (
          <motion.g key={`d-${i}`}>
            <motion.line
              x1={100 - half}
              y1={y}
              x2="100"
              y2="10"
              stroke="currentColor"
              strokeWidth="0.75"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-64px" }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.15, ease: "easeInOut" }}
            />
            <motion.line
              x1={100 + half}
              y1={y}
              x2="100"
              y2="10"
              stroke="currentColor"
              strokeWidth="0.75"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-64px" }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.15, ease: "easeInOut" }}
            />
          </motion.g>
        );
      })}
    </motion.svg>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="mb-16 scroll-mt-16">
      <HtmlComment label="My Skills section" />

      <SectionHeading className="mb-6">My Skills</SectionHeading>

      <Stagger className="grid grid-cols-2 border border-ide-border sm:grid-cols-4 lg:grid-cols-7">
        {skillCards.map((skill) => {
          const Icon = ICONS[skill.icon];
          return (
            <StaggerItem key={skill.name}>
              <motion.div
                className="grid min-h-[110px] grid-rows-[28px_1fr_28px] border-b border-r border-ide-border bg-ide-bg sm:min-h-[120px]"
                whileHover={{ scale: 1.02, backgroundColor: "var(--ide-card-hover)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <span className="truncate px-3 pt-3 font-mono text-[11px] text-ide-type">
                  {skill.name}
                </span>

                <motion.div
                  className="flex items-center justify-center px-2"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <Icon className="h-9 w-9 shrink-0 text-ide-comment sm:h-10 sm:w-10" />
                </motion.div>

                <span className="px-3 pb-3 text-right font-mono text-[11px] text-ide-number">
                  <CountUp end={skill.proficiency} suffix="%" />
                </span>
              </motion.div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal delay={0.3}>
        <div className="relative overflow-hidden bg-ide-sidebar px-6 py-14 md:px-10 md:py-20">
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-2 select-none font-mono text-[120px] leading-none text-white/[0.04] md:left-8 md:text-[180px]"
          >
            &ldquo;
          </span>

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="relative z-10 max-w-2xl">
              <p className="font-mono text-2xl text-ide-keyword md:text-[28px]">
                Code is easy.
              </p>
              <p className="mt-3 font-mono text-3xl font-bold leading-[1.15] text-ide-text md:text-[42px]">
                <Fn>Solving problems</Fn>
                <br />
                is the <Ty>real skill</Ty>
              </p>
            </div>

            <div className="relative z-10 flex shrink-0 justify-center md:justify-end">
              <WireframeTriangle />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
