import { useState, useEffect, useRef, useCallback } from "react";
import PageShell from "./components/layout/PageShell";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Vision from "./components/sections/Vision";
import Values from "./components/sections/Values";
import Contact from "./components/sections/Contact";
import Socials from "./components/sections/Socials";
import Gallery from "./components/sections/Gallery";
import InterestForm from "./components/sections/InterestForm";

const SECTIONS = [
  "home",
  "about",
  "vision",
  "values",
  "contact",
  "socials",
  "gallery",
  "interest",
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef(null);

  // Scroll spy
  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean,
    );

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback(
    (id) => {
      scrollTo(id);
    },
    [scrollTo],
  );

  return (
    <PageShell>
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      <main className="flex-1">
        <Hero />
        <About />
        <Vision />
        <Values />
        <Contact />
        <Socials />
        <Gallery />
        <InterestForm />
      </main>

      <Footer />
    </PageShell>
  );
}