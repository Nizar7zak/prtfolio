"use client";

import { HtmlComment, Stagger, StaggerItem } from "@/components/ui/Animations";
import { Kw, SectionHeading } from "@/components/ui/IdeSyntax";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <section id="projects" className="mb-16 scroll-mt-20 py-4 sm:scroll-mt-16">
      <HtmlComment label="Projects section" />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <SectionHeading className="mb-0">Projects</SectionHeading>
        <a
          href="https://github.com/Nizar7zak"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-ide-button-bg px-4 py-2 font-mono text-[12px] font-medium text-ide-button-text transition hover:opacity-90"
        >
          <Kw>View</Kw> More
        </a>
      </div>

      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard
              name={project.name}
              platform={project.platform}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              image={project.image}
              previewImage={project.previewImage}
              previewMode={project.previewMode}
              iframePreview={project.iframePreview}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
