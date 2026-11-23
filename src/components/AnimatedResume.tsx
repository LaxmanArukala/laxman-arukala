import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Capabilities from "./sections/Capabilities";
import Contact from "./sections/Contact";

/** The portfolio page. Content lives in src/data/portfolio.ts. */
const AnimatedResume: React.FC = () => (
  <>
    <a
      href="#main"
      className="sr-only z-[60] bg-fg px-4 py-2 text-sm text-surface focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
    <NavBar />
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Capabilities />
      <Contact />
    </main>
    <Footer />
  </>
);

export default AnimatedResume;
