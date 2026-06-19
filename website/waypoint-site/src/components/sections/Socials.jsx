import content from "../../data/content";

export default function Socials() {
  return (
    <section id="socials" className="py-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        {content.socials.heading}
      </h2>
      <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {content.socials.items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-6 hover:scale-[1.02] hover:bg-white/[0.07] transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 text-center block"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold text-white mb-1">{item.platform}</h3>
            <p className="text-slate-400 text-sm mb-2">{item.handle}</p>
            <span className="text-xs text-orange-500 font-medium uppercase tracking-wide">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}