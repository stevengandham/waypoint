import content from "../../data/content";

export default function Values() {
  return (
    <section id="values" className="py-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        {content.values.heading}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.values.items.map((value, i) => (
          <div
            key={i}
            className={`glass p-6 hover:scale-[1.02] hover:bg-white/[0.07] transition-all duration-300 animate-fade-up stagger-${i + 1}`}
            style={{ animationFillMode: "both" }}
          >
            <div className="text-4xl mb-4">{value.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
            <p className="text-slate-400 leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}