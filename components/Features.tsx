import React from "react";
import { t, type Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

const WHATSAPP_PHONE = "614037792";
const WHATSAPP_URL = `https://wa.me/34${WHATSAPP_PHONE}`;

const Features: React.FC<Props> = ({ lang }) => {
  const tr = t(lang);
const isValenciano = lang === "val";

  const equipmentTitle = isValenciano
    ? "Equipament i comoditats"
    : "Equipamiento y comodidades";

  const equipmentItems = [
    {
      icon: "🪑",
      text: isValenciano ? "40 cadires adults" : "40 sillas de adultos",
    },
    {
      icon: "🧒",
      text: isValenciano ? "30 cadires peques" : "30 sillas peques",
    },
    {
      icon: "🪑",
      text: isValenciano ? "6 taules plegables" : "6 mesas plegables",
    },
    {
      icon: "🧸",
      text: isValenciano ? "5 taules peques" : "4 mesas peques",
    },
    {
      icon: "👑",
      text: isValenciano ? "Tron d’aniversari" : "Trono de cumpleaños",
    },
    {
      icon: "🦘",
      text: isValenciano ? "Cama elàstica" : "Cama elástica",
    },
    {
      icon: "🎯",
      text: isValenciano ? "Diana de dards" : "Diana de dardos",
    },
    {
      icon: "♿",
      text: isValenciano
        ? "Bany adaptat PMR amb canviador"
        : "Baño adaptado PMR con cambiador",
    },
    {
      icon: "🧥",
      text: isValenciano
        ? "Penjadors i zona de descans"
        : "Percheros y zona de descanso",
    },
    {
      icon: "📺",
      text: isValenciano ? "Smart TV amb internet" : "Smart TV con internet",
    },
    {
      icon: "📦",
      text: isValenciano ? "Magatzem" : "Almacén",
    },
  ];

  const kitchenPrefix = isValenciano ? "Cuina de suport" : "Cocina de apoyo";
  const kitchenNoCook = isValenciano ? "no es pot cuinar" : "no se puede cocinar";
  const kitchenDetails = isValenciano
    ? "nevera/congelador, cafetera, microones i boteller"
    : "nevera/congelador, cafetera, microondas y botellero";

  const throneBadgeTitle = isValenciano ? "Tron" : "Trono";
  const throneBadgeSub = isValenciano
    ? "aniversaris especials"
    : "cumpleaños especiales";

  const throneTitlePre = isValenciano ? "Tron d’" : "Trono de ";
  const throneTitleHighlight = isValenciano ? "aniversari" : "cumpleaños";

  const throneDescription = isValenciano
    ? "Ara els peques també poden viure el seu moment més especial com a reis i reines de la celebració."
    : "Ahora los peques también pueden vivir su momento más especial como reyes y reinas de la celebración.";

  const thronePoints = [
    isValenciano
      ? "Ideal per al moment del pastís, fotos i celebració."
      : "Ideal para el momento de la tarta, fotos y celebración.",
    isValenciano
      ? "Un detall visual que fa l’aniversari més especial."
      : "Un detalle visual que hace el cumpleaños más especial.",
    isValenciano
      ? "Perfecte per a records bonics i fotos inoblidables."
      : "Perfecto para recuerdos bonitos y fotos inolvidables.",
  ];

  const moreFunBadgeTitle = isValenciano ? "Més joc" : "Más juego";
  const moreFunBadgeSub = isValenciano ? "més diversió" : "más diversión";

  const moreFunTitlePre = isValenciano
    ? "Més diversió per als"
    : "Más diversión para los";
  const moreFunTitleHighlight = "peques";

  const moreFunDescription = isValenciano
    ? "A més del parc de boles, també comptem amb més opcions perquè la celebració siga encara més entretinguda."
    : "Además del parque de bolas, también contamos con más opciones para que la celebración sea todavía más entretenida.";

  const moreFunPoints = [
    isValenciano
      ? "Cama elàstica per a continuar botant i passant-ho en gran."
      : "Cama elástica para seguir saltando y pasándolo en grande.",
    isValenciano
      ? "Diana de dards per a sumar joc i entreteniment."
      : "Diana de dardos para sumar juego y entretenimiento.",
  ];

  const cleaningTitlePre = isValenciano ? "Servei de" : "Servicio de";
  const cleaningTitleHighlight = isValenciano ? "neteja" : "limpieza";

  const cleaningDescription = isValenciano
    ? "Tria l’opció que millor et vinga i acaba la celebració amb més comoditat."
    : "Elige la opción que mejor te venga y termina la celebración con más comodidad.";

  const cleaningOption1 = isValenciano ? "Opció 1" : "Opción 1";
  const cleaningOption2 = isValenciano ? "Opció 2" : "Opción 2";

  const cleaningBasicTitle = isValenciano
    ? "Escombrem i freguem"
    : "Barrido y fregado";

  const cleaningBasicDesc = isValenciano
    ? "Vosaltres feu una recollida bàsica i nosaltres deixem el terra a punt."
    : "Vosotros hacéis una recogida básica y nosotros dejamos el suelo listo.";

  const cleaningFullTitle = isValenciano
    ? "Ens encarreguem de tot"
    : "Nos encargamos de todo";

  const cleaningFullDesc = isValenciano
    ? "Per a qui prefereix acabar la celebració i anar-se’n sense preocupar-se de res."
    : "Para quien prefiere terminar la celebración e irse sin preocuparse de nada.";

  const cleaningImageAlt = isValenciano ? "Servei de neteja" : "Servicio de limpieza";
  const throneImageAlt = isValenciano ? "Tron d’aniversari" : "Trono de cumpleaños";
  const jumpImageAlt = isValenciano ? "Cama elàstica" : "Cama elástica";

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

          <div className="mb-10 bg-white rounded-[30px] border border-gray-100 p-6 shadow-sm">
            <h3 className="text-xl font-black text-gray-800 mb-4">{equipmentTitle}</h3>

            <ul className="space-y-3 text-gray-700 font-semibold">
              {equipmentItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}

              <li className="flex items-start gap-3 pt-3 mt-2 border-t border-gray-100">
                <span className="mt-0.5">🍽️</span>
                <span>
                  {kitchenPrefix} <strong>({kitchenNoCook})</strong>: {kitchenDetails}
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
            alt={throneImageAlt}
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
            <p className="text-2xl md:text-3xl font-black text-orange-500">
              {throneBadgeTitle}
            </p>
            <p className="text-gray-500 font-bold text-sm md:text-base">
              {throneBadgeSub}
            </p>
          </div>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            {throneTitlePre}
            <span className="text-orange-500">{throneTitleHighlight}</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {throneDescription}
          </p>

          <ul className="space-y-4 mb-10">
            {thronePoints.map((point, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {point}
              </li>
            ))}
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
            alt={jumpImageAlt}
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
              {moreFunBadgeTitle}
            </p>
            <p className="text-gray-500 font-bold text-sm md:text-base">
              {moreFunBadgeSub}
            </p>
          </div>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            {moreFunTitlePre}{" "}
            <span className="text-orange-500">{moreFunTitleHighlight}</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {moreFunDescription}
          </p>

          <ul className="space-y-4 mb-10">
            {moreFunPoints.map((point, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== BLOQUE 5: LIMPIEZA ===== */}
      <div className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-4">
            {cleaningTitlePre} <span className="text-orange-500">{cleaningTitleHighlight}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {cleaningDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-1 relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-60"></div>
            <img
              src="/gallery/imagen32.jpeg"
              alt={cleaningImageAlt}
              className="relative rounded-[40px] shadow-2xl object-cover h-full min-h-[320px]"
            />
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-[30px] p-8 shadow-lg border border-gray-100">
              <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-black mb-6">
                {cleaningOption1}
              </div>
              <h3 className="text-5xl font-black text-blue-600 mb-4">20€</h3>
              <p className="text-2xl font-black text-gray-800 mb-3">{cleaningBasicTitle}</p>
              <p className="text-gray-600 font-semibold leading-relaxed">
                {cleaningBasicDesc}
              </p>
            </div>

            <div className="bg-white rounded-[30px] p-8 shadow-lg border-2 border-orange-300">
              <div className="inline-flex items-center justify-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-black mb-6">
                {cleaningOption2}
              </div>
              <h3 className="text-5xl font-black text-orange-500 mb-4">60€</h3>
              <p className="text-2xl font-black text-gray-800 mb-3">
                {cleaningFullTitle}
              </p>
              <p className="text-gray-600 font-semibold leading-relaxed">
                {cleaningFullDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
