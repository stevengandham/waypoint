import content from "../../data/content";

export default function Vision() {
  return (
    <section id="vision" className="py-24 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
        {content.vision.heading}
      </h2>
      <blockquote className="border-l-4 border-indigo-500 pl-6 py-2">
        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed italic">
          "{content.vision.body}"
        </p>
      </blockquote>
    </section>
  );
}