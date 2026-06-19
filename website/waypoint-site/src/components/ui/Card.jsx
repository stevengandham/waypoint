export default function Card({ children, className = "", hover = true, ...props }) {
  return (
    <div
      className={`glass p-6 ${hover ? "hover:scale-[1.02] hover:bg-white/[0.07]" : ""} transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}