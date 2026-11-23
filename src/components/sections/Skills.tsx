import React from "react";
import { skillGroups } from "../../data/portfolio";
import ToolsIndex from "./ToolsIndex";

const Skills: React.FC = () => (
  <section id="skills" aria-labelledby="skills-title">
    <div className="tone-green py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <p className="eyebrow">Technical expertise</p>
        <h2 id="skills-title" className="display mt-6 max-w-4xl text-[clamp(2.4rem,5vw,4.5rem)]">
          Frontend, backend, database and cloud.
        </h2>
        <p className="mt-5 max-w-xl text-fg/85">
          The stack I use to take products end to end — from the first component to the last deployment.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.id}
              aria-labelledby={`skills-${group.id}`}
              className={`rounded-2xl border border-fg/30 p-6 sm:p-8 ${group.skills.length > 8 ? "lg:col-span-2" : ""}`}
            >
              <div className="flex items-center gap-3">
                <group.icon size={20} aria-hidden="true" />
                <h3 id={`skills-${group.id}`} className="display text-3xl">
                  {group.name}
                </h3>
              </div>
              <p className="mt-3 text-fg/85">{group.summary}</p>
              <ul
                className={`mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 ${
                  group.skills.length > 8 ? "lg:grid-cols-4" : ""
                }`}
              >
                {group.skills.map((s) => (
                  <li key={s.name} className="rounded-xl border border-fg/25 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[15px] font-medium">{s.name}</span>
                      {s.level !== undefined && <span className="shrink-0 text-xs tabular-nums text-fg/80">{s.level}%{s.note ? ` (${s.note})` : ""}</span>}
                    </div>
                    {s.level !== undefined && (
                      <div
                        className="mt-2.5 h-[3px] w-full rounded-full bg-fg/20"
                        role="meter"
                        aria-label={`${s.name} proficiency`}
                        aria-valuenow={s.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div className="h-full rounded-full bg-fg" style={{ width: `${s.level}%` }} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>

    <ToolsIndex />
  </section>
);

export default Skills;
