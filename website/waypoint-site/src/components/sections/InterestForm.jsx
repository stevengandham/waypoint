import { useState } from "react";
import content from "../../data/content";
import Button from "../ui/Button";
import Toast from "../ui/Toast";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BLOCKS = ["Morning", "Afternoon", "Evening"];

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  lifeGroup: "Yes",
};

export default function InterestForm() {
  const [form, setForm] = useState(initialState);
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleSlot = (slotId) => {
    setSelectedSlots((prev) => {
      const next = new Set(prev);
      if (next.has(slotId)) {
        next.delete(slotId);
      } else {
        next.add(slotId);
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      availability: Array.from(selectedSlots).join(", "),
    };

    try {
      const response = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setForm(initialState);
        setSelectedSlots(new Set());
        setToast({ message: content.interestForm.successMessage, type: "success" });
      } else {
        setToast({ message: content.interestForm.errorMessage, type: "error" });
      }
    } catch (err) {
      setToast({ message: content.interestForm.errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200";

  return (
    <section id="interest" className="py-24 px-4 max-w-2xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
        {content.interestForm.heading}
      </h2>
      <p className="text-slate-400 text-center mb-10 max-w-md mx-auto">
        {content.interestForm.subheading}
      </p>

      <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-1.5">
              {content.interestForm.fields.firstName}
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={form.firstName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Jane"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-1.5">
              {content.interestForm.fields.lastName}
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={form.lastName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
            {content.interestForm.fields.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1.5">
            {content.interestForm.fields.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="lifeGroup" className="block text-sm font-medium text-slate-300 mb-1.5">
            {content.interestForm.fields.lifeGroup}
          </label>
          <select
            id="lifeGroup"
            name="lifeGroup"
            value={form.lifeGroup}
            onChange={handleChange}
            className={inputClass}
          >
            {content.interestForm.lifeGroupOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            {content.interestForm.fields.availability}
          </label>
          <p className="text-xs text-slate-500 mb-3">
            {content.interestForm.fields.availabilityHint}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
            {DAYS.map((day) =>
              BLOCKS.map((block) => {
                const slotId = `${day}-${block}`;
                const isSelected = selectedSlots.has(slotId);
                return (
                  <button
                    type="button"
                    key={slotId}
                    onClick={() => toggleSlot(slotId)}
                    className={`rounded-lg border px-2 py-2 text-xs font-medium text-center transition-all duration-150 ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 border-transparent text-white"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {day} {block}
                  </button>
                );
              }),
            )}
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? content.interestForm.submitting : content.interestForm.submit}
        </Button>

        <p className="text-xs text-slate-500 text-center">
          {content.interestForm.privacy}
        </p>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
