import React from "react";

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* ===== BLOQUE 1: LOCAL (DEJAR COMO ACTUAL) ===== */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* IMAGEN LOCAL */}
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <img
            src="/gallery/Galeria11.jpeg"
            alt="Local Juga i Celebra"
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
            <p className="text-gray-500 font-bold text-sm md:text-base">para tu evento</p>
          </div>
        </div>

        {/* TEXTO LOCAL */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            El local para tu <span className="text-orange-500">evento</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Un espacio en Algemesí pensado para celebraciones familiares, reuniones y eventos
            privados. Tú decides el plan, nosotros ponemos el sitio.
          </p>

          <ul className="space-y-4 mb-10">
            {[
              "Aforo autorizado para un máximo de 48 personas.",
              "Espacio amplio para cumpleaños, comuniones, jubilaciones y reuniones.",
              "Mesas y sillas para adultos y niños.",
              "Local cómodo y luminoso para organizar el evento a tu manera.",
              "Ubicación: Avinguda País Valencià 58 (Algemesí).",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* ✅ NUEVO: EQUIPAMIENTO Y COMODIDADES */}
          <div className="mb-10 bg-white rounded-[30px] border border-gray-100 p-6 shadow-sm">
            <h3 className="text-xl font-black text-gray-800 mb-4">Equipamiento y comodidades</h3>

            <ul className="space-y-3 text-gray-700 font-semibold">
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🪑</span>
                <span>40 sillas adultos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🧒</span>
                <span>16 sillas peques (ampliamos próximamente con 4+)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🪑</span>
                <span>6 mesas plegables</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🧸</span>
                <span>4 mesas peques (ampliamos próximamente con 1+)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">👶</span>
                <span>2 tronas</span>
              </li>

              <li className="flex items-start gap-3 pt-3 mt-2 border-t border-gray-100">
                <span className="mt-0.5">🍽️</span>
                <span>
                  Cocina de apoyo <strong>(no se puede cocinar)</strong>: nevera/congelador,
                  cafetera, microondas y botellero
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5">🚻</span>
                <span>Baño adaptado PMR con cambiador</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">🧥</span>
                <span>Percheros y zona de descanso</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">📺</span>
                <span>Smart TV con internet</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">📦</span>
                <span>Almacén</span>
              </li>
            </ul>
          </div>

          {/* BOTONES */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-black shadow-lg hover:bg-blue-700 transition-all"
            >
              Contactar ahora
            </a>

            <a
              href="https://wa.me/34669106393"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-500 text-white px-8 py-4 rounded-full font-black shadow-lg hover:bg-green-600 transition-all"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ===== BLOQUE 2: PARQUE DE BOLAS (RE-IMPLEMENTAR ABAJO) ===== */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mt-24">
        {/* IMAGEN PARQUE */}
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <img
            src="/gallery/Galeria21.jpeg"
            alt="Parque de bolas Juga i Celebra"
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
            <p className="text-2xl md:text-3xl font-black text-blue-600">Parque</p>
            <p className="text-gray-500 font-bold text-sm md:text-base">zona de juego</p>
          </div>
        </div>

        {/* TEXTO PARQUE */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            Parque de bolas y <span className="text-orange-500">diversión</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Zona de juego diseñada para que los peques se lo pasen en grande, mientras liberan
            energía de forma segura durante la celebración.
          </p>

          <ul className="space-y-4 mb-10">
            {[
              "Parque de bolas con circuito de juego, obstáculos y toboganes.",
              "Ideal para que los peques se diviertan y gasten energía durante la celebración.",
              "Acceso y uso del parque bajo supervisión de un adulto responsable.",
              "Normas básicas: calcetines obligatorios y sin calzado dentro del área de juego.",
              "Normas básicas: no se permite comida/bebida dentro del parque de bolas.",
            ].map((item, i) => (
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
              Ver galería
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
