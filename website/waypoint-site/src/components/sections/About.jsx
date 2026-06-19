import content from "../../data/content";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {content.about.heading}
          </h2>
          <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
            {content.about.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Right: Stats */}
        <div className="grid gap-4">
          {content.about.stats.map((stat, i) => (
            <div
              key={i}
              className="glass p-6 hover:scale-[1.02] transition-all duration-300"
            >
              <p className="text-sm uppercase tracking-widest text-orange-500 font-medium mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}