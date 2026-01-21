import React, { useState } from "react";

// Tus rutas reales en /public/images (Vite sirve /images/...)
const images = [
  ...Array.from({ length: 19 }, (_, i) => `/images/Galeria${i + 1}.jpeg`),
  "/images/20.jpeg",
];

const Gallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-['Quicksand']">
      <div className="mb-16">
        <h2 className="text-5xl font-extrabold text-blue-600 mb-4 font-['Baloo_2']">
          La Nostra Selva de Boles
        </h2>
        <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 font-medium">
          Instal·lacions completes per a un aniversari 10 amb total comoditat.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-[30px] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100"
            onClick={() => setSelectedImg(img)}
          >
            <img
              src={img}
              alt={`Galeria Juga i Celebra - Foto ${idx + 1}`}
              className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
              <span className="bg-white text-blue-600 px-4 py-1.5 rounded-full font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                VEURE 🔍
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-blue-50 via-white to-pink-50 p-10 rounded-[50px] border border-blue-100 shadow-sm">
        <p className="text-gray-700 font-bold text-xl leading-relaxed max-w-4xl mx-auto">
          Com pots observar a les fotos, disposem de{" "}
          <span className="text-orange-500">zona de jocs multiaventura</span>,
          cuina equipada per al teu berenar,{" "}
          <span className="text-blue-500">banys adaptats</span> i un ampli saló
          per a les famílies.
        </p>
      </div>

      {/* Lightbox / Modal d'imatge */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-5xl hover:scale-110 transition-transform font-light"
            onClick={() => setSelectedImg(null)}
          >
            ×
          </button>
          <img
            src={selectedImg}
            alt="Detall de la instal·lació"
            className="max-w-full max-h-[90vh] rounded-3xl shadow-2xl object-contain border-4 border-white/10"
            onClick={(e) => e.stopPropagation()} // para que no se cierre al click en la imagen
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
