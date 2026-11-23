import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/portfolio";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="tone-cream sticky top-0 z-50 border-b border-fg/20">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6 md:px-10">
        <a href="#hero" className="font-display text-base font-semibold tracking-tight">
          Laxman Arukala
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.slice(1, -1).map((link) => (
            <a key={link.label} href={link.href} className="text-sm hover:underline">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="rounded-full bg-fg px-5 py-2 text-sm font-medium text-surface hover:bg-fg/85">
            Let's talk
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-fg/30 lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-fg/20 px-4 pb-3 sm:px-6 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-fg/10 py-3 font-display text-lg font-medium last:border-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default NavBar;
