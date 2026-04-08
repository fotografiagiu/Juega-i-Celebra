import React from "react";
import { t, type Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

const WHATSAPP_PHONE = "614037792";
const WHATSAPP_URL = `https://wa.me/34${WHATSAPP_PHONE}`;

const Features: React.FC<Props> = ({ lang }) => {
  const tr = t(lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* ===== BLOQUE 1: LOCAL ===== */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <img
            src="/gallery/Galeria11.jpeg"
            alt={tr.features.local.imageAlt}
            className="relative rounded-[40px] shadow-2xl z-10 object-cover"
          />

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

          {/* EQUIPAMIENTO ACTUALIZADO */}
          <div className="mb-10 bg-white rounded-[30px] border border-gray-100 p-6 shadow-sm">
            <h3 className="text-xl font-black text-gray-800 mb-4">
              Equipament i comoditats
            </h3>

            <ul className="space-y-3 text-gray-700 font-semibold">
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🪑</span>
                <span>40 cadires adults</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🧒</span>
                <span>30 cadires peques</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🪑</span>
                <span>6 taules plegables</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🧸</span>
                <span>4 taules peques</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">👑</span>
                <span>Tron d’aniversari</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🦘</span>
                <span>Cama elàstica</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🎯</span>
                <span>Diana de dards</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">♿</span>
                <span>Bany adaptat PMR amb canviador</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🧥</span>
                <span>Penjadors i zona de descans</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">📺</span>
                <span>Smart TV amb internet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">📦</span>
                <span>Magatzem</span>
              </li>

              <li className="flex items-start gap-3 pt-3 mt-2 border-t border-gray-100">
                <span className="mt-0.5">🍽️</span>
                <span>
                  Cuina de suport <strong>(no es pot cuinar)</strong>: nevera/congelador,
                  cafetera, microones i boteller
                </span>
              </li>
            </ul>
          </div>

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
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <img
            src="/gallery/Galeria21.jpeg"
            alt={tr.features.park.imageAlt}
            className="relative rounded-[40px] shadow-2xl z-10 object-cover"
          />

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

      {/* ===== BLOQUE 3: TRONO ===== */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mt-24">
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <img
            src="/gallery/imagen30.jpeg"
            alt="Tron d’aniversari"
            className="relative rounded-[40px] shadow-2xl z-10 object-cover"
          />

          <div
            className="
              absolute z-20 bg-white shadow-xl border-l-4 border-orange-500
              rounded-2xl
              bottom-4 right-4 p-4
              md:-bottom-6 md:-right-6 md:p-6
            "
          >
            <p className="text-2xl md:text-3xl font-black text-orange-500">Tron</p>
            <p className="text-gray-500 font-bold text-sm md:text-base">
              aniversaris especials
            </p>
          </div>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            Tron d’
            <span className="text-orange-500">aniversari</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Ara els peques també poden viure el seu moment més especial com a reis i
            reines de la celebració.
          </p>

          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-gray-700 font-semibold">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </span>
              Ideal per al moment del pastís, fotos i celebració.
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-semibold">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </span>
              Un detall visual que fa l’aniversari més especial.
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-semibold">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </span>
              Perfecte per a records bonics i fotos inoblidables.
            </li>
          </ul>
        </div>
      </div>

      {/* ===== BLOQUE 4: CAMA ELÁSTICA + DIANA ===== */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mt-24">
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <img
            src="/gallery/imagen31.jpeg"
            alt="Cama elàstica"
            className="relative rounded-[40px] shadow-2xl z-10 object-cover"
          />

          <div
            className="
              absolute z-20 bg-white shadow-xl border-l-4 border-blue-500
              rounded-2xl
              bottom-4 left-4 p-4
              md:-bottom-6 md:-left-6 md:p-6
            "
          >
            <p className="text-2xl md:text-3xl font-black text-blue-600">Més joc</p>
            <p className="text-gray-500 font-bold text-sm md:text-base">
              més diversió
            </p>
          </div>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            Més diversió per als{" "}
            <span className="text-orange-500">peques</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            A més del parc de boles, també comptem amb més opcions perquè la celebració
            siga encara més entretinguda.
          </p>

          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-gray-700 font-semibold">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </span>
              Cama elàstica per a continuar botant i passant-ho en gran.
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-semibold">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </span>
              Diana de dards per a sumar joc i entreteniment.
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-semibold">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </span>
              Sempre amb ús responsable i supervisió d’un adult.
            </li>
          </ul>
        </div>
      </div>

      {/* ===== BLOQUE 5: LIMPIEZA ===== */}
      <div className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-4">
            Servei de <span className="text-orange-500">neteja</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tria l’opció que millor et vinga i acaba la celebració amb més comoditat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-1 relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-60"></div>
            <img
              src="/gallery/imagen32.jpeg"
              alt="Servei de neteja"
              className="relative rounded-[40px] shadow-2xl object-cover h-full min-h-[320px]"
            />
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-[30px] p-8 shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-black mb-6">
                Opció 1
              </div>
              <h3 className="text-5xl font-black text-blue-600 mb-4">20€</h3>
              <p className="text-2xl font-black text-gray-800 mb-3">Escombrem i freguem</p>
              <p className="text-gray-600 font-semibold leading-relaxed">
                Vosaltres feu una recollida bàsica i nosaltres deixem el terra a punt.
              </p>
            </div>

            <div className="bg-white rounded-[30px] p-8 shadow-lg border-2 border-orange-300">
              <div className="inline-flex items-center justify-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-black mb-6">
                Opció 2
              </div>
              <h3 className="text-5xl font-black text-orange-500 mb-4">60€</h3>
              <p className="text-2xl font-black text-gray-800 mb-3">
                Ens encarreguem de tot
              </p>
              <p className="text-gray-600 font-semibold leading-relaxed">
                Per a qui prefereix acabar la celebració i anar-se’n sense preocupar-se
                de res.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
