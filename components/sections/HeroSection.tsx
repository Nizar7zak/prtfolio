"use client";

import { motion } from "motion/react";
import { ScrambleText, Reveal } from "@/components/ui/Animations";
import { FiDownload } from "react-icons/fi";
import { aboutBio, personalInfo } from "@/data/portfolio";
import { SemanticText } from "@/components/ui/IdeSyntax";

export function HeroSection() {
  return (
    <section id="about" className="relative mb-12 scroll-mt-16 py-4">
      <motion.div
        className="relative rounded border border-ide-accent/40 p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-64px" }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="mb-6 max-w-3xl font-mono text-[28px] font-bold leading-tight md:text-[36px]">
          <span className="text-ide-keyword">
            <ScrambleText>Turning</ScrambleText>
          </span>{" "}
          <span className="text-ide-text">
            <ScrambleText>Complex Ideas into</ScrambleText>
          </span>{" "}
          <span className="text-ide-type">
            <ScrambleText>Scalable</ScrambleText>
          </span>{" "}
          <span className="text-ide-function">
            <ScrambleText>Digital Solutions</ScrambleText>
          </span>
        </h1>

        <Reveal delay={0.3}>
          <p className="mb-8 max-w-2xl font-mono text-[13px] leading-relaxed text-ide-text">
            <SemanticText tokens={aboutBio} />
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <a
            href="/cv.pdf"
            download="Nezar_Zakout_Resume.pdf"
            className="inline-flex w-fit overflow-hidden border border-ide-muted font-mono text-[12px] transition hover:border-ide-accent"
          >
            <span className="bg-ide-tab-bg px-4 py-2.5 text-ide-property">
              Download CV
            </span>
            <span className="flex items-center justify-center border-l border-ide-muted bg-ide-card px-3 py-2.5 text-ide-keyword">
              <FiDownload className="h-4 w-4" />
            </span>
          </a>
        </Reveal>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-0 select-none font-mono text-[96px] font-bold leading-none tracking-tight text-white/[0.03] md:text-[140px]"
      >
        {personalInfo.name.toUpperCase()}
      </div>
    </section>
  );
}
