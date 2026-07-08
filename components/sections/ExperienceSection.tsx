"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HtmlComment, Stagger, StaggerItem } from "@/components/ui/Animations";
import { Num, Prop, Str, Ty } from "@/components/ui/IdeSyntax";
import { experiences } from "@/data/portfolio";

function yearLabel(exp: (typeof experiences)[number]) {
  const start = exp.period.start.year;
  if (exp.period.end === "current") {
    return (
      <>
        <Num>{start}</Num> – <Ty>Present</Ty>
      </>
    );
  }
  const end = exp.period.end.year;
  return (
    <>
      <Num>{start}</Num> – <Num>{end}</Num>
    </>
  );
}

function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-[#3a3a3a] bg-[#1a1a1a]">
      <Image
        src={src}
        alt={alt}
        width={16}
        height={16}
        className="h-3 w-3 object-contain"
      />
    </span>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="mb-16 scroll-mt-16">
      <HtmlComment label="Experience section" />

      <Stagger className="divide-y divide-[#2a2a2a]">
        {experiences.map((exp) => (
          <StaggerItem key={exp.id}>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="grid grid-cols-1 items-center gap-2 py-4 font-mono text-[13px] sm:grid-cols-[120px_minmax(0,1fr)_minmax(0,1fr)_100px] sm:gap-6"
            >
              <span>{yearLabel(exp)}</span>
              <span className="text-ide-type">{exp.title}</span>

              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                title={`${exp.companyFull} · ${exp.location}`}
                className="inline-flex items-center gap-2.5 transition hover:opacity-80"
              >
                <CompanyLogo src={exp.logo} alt={exp.company} />
                <Str>{exp.company}</Str>
              </a>

              <span
                className="inline-flex items-center justify-start gap-2 sm:justify-end"
                title={exp.location}
              >
                <span aria-hidden className="text-[14px] leading-none">
                  {exp.countryFlag}
                </span>
                <Prop>{exp.country}</Prop>
              </span>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
