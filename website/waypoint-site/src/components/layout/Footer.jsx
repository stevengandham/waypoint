import content from "../../data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-8 text-center">
      <p className="text-slate-400 text-sm">
        {content.site.footer} &copy; {year}
      </p>
      <a
        href="https://beachpoint.church"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-slate-500 hover:text-orange-500 transition-colors mt-1 inline-block"
      >
        Visit Beachpoint Church
      </a>
    </footer>
  );
}