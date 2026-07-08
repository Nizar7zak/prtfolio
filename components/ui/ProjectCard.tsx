"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Fn, Prop, Ty } from "@/components/ui/IdeSyntax";

interface ProjectCardProps {
  name: string;
  platform: string;
  liveUrl: string;
  githubUrl?: string;
  image: string;
  previewImage?: string;
  previewMode?: "cover" | "logo";
  iframePreview?: boolean;
}

export function ProjectCard({
  name,
  platform,
  liveUrl,
  githubUrl,
  image,
  previewImage,
  previewMode = "cover",
  iframePreview = true,
}: ProjectCardProps) {
  const previewSrc = previewImage ?? image;
  const showIframe = iframePreview && !previewImage;
  const showLogo = previewMode === "logo" && previewImage;

  return (
    <motion.article
      className="group overflow-hidden rounded border border-ide-border bg-ide-sidebar transition hover:border-ide-accent"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="relative h-44 w-full overflow-hidden bg-ide-topbar">
        {showIframe ? (
          <div className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25]">
            <iframe
              src={liveUrl}
              title={`${name} live preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              referrerPolicy="no-referrer"
              className="h-full w-full border-0 bg-white"
            />
          </div>
        ) : showLogo ? (
          <div className="flex h-full items-center justify-center p-8">
            <Image
              src={previewSrc}
              alt={`${name} logo`}
              width={160}
              height={64}
              className="max-h-16 w-auto max-w-[70%] object-contain"
            />
          </div>
        ) : (
          <Image
            src={previewSrc}
            alt={`${name} preview`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}

        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label={`Open ${name}`}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-2 bg-gradient-to-t from-black/80 to-transparent py-3 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 touch-reveal">
          <FaExternalLinkAlt className="h-3 w-3 text-ide-property" />
          <span className="font-mono text-[11px] text-ide-property">Open live site</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-ide-border p-3">
        <div className="min-w-0">
          <h3 className="truncate font-mono text-[13px] font-semibold">
            <Fn>{name}</Fn>
          </h3>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 block truncate font-mono text-[10px] hover:underline"
          >
            <Prop>{liveUrl.replace(/^https?:\/\//, "")}</Prop>
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded bg-ide-tab-bg px-2 py-0.5 font-mono text-[10px]">
            <Ty>{platform}</Ty>
          </span>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on GitHub`}
              className="text-ide-comment transition hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
