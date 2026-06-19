import { useState } from "react";
import content from "../../data/content";

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  // In a real setup, images would be dynamically loaded from public/images/
  // For now, show placeholder state
  return (
    <section id="gallery" className="py-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        {content.gallery.heading}
      </h2>

      {/* Placeholder state */}
      <div className="glass p-12 text-center max-w-xl mx-auto">
        <div className="text-5xl mb-4">📸</div>
        <p className="text-slate-400 text-lg">{content.gallery.placeholder}</p>
      </div>

      {/* Lightbox modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
          />
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}