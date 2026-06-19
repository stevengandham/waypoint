import content from "../../data/content";
import Button from "../ui/Button";

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-500/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-indigo-500/30 rounded-full animate-pulse stagger-1" />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-pink-500/30 rounded-full animate-pulse stagger-2" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-orange-500/20 rounded-full animate-pulse stagger-3" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-500/20 rounded-full animate-pulse stagger-4" />
      </div>

      {/* Logo */}
      <img
        src="/images/logo.svg"
        alt="Waypoint"
        className="w-48 sm:w-64 h-auto drop-shadow-[0_0_30px_rgba(236,72,153,0.3)] mb-8 animate-fade-up"
      />

      {/* Headline */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-center animate-fade-up stagger-1">
        <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
          {content.hero.headline}
        </span>
      </h1>

      {/* Subheadline */}
      <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-lg text-center animate-fade-up stagger-2">
        {content.hero.subheadline}
      </p>

      {/* CTA */}
      <div className="mt-10 animate-fade-up stagger-3">
        <Button onClick={() => scrollTo("interest")}>
          {content.hero.cta}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </div>
    </section>
  );
}