import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { timeAgo } from "@/utils/datetime";

const typeColor = (t) =>
  ({
    accident: "bg-orange-100 text-orange-700 border-orange-200",
    traffic:  "bg-amber-100  text-amber-700  border-amber-200",
    crime:    "bg-red-100    text-red-700    border-red-200",
    disaster: "bg-green-100  text-green-700  border-green-200",
    weather:  "bg-sky-100    text-sky-700    border-sky-200",
  }[t] || "bg-slate-100 text-slate-700 border-slate-200");

const typeLabelKey = (t) =>
  ({
    accident: "incidentTypes.accident",
    traffic:  "incidentTypes.traffic",
    crime:    "incidentTypes.crime",
    disaster: "incidentTypes.disaster",
    weather:  "incidentTypes.weather",
  }[t] || "incidentTypes.total");

export default function IncidentModal({ incident, onClose }) {
  const { t } = useTranslation();
  const closeBtnRef = useRef(null);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!incident) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-3"
      role="dialog"
      aria-modal="true"
      aria-labelledby="incident-title"
      onClick={onClose}
    >
      <article
        className="w-full max-w-xl rounded-2xl border bg-white p-4 shadow-2xl transition will-change-transform"
        onClick={stop}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-xs font-bold ${typeColor(
                incident.type
              )}`}
            >
              {t(typeLabelKey(incident.type))}
            </span>
            <span className="mt-1 text-xs font-semibold text-slate-500">
              {timeAgo(incident.timestamp)} {t("bali.timeAgo")}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            aria-label={t("common.close") || "Close"}
          >
            ✕
          </button>
        </div>

        {/* Contenido (igual a UniformCard, con scroll si crece) */}
        <div className="mt-3 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {incident.description && (
            <p className="text-[0.98rem] leading-6 text-slate-900 whitespace-pre-wrap">
              {incident.description}
            </p>
          )}

          {incident.photoURL && (
            <div className="overflow-hidden rounded-xl">
              <img
                src={incident.photoURL}
                alt="Incident"
                loading="lazy"
                className="w-full object-cover"
                style={{ aspectRatio: "16 / 9" }}
              />
            </div>
          )}

          {/* Meta */}
          <div className="space-y-1 text-xs">
            <div className="font-medium text-slate-700 break-words">
              {incident.location || "—"}
            </div>

            <div className="text-slate-600">
              {incident.latitude && incident.longitude ? (
                <span className="inline-flex items-center gap-1">
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-700">
                    {Number(incident.latitude).toFixed(5)},{" "}
                    {Number(incident.longitude).toFixed(5)}
                  </span>
                </span>
              ) : (
                t("bali.noCoords")
              )}
            </div>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                {t("bali.reportedOn")}{" "}
                {new Date(incident.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
