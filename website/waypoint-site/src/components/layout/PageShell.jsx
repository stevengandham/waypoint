export default function PageShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="orb orb-indigo w-[600px] h-[600px] -top-40 -right-40 animate-slow-spin" />
        <div className="orb orb-orange w-[500px] h-[500px] -bottom-32 -left-32" />
        <div className="orb orb-pink w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {children}
    </div>
  );
}