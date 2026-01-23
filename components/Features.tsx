import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">

      {/* ===== BLOQUE 1 · EL LOCAL ===== */}
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

          {/* BADGE SOLO AQUÍ */}
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
              para tu evento
            </p>
          </div>
        </div>

        {/* TEXTO LOCAL */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            Un espacio pensado para tu <span className="text-orange-500">evento</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Un local amplio, cómodo y versátil donde puedes organizar celebraciones familiares,
            reuniones o eventos privados con total libertad.
          </p>

          <ul className="space-y-4">
            {[
              'Aforo autorizado para un máximo de 48 personas.',
              'Mesas y sillas disponibles para adultos y niños.',
              'Televisión y zona común para reuniones o celebraciones.',
              'Espacio diáfano y luminoso.',
              'Ideal para cumpleaños, reuniones y eventos familiares.'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== BLOQUE 2 · PARQUE DE BOLAS ===== */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* TEXTO PARQUE */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            Parque de bolas y <span className="text-orange-500">diversión</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Un espacio de juego diseñado para que los peques disfruten al máximo
            mientras queman energía en un entorno seguro.
          </p>

          <ul className="space-y-4">
            {[
              'Parque de bolas con toboganes y obstáculos.',
              'Estructura acolchada y cerrada para mayor seguridad.',
              'Zona pensada para el juego libre y activo.',
              'Ideal para cumpleaños infantiles.',
              'Diversión garantizada durante toda la celebración.'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* IMAGEN PARQUE (SIN BADGE) */}
        <div className="lg:w-1/2 relative">
          <img
            src="/gallery/Galeria21.jpeg"
            alt="Parque de bolas Juga i Celebra"
            className="relative rounded-[40px] shadow-2xl z-10 object-cover"
          />
        </div>
      </div>

    </div>
  );
};

export default Features;
