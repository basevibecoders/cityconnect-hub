import React, { useState, useEffect } from "react";
import { X, Save, ShieldCheck, MapPin, Layers } from "lucide-react";
import { useCivic } from "@/context/CivicContext";
import type { Ward } from "@/data/civic-data";

export function EditWardModal() {
  const { editingWard, setEditingWard, updateWard, municipalities } = useCivic();
  const [formData, setFormData] = useState<Ward | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [prioritiesInput, setPrioritiesInput] = useState("");

  useEffect(() => {
    if (editingWard) {
      setFormData({ ...editingWard });
      setPrioritiesInput(editingWard.keyPriorities.join(", "));
      setSavedSuccess(false);
    }
  }, [editingWard]);

  if (!editingWard || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPriorities = prioritiesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    updateWard(editingWard.wardNumber, editingWard.municipality, {
      ...formData,
      keyPriorities: parsedPriorities.length > 0 ? parsedPriorities : formData.keyPriorities,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setEditingWard(null);
    }, 800);
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-ward-title"
    >
      <div className="contact-modal !max-w-xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-electric/15 text-electric">
              <MapPin size={18} />
            </span>
            <div>
              <h2
                id="edit-ward-title"
                className="font-display text-lg font-bold text-ink leading-tight"
              >
                Edit Ward Infrastructure Card
              </h2>
              <p className="text-xs text-steel/80">
                Updating live records for Ward {formData.wardNumber}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full p-1 text-steel hover:bg-ink/5 hover:text-ink"
            onClick={() => setEditingWard(null)}
            aria-label="Close edit dialog"
          >
            <X size={18} />
          </button>
        </div>

        {savedSuccess && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs font-semibold text-emerald-900">
            <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
            Ward records updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Ward Number
              </label>
              <input
                type="text"
                required
                className="select-control w-full !bg-white/80"
                value={formData.wardNumber}
                onChange={(e) => setFormData({ ...formData, wardNumber: e.target.value })}
              />
            </div>
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
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
              Suburbs / Localities Included
            </label>
            <input
              type="text"
              required
              className="select-control w-full !bg-white/80"
              value={formData.suburbs}
              onChange={(e) => setFormData({ ...formData, suburbs: e.target.value })}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
              Assigned Ward Councillor
            </label>
            <input
              type="text"
              required
              className="select-control w-full !bg-white/80"
              value={formData.councillorName}
              onChange={(e) => setFormData({ ...formData, councillorName: e.target.value })}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Registered Voters
              </label>
              <input
                type="number"
                min="0"
                required
                className="select-control w-full !bg-white/80"
                value={formData.registeredVoters}
                onChange={(e) =>
                  setFormData({ ...formData, registeredVoters: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Active Projects Count
              </label>
              <input
                type="number"
                min="0"
                required
                className="select-control w-full !bg-white/80"
                value={formData.activeProjects}
                onChange={(e) =>
                  setFormData({ ...formData, activeProjects: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
              Key Infrastructure Priorities (comma separated)
            </label>
            <textarea
              rows={3}
              required
              className="w-full rounded-xl border border-ink/15 bg-white/80 p-3 text-xs text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-electric"
              value={prioritiesInput}
              placeholder="e.g. Water Reticulation, Street Lighting, Substation Security"
              onChange={(e) => setPrioritiesInput(e.target.value)}
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
            <button
              type="button"
              className="button-base button-light text-xs"
              onClick={() => setEditingWard(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-base button-dark text-xs !bg-electric hover:!bg-electric/90 text-white flex items-center gap-1.5 shadow-sm"
            >
              <Save size={14} /> Save Ward Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
