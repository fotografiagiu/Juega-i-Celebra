
import React from 'react';

const Hero: React.FC = () => {
  const colors = {
    orange: '#FF5722',
    teal: '#00BFA5',
    pink: '#E91E63',
    purple: '#9C27B0',
    yellow: '#FFC107',
    green: '#4CAF50',
    red: '#F44336'
  };

  const scrollToReservas = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('reservas');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-['Baloo_2']">

      {/* CONFETI */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 20 + 10;
          const left = Math.random() * 100;
          const duration = Math.random() * 10 + 5;
          const delay = Math.random() * 5;
          const color = Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)];
          const shapes = ['circle', 'star', 'squiggle'];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];

          return (
            <div
              key={i}
              className="absolute animate-confetti-fall"
              style={{
                left: `${left}%`,
                top: `-10%`,
                animationDuration: `${duration}s`,
                animationDelay: `-${delay}s`,
                opacity: 0.6
              }}
            >
              {shape === 'circle' && (
                <div
                  className="rounded-full"
                  style={{ width: size / 2, height: size / 2, backgroundColor: color }}
                />
              )}
              {shape === 'star' && (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
              )}
              {shape === 'squiggle' && (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
                  <path d="M3 12c3-6 9-6 12 0s9 6 12 0" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 text-center px-4 w-full flex flex-col items-center justify-center">

        <div className="animate-[zoomIn_0.8s_ease-out]">
          <div className="flex items-end justify-center">
            <div className="text-7xl sm:text-9xl md:text-[160px] lg:text-[200px] font-black tracking-tighter flex items-end">
              <span style={{ color: colors.orange }}>J</span>
              <span style={{ color: colors.teal }}>u</span>
              <span style={{ color: colors.yellow }}>g</span>
              <span style={{ color: colors.pink }}>a</span>
            </div>
            <span
              className="text-4xl sm:text-6xl md:text-[100px] lg:text-[120px] font-black ml-2 mb-2 md:mb-6"
              style={{ color: colors.red }}
            >
              i
            </span>
          </div>

          <div className="text-7xl sm:text-9xl md:text-[160px] lg:text-[200px] font-black leading-[0.8] flex justify-center">
            <span style={{ color: colors.purple }}>C</span>
            <span style={{ color: colors.teal }}>e</span>
            <span style={{ color: colors.orange }}>l</span>
            <span style={{ color: colors.pink }}>e</span>
            <span style={{ color: colors.teal }}>b</span>
            <span style={{ color: colors.orange }}>r</span>
            <span style={{ color: colors.green }}>a</span>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-xl md:text-5xl text-[#D7CCC8] font-bold">
              Espai per a esdeveniments
            </p>
            <p className="text-4xl md:text-8xl text-white font-black uppercase">
              Algemesí
            </p>
          </div>
        </div>

        {/* BOTONES */}
        <div className="flex flex-col sm:flex-row gap-6 mt-16 w-full max-w-2xl px-4 animate-[fadeInUp_1s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
          <button
            onClick={scrollToReservas}
            className="flex-1 bg-white text-black px-6 py-5 rounded-[25px] text-xl md:text-3xl font-black shadow-2xl hover:scale-105 transition-all border-4 border-transparent hover:border-orange-500"
          >
            🗓️ RESERVAR 2026
          </button>

          <a
            href="https://wa.me/34669106393"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] text-white px-6 py-5 rounded-[25px] text-xl md:text-3xl font-black shadow-2xl hover:scale-105 transition-all"
          >
            💬 WHATSAPP
          </a>
        </div>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti-fall {
          animation: confetti-fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
