"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FaLinkedinIn, FaExternalLinkAlt } from "react-icons/fa";
import { HtmlComment, Stagger, StaggerItem } from "@/components/ui/Animations";
import {
  Cmt,
  Fn,
  Prop,
  SectionHeading,
  Ty,
} from "@/components/ui/IdeSyntax";
import {
  recommendations,
  recommendationsLinkedInUrl,
} from "@/data/portfolio";

export function RecommendationsSection() {
  return (
    <section id="recommendations" className="mb-16 scroll-mt-16 py-4">
      <HtmlComment label="Recommendations section" />

      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionHeading className="mb-0">Recommendations</SectionHeading>
          <p className="mt-1 font-mono text-[11px]">
            <Cmt>From LinkedIn — managers, mentors & leaders I&apos;ve worked with</Cmt>
          </p>
        </div>
        <a
          href={recommendationsLinkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded border border-[#0A66C2]/50 bg-[#0A66C2]/10 px-3 py-2 font-mono text-[11px] text-ide-property transition hover:bg-[#0A66C2]/20"
        >
          <FaLinkedinIn className="h-3.5 w-3.5" />
          View on LinkedIn
          <FaExternalLinkAlt className="h-2.5 w-2.5" />
        </a>
      </div>

      <Stagger className="space-y-10">
        {recommendations.map((rec, index) => {
          const photoLeft = index % 2 === 0;

          return (
            <StaggerItem key={rec.name}>
              <motion.div
                className={`flex items-center gap-6 md:gap-8 ${
                  photoLeft ? "flex-row" : "flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: photoLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-64px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
              <a
                href={rec.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 border border-[#3a3a3a] p-0.5 transition hover:border-ide-accent"
                aria-label={`${rec.name} on LinkedIn`}
              >
                <Image
                  src={rec.photo}
                  alt={rec.name}
                  width={48}
                  height={48}
                  className="h-10 w-10 object-cover sm:h-11 sm:w-11"
                />
              </a>

              <a
                href={rec.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-w-0 flex-1 border border-[#3a3a3a] p-5 transition hover:border-ide-accent sm:p-6"
              >
                <p className="mb-6 whitespace-pre-line font-mono text-[12px] leading-[1.75] text-ide-string">
                  &ldquo;{rec.quote}&rdquo;
                </p>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <Fn>
                    <span className="font-semibold group-hover:underline">
                      {rec.name}
                    </span>
                  </Fn>
                  <Ty>
                    <span className="font-semibold">{rec.company}</span>
                  </Ty>
                </div>

                <p className="mt-2 font-mono text-[10px]">
                  <Prop>{rec.title}</Prop>
                  <span className="text-ide-line-num"> · </span>
                  <Cmt>{rec.context}</Cmt>
                </p>

                <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] text-ide-property opacity-0 transition group-hover:opacity-100">
                  <FaLinkedinIn className="h-3 w-3" />
                  Open profile
                  <FaExternalLinkAlt className="h-2 w-2" />
                </span>
              </a>
            </motion.div>
          </StaggerItem>
        );
      })}
    </Stagger>
    </section>
  );
}
