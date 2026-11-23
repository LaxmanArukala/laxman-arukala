import React from "react";
import { contactItems, experiences, images, profile, stats } from "../../data/portfolio";

const About: React.FC = () => (
  <section id="about" aria-labelledby="about-title" className="tone-cream py-20 md:py-28">
    <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <figure className="mx-auto max-w-[420px] lg:sticky lg:top-24 lg:max-w-none">
          <img
            src={images.professionalPortrait}
            alt="Laxman Arukala in a navy business suit"
            width={746}
            height={1120}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-2xl object-cover object-[50%_22%]"
          />
          <figcaption className="mt-4 flex items-end justify-between">
            <div>
              <p className="font-display text-xl font-semibold">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="text-sm text-fg/80">{profile.location}</p>
            </div>
            <p className="text-right font-display text-sm text-fg/80">
              {profile.experience}
              <br />
              experience
            </p>
          </figcaption>
        </figure>
      </div>

      <div className="lg:col-span-7">
        <p className="eyebrow">About me</p>
        <h2 id="about-title" className="display mt-6 text-[clamp(2.3rem,5vw,4.5rem)]">
          {profile.aboutHeadline}
        </h2>
        <p className="mt-8 font-display text-[clamp(1.2rem,1.8vw,1.6rem)] font-medium leading-[1.4]">{profile.about}</p>

        <div className="mt-10 grid gap-8 border-t border-fg/25 pt-8 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Roles</p>
            <ul className="mt-3 space-y-1.5">
              {profile.roles.map((r) => (
                <li key={r} className="font-display text-lg">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Focus</p>
            <p className="mt-3 font-display text-lg">{profile.focus}</p>
            <p className="eyebrow mt-6">Companies</p>
            <p className="mt-3">{experiences.map((e) => e.shortName).join(" · ")}</p>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-fg/25 bg-fg/25 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end bg-surface p-5">
              <dt className="mt-2 text-xs uppercase tracking-[0.15em] text-fg/80">{s.label}</dt>
              <dd className="display text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {contactItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <item.icon size={15} aria-hidden="true" />
              {item.href ? (
                <a href={item.href} className="hover:underline">
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default About;
