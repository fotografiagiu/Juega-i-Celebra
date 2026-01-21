
import React, { useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1515606353081-4460122d99c8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502086223501-7ea2ecd793f4?q=80&w=800&auto=format&fit=crop',
];

const Gallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-['Quicksand']">
      <div className="mb-16">
        <h2 className="text-5xl font-extrabold text-blue-600 mb-4 font-['Baloo_2']">Nuestra Selva de Bolas</h2>
        <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 font-medium">Instalaciones completas para un cumpleaños de diez con total comodidad.</p>
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
              alt={`Galería Juega y Celebra - Foto ${idx + 1}`} 
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

      <div className="mt-16 bg-gradient-to-br from-blue-50 via-white to-pink-50 p-10 rounded-[50px] border border-blue-100 shadow-sm">
        <p className="text-gray-700 font-bold text-xl leading-relaxed max-w-4xl mx-auto">
          Como puedes observar en las fotos, disponemos de <span className="text-orange-500">zona de juegos multiaventura</span>, 
          cocina equipada para tu merienda, <span className="text-blue-500">baños adaptados</span> y un amplio salón para las familias.
        </p>
      </div>

      {selectedImg && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-[fadeIn_0.2s_ease-out]"
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
            alt="Detalle de la instalación" 
            className="max-w-full max-h-[90vh] rounded-3xl shadow-2xl animate-[zoomIn_0.3s_ease-out] object-contain border-4 border-white/10"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
