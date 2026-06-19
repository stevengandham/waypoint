import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg =
    type === "success"
      ? "bg-green-500/20 border-green-500/30 text-green-400"
      : "bg-red-500/20 border-red-500/30 text-red-400";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl border backdrop-blur-md shadow-lg animate-fade-up ${bg}`}
      role="alert"
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}