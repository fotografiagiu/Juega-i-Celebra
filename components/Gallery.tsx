
import React, { useState } from 'react';

const images = [
  '/gallery/Galeria1.jpeg',
  '/gallery/Galeria2.jpeg',
  '/gallery/Galeria3.jpeg',
  '/gallery/Galeria4.jpeg',
  '/gallery/Galeria5.jpeg',
  '/gallery/Galeria6.jpeg',
  '/gallery/Galeria7.jpeg',
  '/gallery/Galeria8.jpeg',
  '/gallery/Galeria9.jpeg',
  '/gallery/Galeria10.jpeg',
  '/gallery/Galeria11.jpeg',
  '/gallery/Galeria12.jpeg',
  '/gallery/Galeria13.jpeg',
  '/gallery/Galeria14.jpeg',
  '/gallery/Galeria15.jpeg',
  '/gallery/Galeria16.jpeg',
  '/gallery/Galeria17.jpeg',
  '/gallery/Galeria18.jpeg',
  '/gallery/Galeria19.jpeg',
  '/gallery/Galeria20.jpeg',
];

const Gallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-['Quicksand']">

      <div className="mb-16">
        <h2 className="text-5xl font-extrabold text-blue-600 mb-4 font-['Baloo_2']">
          Nuestra Selva de Bolas
        </h2>
        <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 font-medium">
          Instalaciones completas para un cumpleaños de diez con total comodidad.
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
              alt={`Galería Juga i Celebra - Foto ${idx + 1}`}
              className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
              <span className="bg-white text-blue-600 px-4 py-1.5 rounded-full font-bold text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                VER 🔍
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedImg && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-5xl"
            onClick={() => setSelectedImg(null)}
          >
            ×
          </button>

          <img
            src={selectedImg}
            alt="Detalle de la instalación"
            className="max-w-full max-h-[90vh] rounded-3xl shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;

