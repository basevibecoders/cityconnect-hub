import React, { useState, useEffect } from "react";
import { X, Save, ShieldCheck, Building2 } from "lucide-react";
import { useCivic } from "@/context/CivicContext";
import type { Municipality } from "@/data/civic-data";

export function EditMunicipalityModal() {
  const { editingMunicipality, setEditingMunicipality, updateMunicipality } = useCivic();
  const [formData, setFormData] = useState<Municipality | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (editingMunicipality) {
      setFormData({ ...editingMunicipality });
      setSavedSuccess(false);
    }
  }, [editingMunicipality]);

  if (!editingMunicipality || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMunicipality(editingMunicipality.code, formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setEditingMunicipality(null);
    }, 800);
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-muni-title"
    >
      <div className="contact-modal !max-w-xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-electric/15 text-electric">
              <Building2 size={18} />
            </span>
            <div>
              <h2
                id="edit-muni-title"
                className="font-display text-lg font-bold text-ink leading-tight"
              >
                Edit Municipality Card
              </h2>
              <p className="text-xs text-steel/80">Updating live records for {formData.code}</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full p-1 text-steel hover:bg-ink/5 hover:text-ink"
            onClick={() => setEditingMunicipality(null)}
            aria-label="Close edit dialog"
          >
            <X size={18} />
          </button>
        </div>

        {savedSuccess && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs font-semibold text-emerald-900">
            <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
            Municipality card updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Official Municipality Name
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
                Short Name / City
              </label>
              <input
                type="text"
                required
                className="select-control w-full !bg-white/80"
                value={formData.short}
                onChange={(e) => setFormData({ ...formData, short: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Province
              </label>
              <input
                type="text"
                required
                className="select-control w-full !bg-white/80"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Total Wards
              </label>
              <input
                type="number"
                min="1"
                required
                className="select-control w-full !bg-white/80"
                value={formData.wards}
                onChange={(e) => setFormData({ ...formData, wards: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
                Category
              </label>
              <select
                className="select-control w-full !bg-white/80"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as "Metropolitan" | "Local" })
                }
              >
                <option value="Metropolitan">Metropolitan</option>
                <option value="Local">Local</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-steel uppercase tracking-wider block mb-1">
              Description & Demographics
            </label>
            <textarea
              rows={3}
              required
              className="w-full rounded-xl border border-ink/15 bg-white/80 p-3 text-xs text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-electric"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
            <button
              type="button"
              className="button-base button-light text-xs"
              onClick={() => setEditingMunicipality(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-base button-dark text-xs !bg-electric hover:!bg-electric/90 text-white flex items-center gap-1.5 shadow-sm"
            >
              <Save size={14} /> Save Municipality Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
