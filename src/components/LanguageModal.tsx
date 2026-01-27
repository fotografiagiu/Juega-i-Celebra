import React, { useEffect, useState } from "react";

export type Lang = "val" | "es";

type Props = {
  open: boolean;
  onSelect: (lang: Lang) => void;
};

const STORAGE_KEY = "juga_lang";

const LanguageModal: React.FC<Props> = ({ open, onSelect }) => {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setAnim(true), 10);
      return () => clearTimeout(t);
    }
    setAnim(false);
  }, [open]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") choose("val"); // cierre “seguro” eligiendo valencià
    };
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const choose = (lang: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    onSelect(lang);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop (click = valencià por defecto) */}
      <button
        aria-label="Tancar"
        onClick={() => choose("val")}
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          anim ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-lg rounded-[28px] bg-white shadow-2xl border border-gray-100 p-7 sm:p-8 transition-all ${
          anim ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black text-blue-600 uppercase tracking-widest">
              Juga i Celebra
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
              Tria l’idioma
            </h3>
            <p className="text-sm sm:text-base text-gray-600 font-semibold mt-2 leading-relaxed">
              Per defecte la web es mostra en <strong>Valencià</strong>. Pots canviar-ho quan vulgues.
            </p>
          </div>

          {/* Cerrar = valencià por defecto */}
          <button
            onClick={() => choose("val")}
            className="w-10 h-10 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-black"
            aria-label="Tancar modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => choose("val")}
            className="rounded-[22px] border-2 border-blue-600 bg-blue-600 text-white p-5 text-left shadow-lg hover:bg-blue-700 transition-all"
          >
            <div className="text-sm font-black uppercase tracking-widest text-white/90">
              Recomanat
            </div>
            <div className="text-2xl font-black mt-1">Valencià</div>
            <div className="text-sm font-semibold mt-2 text-white/90">
              (Predeterminat)
            </div>
          </button>

          <button
            onClick={() => choose("es")}
            className="rounded-[22px] border-2 border-gray-200 bg-white text-gray-900 p-5 text-left shadow-sm hover:bg-gray-50 transition-all"
          >
            <div className="text-sm font-black uppercase tracking-widest text-gray-500">
              Opció
            </div>
            <div className="text-2xl font-black mt-1">Castellano</div>
            <div className="text-sm font-semibold mt-2 text-gray-600">
              Cambiar idioma
            </div>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-xs text-gray-500 font-semibold">
            Guardem la teua elecció en aquest dispositiu.
          </p>

          <button
            onClick={() => choose("val")}
            className="text-sm font-black text-blue-600 hover:underline"
          >
            Ara no
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
