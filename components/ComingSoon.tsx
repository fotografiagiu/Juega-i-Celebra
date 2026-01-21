
import React from 'react';

const ComingSoon: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[50px] p-10 md:p-20 text-center text-white shadow-2xl">
        {/* Elementos flotantes de fondo */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="inline-block bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-6 animate-bounce">
            Novedades 2026
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 font-['Baloo_2'] tracking-tight">
            Próximamente
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-2xl md:text-3xl font-bold text-purple-50 leading-tight">
              ¡Estamos preparando nuevas actividades y sorpresas para ti!
            </p>
            <p className="text-4xl md:text-6xl font-black text-yellow-300 uppercase tracking-tighter animate-pulse">
              ESTATE ATENTO
            </p>
          </div>

          <div className="mt-12 flex justify-center gap-4">
             <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
             <div className="w-4 h-4 bg-white rounded-full animate-ping [animation-delay:0.2s]"></div>
             <div className="w-4 h-4 bg-white rounded-full animate-ping [animation-delay:0.4s]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
