
import React, { useState } from 'react';

// Simulació de les imatges proporcionades per l'usuari (representant les 20 fotos reals de les instal·lacions)
const images = [
  // Piscina de boles i jocs (Imatges 1-10)
  'https://images.unsplash.com/photo-1515606353081-4460122d99c8?q=80&w=800&auto=format&fit=crop', // Obstacles taronja
  'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?q=80&w=800&auto=format&fit=crop', // Obstacles blaus i taronja
  'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop', // Obstacles rosa i taronja
  'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=800&auto=format&fit=crop', // Sac de boxa groc
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop', // Diana en la xarxa
  'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?q=80&w=800&auto=format&fit=crop', // Tobogan blanc
  'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop', // Penjolls de colors
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', // Cilindre groc encoixinat
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop', // Gronxador i sac verd
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', // Entrada de tires de colors
  
  // Sales i mobiliari (Imatges 11-20)
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop', // Sala gran amb taules i cadires
  'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=800&auto=format&fit=crop', // Sofà fosc i finestra
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop', // Penjadors de roba negres
  'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=800&auto=format&fit=crop', // Moble canviador de nadons
  'https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=800&auto=format&fit=crop', // Lavabo adaptat
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop', // Aigüamans i espill
  'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=800&auto=format&fit=crop', // Racó de joguines i patinet
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop', // Barra i nevera Estrella Damm
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop', // Cuina i pica
  'https://images.unsplash.com/photo-1502086223501-7ea2ecd793f4?q=80&w=800&auto=format&fit=crop', // Microones i nevera blanca
];

const Gallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-['Quicksand']">
      <div className="mb-16">
        <h2 className="text-5xl font-extrabold text-blue-600 mb-4 font-['Baloo_2']">La Nostra Selva de Boles</h2>
        <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 font-medium">Instal·lacions completes per a un aniversari 10 amb total comoditat.</p>
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
          Com pots observar a les fotos, disposem de <span className="text-orange-500">zona de jocs multiaventura</span>, 
          cuina equipada per al teu berenar, <span className="text-blue-500">banys adaptats</span> i un ampli saló per a les famílies.
        </p>
      </div>

      {/* Lightbox / Modal d'imatge */}
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
            alt="Detall de la instal·lació" 
            className="max-w-full max-h-[90vh] rounded-3xl shadow-2xl animate-[zoomIn_0.3s_ease-out] object-contain border-4 border-white/10"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
