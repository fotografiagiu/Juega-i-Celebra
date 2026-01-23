import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

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
            <p className="text-gray-500 font-bold text-sm md:text-base">
              para tu evento
            </p>
          </div>
        </div>

        {/* TEXTO */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            El local para tu <span className="text-orange-500">evento</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Un espacio en Algemesí pensado para celebraciones familiares, reuniones
            y eventos privados. Tú decides el plan, nosotros ponemos el sitio.
          </p>

          <ul className="space-y-4 mb-10">
            {[
              'Aforo autorizado para un máximo de 48 personas.',
              'Espacio amplio para cumpleaños, comuniones, jubilaciones y reuniones.',
              'Mesas y sillas para adultos y niños.',
              'Local cómodo y luminoso para organizar el evento a tu manera.',
              'Ubicación: Avinguda País Valencià 58 (Algemesí).'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

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

    </div>
  );
};

export default Features;
