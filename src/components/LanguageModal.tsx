import React from "react";
import type { Lang } from "../i18n";

type Props = {
  currentLang: Lang;
  onSelect: (lang: Lang) => void;
  onClose: () => void;
};

export default function LanguageModal({ currentLang, onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/55 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-7 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
              Llengua / Idioma
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 leading-tight">
              {currentLang === "val"
                ? "Com vols veure la pàgina?"
                : "¿Cómo quieres ver la página?"}
            </h3>
            <p className="text-gray-600 font-semibold mt-2">
              {currentLang === "val"
                ? "Pots canviar-ho quan vulgues des del botó de dalt."
                : "Puedes cambiarlo cuando quieras desde el botón de arriba."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all font-black text-gray-700"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Options */}
        <div className="px-6 sm:px-7 pb-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Valencià */}
            <button
              onClick={() => onSelect("val")}
              className="group text-left rounded-[24px] border-2 border-blue-600 bg-blue-600 text-white p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-black">Valencià</div>
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-xl">
                  🌿
                </div>
              </div>
              <div className="mt-2 text-sm font-semibold text-white/90">
                Predeterminat (recomanat)
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                Seleccionar <span className="opacity-80">→</span>
              </div>
            </button>

            {/* Castellano */}
            <button
              onClick={() => onSelect("es")}
              className="group text-left rounded-[24px] border-2 border-gray-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-black text-gray-900">Castellano</div>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">
                  🇪🇸
                </div>
              </div>
              <div className="mt-2 text-sm font-semibold text-gray-600">
                Cambiar a español
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600">
                Seleccionar <span className="opacity-80">→</span>
              </div>
            </button>
          </div>

          {/* Footer note */}
          <div className="mt-5 text-[12px] text-gray-400 font-semibold">
            Tip: también puedes usar <span className="font-black">?lang=val</span> o{" "}
            <span className="font-black">?lang=es</span> en el enlace.
          </div>
        </div>
      </div>
    </div>
  );
}
