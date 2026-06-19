export default function TabButton({ children, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
        active
          ? "text-white"
          : "text-slate-400 hover:text-slate-200"
      }`}
    >
      {children}
      {active && (
        <span className="nav-indicator absolute bottom-0 left-0 w-full" />
      )}
    </button>
  );
}