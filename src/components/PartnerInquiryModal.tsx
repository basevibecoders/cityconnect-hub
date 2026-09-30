import { useState } from "react";
import { X, Sparkles, CheckCircle2 } from "lucide-react";
import { municipalities } from "@/data/civic-data";

interface PartnerInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerInquiryModal({ isOpen, onClose }: PartnerInquiryModalProps) {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [company, setCompany] = useState("");
  const [targetMetro, setTargetMetro] = useState("City of Johannesburg (Gauteng)");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFullName("");
    setWorkEmail("");
    setCompany("");
    setMessage("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-inquiry-title"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-ink/10 bg-white p-6 shadow-2xl sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-ink/5 text-steel hover:bg-ink/10 hover:text-ink transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-200">
              <CheckCircle2 size={32} />
            </div>
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-2">
              Application Received
            </span>
            <h3 className="font-display text-2xl font-bold text-ink">Thank You, {fullName}!</h3>
            <p className="mt-2 text-sm text-steel/80 max-w-sm mx-auto">
              Your loyalty reward partner enquiry for{" "}
              <strong>{company || "your organization"}</strong> in <strong>{targetMetro}</strong>{" "}
              has been received. Our partnership team will contact <strong>{workEmail}</strong> with
              custom ward metrics and tier pricing.
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="button-base rounded-2xl bg-[#1B8057] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#156745] transition-all shadow-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Tag Badge */}
            <div className="mb-2">
              <span className="inline-block rounded-full bg-emerald-100/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                GENERAL PARTNERSHIP
              </span>
            </div>

            {/* Title & Description */}
            <h2
              id="partner-inquiry-title"
              className="font-display text-2xl font-bold text-ink sm:text-3xl"
            >
              Partner Inquiry
            </h2>
            <p className="mt-1 text-xs text-steel/80 sm:text-sm">
              Fill in your details to get custom ward metrics and tier pricing.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Thandi Mokoena"
                  className="w-full rounded-xl bg-[#F4F1EA]/90 border border-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-steel/50 focus:bg-white focus:border-ink/20 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="thandi@company.co.za"
                    className="w-full rounded-xl bg-[#F4F1EA]/90 border border-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-steel/50 focus:bg-white focus:border-ink/20 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Civics Group"
                    className="w-full rounded-xl bg-[#F4F1EA]/90 border border-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-steel/50 focus:bg-white focus:border-ink/20 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Target Metro / Municipality
                </label>
                <select
                  value={targetMetro}
                  onChange={(e) => setTargetMetro(e.target.value)}
                  className="w-full rounded-xl bg-[#F4F1EA]/90 border border-transparent px-3.5 py-2.5 text-sm text-ink focus:bg-white focus:border-ink/20 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all cursor-pointer"
                >
                  <option value="National / All Metros">
                    National / All Metros (South Africa)
                  </option>
                  {municipalities.map((m) => (
                    <option key={m.code} value={`${m.name} (${m.province})`}>
                      {m.name} ({m.province})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">Optional Message</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your target wards or SED goals..."
                  className="w-full resize-none rounded-xl bg-[#F4F1EA]/90 border border-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-steel/50 focus:bg-white focus:border-ink/20 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-sm font-semibold text-steel hover:text-ink transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="button-base rounded-2xl bg-[#1B8057] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#156745] active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
