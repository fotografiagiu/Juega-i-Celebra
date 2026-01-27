import React from "react";
import type { Lang } from "./LanguageModal";

type Props = {
  current: Lang;
  onClick: () => void;
};

const LanguagePill: React.FC<Props> = ({ current, onClick }) => {
  const label = current === "val" ? "Valencià" : "Castellano";

  return (
    <button
      onClick={onClick}
      className="fixed z-[9998] bottom-4 left-4 sm:bottom-6 sm:left-6 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-xl px-4 py-3 flex items-center gap-2 hover:bg-white transition-all"
      aria-label="Cambiar idioma"
      type="button"
    >
      <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center">
        🌐
      </span>
      <div className="text-left leading-tight">
        <div className="text-xs font-black text-gray-500 uppercase">Idioma</div>
        <div className="text-sm font-black text-gray-900">{label}</div>
      </div>
    </button>
  );
};

export default LanguagePill;
