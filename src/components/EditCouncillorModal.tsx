import React, { useState, useEffect } from "react";
import { X, Save, ShieldCheck, UserCheck, Sparkles, AlertCircle } from "lucide-react";
import { useCivic } from "@/context/CivicContext";
import type { Councillor } from "@/data/civic-data";

export function EditCouncillorModal() {
  const { editingCouncillor, setEditingCouncillor, updateCouncillor, municipalities } = useCivic();
  const [formData, setFormData] = useState<Councillor | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [focusInput, setFocusInput] = useState("");

  useEffect(() => {
    if (editingCouncillor) {
      setFormData({ ...editingCouncillor });
      setFocusInput(editingCouncillor.focus.join(", "));
      setSavedSuccess(false);
    }
  }, [editingCouncillor]);

  if (!editingCouncillor || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedFocus = focusInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    updateCouncillor(formData.id, {
      ...formData,
      focus: parsedFocus.length > 0 ? parsedFocus : formData.focus,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setEditingCouncillor(null);
    }, 800);
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-councillor-title"
    >
      <div className="contact-modal !max-w-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-electric/15 text-electric">
              <UserCheck size={18} />
            </span>
            <div>
              <h2
                id="edit-councillor-title"
                className="font-display text-lg font-bold text-ink leading-tight"
              >
                Edit Councillor Profile
              </h2>
              <p className="text-xs text-steel/80">Updating live record for Ward {formData.ward}</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full p-1 text-steel hover:bg-ink/5 hover:text-ink"
            onClick={() => setEditingCouncillor(null)}
            aria-label="Close edit dialog"
          >
            <X size={18} />
          </button>
        </div>

        {savedSuccess && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs font-semibold text-emerald-900">
            <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
            Changes saved successfully! Updating directory...
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="select-control w-full !bg-white/80"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Ward Number
              </label>
              <input
                type="text"
                required
                className="select-control w-full !bg-white/80"
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Municipality
              </label>
              <select
                className="select-control w-full !bg-white/80"
                value={formData.municipality}
                onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
              >
                {municipalities.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} ({m.province})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Key Areas / Suburbs
              </label>
              <input
                type="text"
                required
                className="select-control w-full !bg-white/80"
                value={formData.areas}
                onChange={(e) => setFormData({ ...formData, areas: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
              Public Statement / Bio
            </label>
            <textarea
              rows={3}
              required
              className="w-full rounded-xl border border-ink/15 bg-white/80 p-3 text-xs text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-electric"
              value={formData.statement}
              onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
              Priority Focus Areas (comma separated)
            </label>
            <input
              type="text"
              className="select-control w-full !bg-white/80"
              value={focusInput}
              placeholder="e.g. Substation Upgrades, Road Resurfacing, Stormwater Drainage"
              onChange={(e) => setFocusInput(e.target.value)}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="select-control w-full !bg-white/80 text-xs"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                required
                className="select-control w-full !bg-white/80 text-xs"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Office Hours
              </label>
              <input
                type="text"
                required
                className="select-control w-full !bg-white/80 text-xs"
                value={formData.officeHours}
                onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Resolved Commitments Count
              </label>
              <input
                type="number"
                min="0"
                className="select-control w-full !bg-white/80"
                value={formData.commitments}
                onChange={(e) =>
                  setFormData({ ...formData, commitments: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Civic Activity Score (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="select-control w-full !bg-white/80"
                value={formData.activityScore}
                onChange={(e) =>
                  setFormData({ ...formData, activityScore: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
            <button
              type="button"
              className="button-base button-light text-xs"
              onClick={() => setEditingCouncillor(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-base button-dark text-xs !bg-electric hover:!bg-electric/90 text-white flex items-center gap-1.5 shadow-sm"
            >
              <Save size={14} /> Save Councillor Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
