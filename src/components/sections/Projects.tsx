import React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "../../data/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

const Projects: React.FC = () => (
  <section id="projects" aria-labelledby="projects-title" className="tone-green py-20 md:py-28">
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Selected work</p>
          <h2 id="projects-title" className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">
            Featured Projects
          </h2>
        </div>
        <p className="max-w-md text-fg/85 lg:col-span-4 lg:col-start-9">
          {projects.length} products across healthcare, AI, quality tooling, AR, events and entertainment — built end to end.
        </p>
      </div>

      <ol className="mt-12 border-t border-fg/40">
        {projects.map((p, i) => (
          <li key={p.title} className="border-b border-fg/40">
            <article aria-labelledby={`proj-${i}`} className="grid gap-6 py-9 lg:grid-cols-12 lg:gap-10 lg:py-12">
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-sm tabular-nums text-fg/80">
                    {pad(i + 1)} / {pad(projects.length)}
                  </span>
                  <span className="rounded-full border border-fg/50 px-3 py-0.5 text-xs">{p.domain}</span>
                </div>
                <h3 id={`proj-${i}`} className="display mt-5 text-[clamp(1.9rem,3vw,3rem)]">
                  {p.title}
                </h3>
              </div>

              <div className="lg:col-span-7">
                <p className="text-[17px] leading-relaxed text-fg/90">{p.description}</p>
                <p className="mb-2 mt-6 text-xs uppercase tracking-[0.15em] text-fg/80">
                  Stack · {p.technologies.length}
                </p>
                <ul className="flex flex-wrap gap-1.5" aria-label="Technology stack">
                  {p.technologies.map((t) => (
                    <li key={t} className="rounded-md border border-fg/25 px-2 py-1 text-xs">
                      {t}
                    </li>
                  ))}
                </ul>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-2"
                  >
                    Visit website
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm hover:underline"
                  >
                    <Github size={16} aria-hidden="true" />
                    Source Code
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Projects;
