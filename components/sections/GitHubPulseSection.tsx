"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HtmlComment, Stagger, StaggerItem } from "@/components/ui/Animations";
import { SectionHeading } from "@/components/ui/IdeSyntax";
import { personalInfo } from "@/data/portfolio";

const GITHUB_CARDS = "https://github-profile-summary-cards.vercel.app/api/cards";
/** Matches IDE dark palette: #111111 bg, #d4d4d4 text, muted grays */
const THEME = "github_dark";
const UTC_OFFSET = 3;

function cardUrl(path: string) {
  return `${GITHUB_CARDS}/${path}?username=${personalInfo.githubUsername}&theme=${THEME}`;
}

export function GitHubPulseSection() {
  return (
    <section id="github-pulse" className="mb-16 scroll-mt-20 py-4 sm:scroll-mt-16">
      <HtmlComment label="GitHub Pulse section" />

      <SectionHeading className="mb-6">GitHub Pulse</SectionHeading>

      <Stagger className="space-y-4">
        <StaggerItem>
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded border border-ide-border bg-ide-sidebar transition hover:border-ide-accent"
            whileHover={{ borderColor: "#4fc1ff" }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={cardUrl("profile-details")}
              alt="GitHub profile details and contribution graph"
              width={920}
              height={200}
              className="h-auto w-full"
              unoptimized
            />
          </motion.a>
        </StaggerItem>

        <Stagger className="grid gap-4 sm:grid-cols-2">
          <StaggerItem>
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded border border-ide-border bg-ide-sidebar transition hover:border-ide-accent"
              whileHover={{ borderColor: "#4fc1ff" }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={cardUrl("most-commit-language")}
                alt="Top languages by commit"
                width={450}
                height={200}
                className="h-auto w-full"
                unoptimized
              />
            </motion.a>
          </StaggerItem>

          <StaggerItem>
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded border border-ide-border bg-ide-sidebar transition hover:border-ide-accent"
              whileHover={{ borderColor: "#4fc1ff" }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={`${cardUrl("productive-time")}&utcOffset=${UTC_OFFSET}`}
                alt="Commit activity by hour"
                width={450}
                height={200}
                className="h-auto w-full"
                unoptimized
              />
            </motion.a>
          </StaggerItem>
        </Stagger>
      </Stagger>
    </section>
  );
}
