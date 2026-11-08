import React from "react";
import type { Project } from "../../data/portfolio";

/*
 * Project previews: the real screenshot when one exists, otherwise a clean
 * interface sketch that matches the kind of product (no fake screenshots).
 * Elements with `sk-grow` animate in from the Projects scene.
 */

const BrowserFrame: React.FC<{ title: string; accent: string; children: React.ReactNode }> = ({
  title,
  accent,
  children,
}) => (
  <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d1017] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
    <div className="flex items-center gap-3 border-b border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
      </div>
      <div className="mx-auto flex max-w-[60%] items-center gap-2 truncate rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[10px] text-white/45">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
        <span className="truncate">{title}</span>
      </div>
    </div>
    <div className="relative aspect-[16/10] w-full overflow-hidden">{children}</div>
  </div>
);

const Bar: React.FC<{ w: string; className?: string; style?: React.CSSProperties }> = ({ w, className = "", style }) => (
  <span className={`block h-2 rounded-full bg-white/10 ${className}`} style={{ width: w, ...style }} />
);

/** Healthcare — clinical dashboard */
const Dashboard: React.FC<{ accent: string }> = ({ accent }) => {
  const bars = [42, 64, 50, 78, 58, 86, 70, 92, 66, 80, 60, 74];
  return (
    <div className="absolute inset-0 flex">
      <aside className="flex w-[22%] flex-col gap-3 border-r border-white/[0.06] bg-white/[0.02] p-4">
        <span className="mb-2 block h-4 w-16 rounded" style={{ background: accent, opacity: 0.85 }} />
        {["70%", "55%", "80%", "60%", "65%"].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded" style={{ background: i === 1 ? accent : "rgba(255,255,255,0.1)" }} />
            <Bar w={w} style={i === 1 ? { background: `${accent}88` } : undefined} />
          </div>
        ))}
      </aside>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <Bar w="50%" />
              <span className="mt-3 block h-4 w-12 rounded" style={{ background: i === 0 ? accent : "rgba(255,255,255,0.18)" }} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          {bars.map((h, i) => (
            <span
              key={i}
              className="sk-grow block flex-1 origin-bottom rounded-t"
              style={{ height: `${h}%`, background: `linear-gradient(180deg, ${accent}, ${accent}33)` }}
            />
          ))}
        </div>
        <div className="hidden space-y-2 sm:block">
          {["85%", "70%"].map((w, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2">
              <span className="h-5 w-5 rounded-full bg-white/10" />
              <Bar w={w} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** QC Tool — validation results table */
const ChecksTable: React.FC<{ accent: string }> = ({ accent }) => {
  const rows: ("pass" | "fail" | "review")[] = ["pass", "pass", "fail", "pass", "review", "pass"];
  const pill = { pass: accent, fail: "#fb7185", review: "#fbbf24" };
  return (
    <div className="absolute inset-0 flex flex-col gap-4 p-5">
      <div className="flex items-center gap-3">
        {["Passed", "Failed", "In review"].map((l, i) => (
          <div key={l} className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
            <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40">{l}</span>
            <span
              className="mt-2 block h-4 w-10 rounded"
              style={{ background: [accent, "#fb7185", "#fbbf24"][i], opacity: 0.85 }}
            />
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-hidden rounded-xl border border-white/[0.06]">
        <div className="grid grid-cols-[24px_1fr_1fr_72px] gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
          <span />
          <Bar w="40%" />
          <Bar w="30%" />
          <Bar w="70%" />
        </div>
        {rows.map((s, i) => (
          <div
            key={i}
            className="sk-row grid grid-cols-[24px_1fr_1fr_72px] items-center gap-3 border-b border-white/[0.04] px-4 py-2.5"
          >
            <span
              className="flex h-4 w-4 items-center justify-center rounded border text-[9px]"
              style={{ borderColor: s === "pass" ? accent : "rgba(255,255,255,0.2)", color: accent }}
            >
              {s === "pass" ? "✓" : ""}
            </span>
            <Bar w={`${55 + ((i * 17) % 35)}%`} />
            <Bar w={`${35 + ((i * 23) % 40)}%`} />
            <span
              className="rounded-full px-2 py-0.5 text-center font-mono text-[9px] uppercase"
              style={{ background: `${pill[s]}22`, color: pill[s] }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Mobile app — one screen sketch inside a phone */
const Phone: React.FC<{ accent: string; className?: string; variant?: number }> = ({
  accent,
  className = "",
  variant = 0,
}) => (
  <div
    className={`relative aspect-[9/19] w-[42%] max-w-[230px] rounded-[2.2rem] border-[6px] border-[#1c2030] bg-[#0b0e16] p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] ${className}`}
  >
    <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-[#1c2030]" />
    <div className="mt-6 flex items-center gap-2">
      <span className="h-7 w-7 rounded-full" style={{ background: `${accent}66` }} />
      <div className="flex-1 space-y-1.5">
        <Bar w="60%" />
        <Bar w="40%" className="h-1.5" />
      </div>
    </div>
    <div
      className="mt-4 rounded-2xl p-3"
      style={{ background: `linear-gradient(135deg, ${accent}, ${accent}55)` }}
    >
      <span className="block h-2 w-1/2 rounded-full bg-white/70" />
      <span className="mt-6 block h-4 w-2/3 rounded bg-white/90" />
    </div>
    <div className="mt-4 space-y-2.5">
      {(variant ? ["75%", "55%", "65%", "50%"] : ["65%", "80%", "50%", "70%"]).map((w, i) => (
        <div key={i} className="flex items-center gap-2 rounded-xl bg-white/[0.04] p-2">
          <span className="h-6 w-6 rounded-lg bg-white/10" />
          <Bar w={w} />
        </div>
      ))}
    </div>
    <div className="absolute inset-x-3 bottom-3 flex justify-around rounded-2xl bg-white/[0.05] py-2">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="h-3 w-3 rounded-full" style={{ background: i === 0 ? accent : "rgba(255,255,255,0.2)" }} />
      ))}
    </div>
  </div>
);

const ProjectPreview: React.FC<{ project: Project }> = ({ project }) => {
  const { accent, preview, image, imageFit, title } = project;

  if (preview === "app") {
    // Cross-platform: two phones (iOS + Android)
    return (
      <div className="relative flex w-full items-center justify-center py-4">
        <Phone accent={accent} variant={1} className="sk-phone-back -mr-10 translate-y-6 -rotate-6 opacity-80" />
        <Phone accent={accent} className="sk-phone-front relative z-10 rotate-3" />
      </div>
    );
  }

  return (
    <BrowserFrame title={title} accent={accent}>
      {image ? (
        <div className={`absolute inset-0 ${imageFit === "contain" ? "bg-[#f4f1ec]" : ""}`}>
          <img
            src={image}
            alt={`${title} preview`}
            loading="lazy"
            decoding="async"
            className={`proj-img h-full w-full ${imageFit === "contain" ? "object-contain p-[10%]" : "object-cover"}`}
          />
        </div>
      ) : preview === "table" ? (
        <ChecksTable accent={accent} />
      ) : (
        <Dashboard accent={accent} />
      )}
    </BrowserFrame>
  );
};

export default ProjectPreview;
