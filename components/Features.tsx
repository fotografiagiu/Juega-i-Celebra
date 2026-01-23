import React from "react";

const Features: React.FC = () => {
  const PHONE = "669106393";
  const ADDRESS = "Avinguda País Valencià 5 (Algemesí)";

  const localPoints = [
    "Aforo autorizado para un máximo de 48 personas.",
    "Espacio para celebraciones: aniversarios, comuniones, jubilaciones, asambleas y más.",
    `Reservas por WhatsApp: ${PHONE}.`,
    `Ubicación: ${ADDRESS}.`,
    "Local amplio y cómodo para que organices tu evento a tu manera.",
  ];

  const parkPoints = [
    "Parque de bolas con circuito de juego, obstáculos y toboganes.",
    "Ideal para que los peques se diviertan y gasten energía durante la celebración.",
    "Acceso y uso del parque bajo supervisión de un adulto responsable.",
    "Normas básicas: calcetines obligatorios y sin calzado dentro del área de juego.",
    "Normas básicas: no se permite comida/bebida dentro del parque de bolas.",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      {/* ========= BLOQUE 1: EL LOCAL ========= */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* IMAGEN */}
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <img
            src="/gallery/Galeria11.jpeg"
            alt="El local de Juga i Celebra"
            className="relative rounded-[40px] shadow-2xl z-10 object-cover"
          />

          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border-l-4 border-blue-500">
            <p className="text-3xl font-black text-blue-600">48 pax</p>
            <p className="text-gray-500 font-bold">aforo máximo</p>
          </div>
        </div>

        {/* TEXTO */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            El <span className="text-orange-500">local</span> para tu evento
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Un espacio en Algemesí pensado para celebraciones familiares y reuniones. Tú decides el
            plan y nosotros ponemos el sitio.
          </p>

          <ul className="space-y-4">
            {localPoints.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex gap-4 flex-wrap">
            <a
              href="#contacto"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all"
            >
              Contactar ahora
            </a>
            <a
              href={`https://wa.me/34${PHONE}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-50 transition-all border border-blue-200"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ========= BLOQUE 2: PARQUE DE BOLAS ========= */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
        {/* IMAGEN */}
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <img
            src="/gallery/Galeria21.jpeg"
            alt="Parque de bolas Juga i Celebra"
            className="relative rounded-[40px] shadow-2xl z-10 object-cover"
          />

          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border-l-4 border-blue-500">
            <p className="text-3xl font-black text-blue-600">Parque</p>
            <p className="text-gray-500 font-bold">zona de juego</p>
          </div>
        </div>

        {/* TEXTO */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6">
            Parque de bolas y <span className="text-orange-500">diversión</span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Una zona de juego para que los peques lo pasen en grande durante la celebración, con
            normas claras para mantener seguridad y orden.
          </p>

          <ul className="space-y-4">
            {parkPoints.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a
              href="#galeria"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all"
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
