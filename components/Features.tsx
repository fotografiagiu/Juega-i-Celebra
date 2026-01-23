import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">

      {/* ===================== BLOQUE LOCAL ===================== */}
      <div className="flex flex-col lg:flex-row items-center gap-12">

        {/* IMAGEN LOCAL */}
        <div className="lg:w-1/2 relative">
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
            <p className="text-gray-500 font-bold text-sm md:text-base">
              para tu evento
            </p>
          </div>
        </div>

        {/* TEXTO LOCAL */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            Un local pensado para <span className="text-orange-500">celebrar</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Un espacio amplio, diáfano y cómodo para que organices tu celebración
            a tu manera, con total libertad y sin complicaciones.
          </p>

          <ul className="space-y-4">
            {[
              'Aforo autorizado para un máximo de 48 personas.',
              'Zona de mesas y sillas para comidas, meriendas o reuniones.',
              'Televisión para vídeos, música o presentaciones.',
              'Espacio cómodo para adultos y niños.',
              'Ideal para cumpleaños, reuniones familiares y eventos privados.'
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

      {/* ===================== BLOQUE PARQUE DE BOLAS ===================== */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12">

        {/* IMAGEN PARQUE */}
        <div className="lg:w-1/2 relative">
          <img
            src="/gallery/Galeria21.jpeg"
            alt="Parque de bolas Juga i Celebra"
            className="relative rounded-[40px] shadow-2xl z-10 object-cover"
          />

          {/* BADGE */}
          <div
            className="
              absolute z-20 bg-white shadow-xl border-l-4 border-blue-500
              rounded-2xl
              bottom-4 left-4 p-4
              md:-bottom-6 md:-left-6 md:p-6
            "
          >
        

        {/* TEXTO PARQUE */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            Parque de bolas y <span className="text-orange-500">diversión</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Zona de juego diseñada para que los peques se lo pasen en grande,
            mientras liberan energía de forma segura durante la celebración.
          </p>

          <ul className="space-y-4">
            {[
              'Parque de bolas con diferentes zonas de juego.',
              'Toboganes y obstáculos para todas las edades.',
              'Espacio cerrado y seguro.',
              'Perfecto para complementar cualquier celebración.',
              'Diversión asegurada durante todo el evento.'
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
    </div>
  );
};

export default Features;
