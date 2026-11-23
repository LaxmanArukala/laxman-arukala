import React, { Suspense, lazy } from "react";
import { ArrowUpRight, Download, Github, Linkedin, MessageCircle } from "lucide-react";
import { contact, contactItems, resumeUrl } from "../../data/portfolio";

// Form libraries (Formik, Yup, EmailJS) load separately — the form sits at the end of the page.
const ContactFrom = lazy(() => import("../ContactFrom"));

const Contact: React.FC = () => {
  const socials = [
    contact.linkedin && { label: "LinkedIn", href: contact.linkedin, icon: Linkedin },
    contact.github && { label: "GitHub", href: contact.github, icon: Github },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Github }[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="tone-green py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <p className="eyebrow">Get in touch</p>
        <h2 id="contact-title" className="display mt-6 text-[clamp(2.8rem,8vw,7.5rem)]">
          Let&apos;s build something amazing.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="divide-y divide-fg/25 border-y border-fg/25">
              {contactItems.map((item) => (
                <li key={item.label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-4">
                  <span className="flex items-center gap-3 text-sm text-fg/85">
                    <item.icon size={16} aria-hidden="true" />
                    {item.label}
                  </span>
                  {item.href ? (
                    <a href={item.href} className="break-all hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
              <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-4">
                <span className="flex items-center gap-3 text-sm text-fg/85">
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp
                </span>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  {contact.phone} <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-4 py-4">
                  <span className="flex items-center gap-3 text-sm text-fg/85">
                    <s.icon size={16} aria-hidden="true" />
                    {s.label}
                  </span>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                    Profile <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={resumeUrl}
              download="Laxman-Arukala-Resume.pdf"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-surface hover:bg-fg/85"
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
          </div>

          <div className="tone-cream rounded-2xl p-6 sm:p-8 lg:col-span-6 lg:col-start-7 lg:self-start">
            <Suspense fallback={<div className="min-h-[96px]" aria-hidden="true" />}>
              <ContactFrom />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
