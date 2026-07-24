import { useState } from "react";
import content from "../../data/content";

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="py-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        {content.gallery.heading}
      </h2>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {content.gallery.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Gallery photo ${i + 1}`}
            className="w-full rounded-xl cursor-pointer hover:opacity-90 transition-opacity duration-200 break-inside-avoid"
            onClick={() => setLightbox(src)}
          />
        ))}
      </div>

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
