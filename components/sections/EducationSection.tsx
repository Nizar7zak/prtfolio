"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HtmlComment, Stagger, StaggerItem, Reveal } from "@/components/ui/Animations";
import { Num, SectionHeading, Str, Ty } from "@/components/ui/IdeSyntax";
import { education } from "@/data/portfolio";

const certBadges = [
  {
    name: "AWS Certified Cloud Practitioner",
    shortName: "Cloud Practitioner",
    src: "https://user-images.githubusercontent.com/72108088/184443807-a63a0c6d-2c54-4cab-a0ca-32901085071d.png",
    href: "https://www.credly.com/badges/787ad5b5-cea7-4c0f-84db-a804a7e123a2/public_url",
  },
  {
    name: "AWS Certified Solutions Architect – Associate",
    shortName: "Solutions Architect",
    src: "https://user-images.githubusercontent.com/72108088/187437809-9cea7190-01c7-482e-81fc-f888e3782824.png",
    href: "https://www.credly.com/badges/86e4acda-da36-4c17-ad5a-3e004e38d257/public_url",
  },
  {
    name: "AWS Certified Developer – Associate",
    shortName: "Developer Associate",
    src: "https://user-images.githubusercontent.com/72108088/254238177-e17e055e-c579-4f1d-98af-55c5b4baca5b.png",
    href: "https://www.credly.com/badges/6035d571-3bfd-42b3-bce7-bf5b8e37ae32/public_url",
  },
  {
    name: "AWS re/Start Accredited Instructor",
    shortName: "re/Start Instructor",
    src: "https://user-images.githubusercontent.com/72108088/235106971-038b8b83-ec61-424b-b8b7-64f63761458b.png",
    href: "https://www.credly.com/badges/8bd81c16-646e-430b-bdfe-1af02fe9a2f1/public_url",
  },
];

export function EducationSection() {
  return (
    <>
      <HtmlComment label="Education & Awards section" />
      <section id="education" className="mb-16 scroll-mt-16 py-8">
        <SectionHeading className="mb-8 text-2xl">My Education</SectionHeading>

        <div className="mb-12 space-y-6">
          {education.map((edu, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex-1">
                <h3 className="font-mono font-semibold">
                  <Ty>{edu.degree}</Ty>
                </h3>
                <p className="font-mono text-sm">
                  <Str>{edu.institution}</Str>
                </p>
                <p className="font-mono text-xs text-ide-comment">
                  <Num>{edu.period.start}</Num> – <Num>{edu.period.end}</Num> (
                  <Str>{edu.location}</Str>)
                </p>
              </div>
            </div>
          ))}
        </div>

        <SectionHeading className="mb-6" id="certifications">
          My Awards
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {certBadges.map((badge) => (
            <a
              key={badge.href}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded border border-ide-border bg-ide-sidebar p-4 text-center transition hover:border-ide-accent"
            >
              <div className="relative h-[115px] w-[115px]">
                <Image
                  src={badge.src}
                  alt={badge.name}
                  fill
                  className="object-contain"
                  sizes="115px"
                />
              </div>
              <p className="font-mono text-[11px] text-ide-type">
                {badge.shortName}
              </p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
