import React from "react";
import { t, type Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

const WHATSAPP_PHONE = "614037792"; // ✅ nuevo
const WHATSAPP_URL = `https://wa.me/34${WHATSAPP_PHONE}`;

const Features: React.FC<Props> = ({ lang }) => {
  const tr = t(lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* ===== BLOQUE 1: LOCAL ===== */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* IMAGEN LOCAL */}
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <img
            src="/gallery/Galeria11.jpeg"
            alt={tr.features.local.imageAlt}
            className="relative rounded-[40px] shadow-2xl z-10 object-cover"
          />

          {/* BADGE */}
          <div
            className="
              absolute z-20 bg-white shadow-xl border-l-4 border-blue-500
              rounded-2xl
              bottom-4 right-4 p-4
              md:-bottom-6 md:-right-6 md:p-6
            "
          >
            <p className="text-2xl md:text-3xl font-black text-blue-600">+150 m²</p>
            <p className="text-gray-500 font-bold text-sm md:text-base">
              {tr.features.local.badgeSub}
            </p>
          </div>
        </div>

        {/* TEXTO LOCAL */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            {tr.features.local.titlePre}{" "}
            <span className="text-orange-500">{tr.features.local.titleHighlight}</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {tr.features.local.description}
          </p>

          <ul className="space-y-4 mb-10">
            {tr.features.local.points.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* EQUIPAMIENTO Y COMODIDADES */}
          <div className="mb-10 bg-white rounded-[30px] border border-gray-100 p-6 shadow-sm">
            <h3 className="text-xl font-black text-gray-800 mb-4">
              {tr.features.local.equipmentTitle}
            </h3>

            <ul className="space-y-3 text-gray-700 font-semibold">
              {tr.features.local.equipment.items.map(
                (it: { icon: string; text: string }, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5">{it.icon}</span>
                    <span>{it.text}</span>
                  </li>
                )
              )}

              {/* Línea especial cocina (con negrita) */}
              <li className="flex items-start gap-3 pt-3 mt-2 border-t border-gray-100">
                <span className="mt-0.5">{tr.features.local.equipment.kitchen.icon}</span>
                <span>
                  {tr.features.local.equipment.kitchen.prefix}{" "}
                  <strong>{tr.features.local.equipment.kitchen.noCook}</strong>
                  : {tr.features.local.equipment.kitchen.details}
                </span>
              </li>
            </ul>
          </div>

          {/* BOTONES */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-black shadow-lg hover:bg-blue-700 transition-all"
            >
              {tr.features.local.ctaContact}
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-500 text-white px-8 py-4 rounded-full font-black shadow-lg hover:bg-green-600 transition-all"
            >
              {tr.features.local.ctaWhatsapp}
            </a>
          </div>
        </div>
      </div>

      {/* ===== BLOQUE 2: PARQUE DE BOLAS ===== */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mt-24">
        {/* IMAGEN PARQUE */}
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <img
            src="/gallery/Galeria21.jpeg"
            alt={tr.features.park.imageAlt}
            className="relative rounded-[40px] shadow-2xl z-10 object-cover"
          />

          {/* BADGE PARQUE */}
          <div
            className="
              absolute z-20 bg-white shadow-xl border-l-4 border-blue-500
              rounded-2xl
              bottom-4 left-4 p-4
              md:-bottom-6 md:-left-6 md:p-6
            "
          >
            <p className="text-2xl md:text-3xl font-black text-blue-600">
              {tr.features.park.badgeTitle}
            </p>
            <p className="text-gray-500 font-bold text-sm md:text-base">
              {tr.features.park.badgeSub}
            </p>
          </div>
        </div>

        {/* TEXTO PARQUE */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            {tr.features.park.titlePre}{" "}
            <span className="text-orange-500">{tr.features.park.titleHighlight}</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {tr.features.park.description}
          </p>

          <ul className="space-y-4 mb-10">
            {tr.features.park.points.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#galeria"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-black shadow-lg hover:bg-blue-700 transition-all"
            >
              {tr.features.park.ctaGallery}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
