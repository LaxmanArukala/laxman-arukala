import React from "react";
import { Cloud, Database, Layout, Rocket, Server } from "lucide-react";
import { services } from "../../data/portfolio";

const layers = [
  { icon: Layout, layer: "Interface", title: "Frontend architecture", stack: ["React", "Next.js", "TypeScript", "Redux Toolkit", "TanStack Query"] },
  { icon: Server, layer: "Services", title: "Backend APIs", stack: ["Node.js", "Express.js", "Python", "FastAPI", "REST APIs", "Microservices"] },
  { icon: Database, layer: "Data", title: "Database integration", stack: ["PostgreSQL", "MongoDB", "Azure Blob", "AWS S3"] },
  { icon: Cloud, layer: "Platform", title: "Cloud infrastructure", stack: ["Microsoft Azure", "AWS"] },
  { icon: Rocket, layer: "Delivery", title: "Deployment workflows", stack: ["Docker", "CI/CD", "SonarQube", "Veracode"] },
];

const Capabilities: React.FC = () => (
  <section id="services" aria-labelledby="cap-title" className="tone-cream py-20 md:py-28">
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
      <p className="eyebrow">Capabilities</p>
      <h2 id="cap-title" className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">
        From interface to infrastructure.
      </h2>

      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-fg/25 bg-fg/25 md:grid-cols-2 xl:grid-cols-5">
        {layers.map((l, i) => (
          <li key={l.layer} className="bg-surface p-6">
            <l.icon size={22} aria-hidden="true" />
            <p className="mt-5 text-xs uppercase tracking-[0.15em] text-fg/80">
              0{i + 1} · {l.layer}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{l.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg/85">{l.stack.join(", ")}</p>
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Services</p>
          <h3 className="display mt-5 text-[clamp(2rem,3.4vw,3.2rem)]">End-to-end delivery, from idea to production</h3>
        </div>
        <p className="text-lg leading-relaxed text-fg/85 lg:col-span-6 lg:col-start-7 lg:pt-9">
          I take websites and software products through the full lifecycle — design, build, ship, and
          run — so you get one accountable partner instead of piecing it together across vendors.
        </p>
      </div>

      <ul className="mt-10 border-t border-fg/25">
        {services.map((s, i) => (
          <li key={s.title} className="grid gap-2 border-b border-fg/25 py-6 md:grid-cols-12 md:items-center md:gap-8">
            <span className="font-display text-sm tabular-nums text-fg/80 md:col-span-1">0{i + 1}</span>
            <h4 className="flex items-center gap-3 font-display text-2xl font-semibold tracking-tight md:col-span-4">
              <s.icon size={20} aria-hidden="true" />
              {s.title}
            </h4>
            <p className="text-[15px] leading-relaxed text-fg/85 md:col-span-7">{s.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Capabilities;
