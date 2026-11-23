import React from "react";
import { Download } from "lucide-react";
import { profile, resumeUrl } from "../../data/portfolio";

/** What a client or team needs, and the skills I use to deliver it. */
const solutions = [
  { need: "A product people enjoy using", how: "Fast, accessible interfaces", stack: "React · Next.js · TypeScript" },
  { need: "A backend that holds up", how: "Secure, well-structured APIs", stack: "Node.js · Express · Python · FastAPI" },
  { need: "Data you can rely on", how: "Clean database design based on your requirements", stack: "PostgreSQL · MongoDB" },
  { need: "Releases without surprises", how: "Automated cloud delivery", stack: "Azure · AWS · Docker · CI/CD" },
  { need: "AI inside your product", how: "AI features, from idea to prototype", stack: "AI APIs · Python · FastAPI" },
];

const Hero: React.FC = () => (
  <section id="hero" aria-label="Introduction" className="tone-green">
    <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1440px] flex-col justify-center px-4 py-14 sm:px-6 md:px-10">
      <div className="grid w-full gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Who I am */}
        <div className="lg:col-span-6">
          <p className="w-fit border border-fg/60 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.22em] sm:text-sm">
            Senior {profile.role}
          </p>
          <h1 className="mt-5 font-serif text-[clamp(2.8rem,13vw,5.5rem)] font-black uppercase leading-[0.9] tracking-[-0.01em] lg:text-[clamp(3rem,min(6vw,11vh),6rem)]">
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
          <p className="mt-6 max-w-xl font-display text-xl font-medium leading-snug sm:text-2xl">
            I turn business problems into fast, secure and scalable web applications.
          </p>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fg/85">
            {profile.greeting} For 7+ years I&apos;ve built production software, from enterprise
            healthcare platforms to AI-powered tools, handling everything from the interface to the
            cloud.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-fg px-5 py-3 text-sm font-medium text-surface hover:bg-fg/85">
              View my work
            </a>
            <a
              href={resumeUrl}
              download="Laxman-Arukala-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-fg/50 px-5 py-3 text-sm font-medium hover:border-fg"
            >
              <Download size={15} aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </div>

        {/* How I solve problems */}
        <div className="lg:col-span-6">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-fg/80">How I solve it</h2>
          <ul className="mt-3 border-t border-fg/40">
            {solutions.map((s) => (
              <li
                key={s.need}
                className="grid gap-0.5 border-b border-fg/25 py-2.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-5"
              >
                <p className="text-sm leading-snug text-fg/80">{s.need}</p>
                <div>
                  <p className="font-display text-[15px] font-semibold leading-snug">{s.how}</p>
                  <p className="text-[13px] leading-snug text-fg/80">{s.stack}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
