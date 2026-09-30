import { ArrowRight, X, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import type { Councillor } from "@/data/civic-data";

interface ContactModalProps {
  councillor: Councillor | null;
  onClose: () => void;
}

export function ContactModal({ councillor, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!councillor) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="contact-modal max-w-lg w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="verified-pill !py-0.5 !px-2 !text-[11px]">
              <ShieldCheck size={12} /> Verified Representative
            </span>
            <h2 id="contact-title" className="mt-2 font-display text-xl font-bold text-ink">
              {councillor.name}
            </h2>
            <p className="text-xs text-steel/80 mt-0.5">
              Ward {councillor.ward} Councillor · {councillor.municipality}
            </p>
          </div>
          <button
            type="button"
            className="button-base icon-button"
            aria-label="Close contact dialog"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center">
            <CheckCircle2 size={36} className="mx-auto text-emerald-600 mb-2" />
            <h3 className="font-display font-bold text-ink">Message Logged with Ward Office</h3>
            <p className="mt-1 text-xs text-steel/80 leading-relaxed">
              Your inquiry has been queued for Ward {councillor.ward} administrative review. You
              will receive tracking updates via the resident service portal.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="button-base button-dark button-small mt-4"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="info-tile !py-2">
                <Mail size={13} className="shrink-0 text-steel" />
                <span className="truncate">{councillor.email}</span>
              </div>
              <div className="info-tile !py-2">
                <Phone size={13} className="shrink-0 text-steel" />
                <span>{councillor.phone}</span>
              </div>
              <div className="info-tile sm:col-span-2 !py-2">
                <Clock size={13} className="shrink-0 text-steel" />
                <span>Office hours: {councillor.officeHours}</span>
              </div>
            </div>

            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label
                  htmlFor="msg-subject"
                  className="block text-xs font-semibold text-steel mb-1"
                >
                  Subject or Issue Category
                </label>
                <input
                  id="msg-subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Water outage, street light fault, road repair"
                  className="w-full rounded-lg border border-steel/20 bg-white/80 px-3 py-2 text-xs text-ink outline-none focus:border-electric"
                />
              </div>
              <div>
                <label
                  htmlFor="msg-content"
                  className="block text-xs font-semibold text-steel mb-1"
                >
                  Message for Councillor
                </label>
                <textarea
                  id="msg-content"
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your request or community feedback in detail..."
                  className="w-full rounded-lg border border-steel/20 bg-white/80 px-3 py-2 text-xs text-ink outline-none focus:border-electric resize-none"
                />
              </div>
              <button
                type="submit"
                className="button-base button-dark w-full justify-center !py-2.5 text-xs font-bold"
              >
                Send verified inquiry <ArrowRight size={14} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
