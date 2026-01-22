
import React from "react";

const Hero: React.FC = () => {
  const colors = {
    orange: "#FF5722",
    teal: "#00BFA5",
    pink: "#E91E63",
    purple: "#9C27B0",
    yellow: "#FFC107",
    green: "#4CAF50",
    red: "#F44336",
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-['Baloo_2']">
      {/* CONFETI */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(22)].map((_, i) => {
          const size = Math.random() * 18 + 10;
          const left = Math.random() * 100;
          const duration = Math.random() * 9 + 6;
          const delay = Math.random() * 6;
          const color =
            Object.values(colors)[
              Math.floor(Math.random() * Object.values(colors).length)
            ];
          const shapes = ["circle", "star", "squiggle"];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];

          return (
            <div
              key={i}
              className="absolute confetti-fall"
              style={{
                left: `${left}%`,
                top: `-12%`,
                animationDuration: `${duration}s`,
                animationDelay: `-${delay}s`,
                opacity: 0.75,
              }}
            >
              {shape === "circle" && (
                <div
                  className="rounded-full"
                  style={{
                    width: size / 2,
                    height: size / 2,
                    backgroundColor: color,
                  }}
                />
              )}

              {shape === "star" && (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
              )}

              {shape === "squiggle" && (
                <svg
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M2 12c4-7 10-7 14 0s10 7 14 0" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* GLOBOS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[9%] left-[5%] md:left-[14%] float opacity-95">
          <svg
            width="140"
            height="180"
            viewBox="0 0 100 130"
            className="drop-shadow-[0_0_30px_rgba(255,87,34,0.55)] scale-75 md:scale-110"
          >
            <ellipse cx="50" cy="45" rx="40" ry="45" fill={colors.orange} />
            <path
              d="M50 90 Q50 112 40 130"
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity="0.55"
            />
          </svg>
        </div>

        <div className="absolute top-[14%] right-[5%] md:right-[14%] float-delayed opacity-95">
          <svg
            width="120"
            height="160"
            viewBox="0 0 100 130"
            className="drop-shadow-[0_0_30px_rgba(0,191,165,0.55)] scale-75 md:scale-100"
          >
            <ellipse cx="50" cy="45" rx="35" ry="40" fill={colors.teal} />
            <path
              d="M50 85 Q50 108 60 125"
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity="0.55"
            />
          </svg>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 text-center px-4 w-full flex flex-col items-center justify-center">
        <div className="zoom-in flex flex-col items-center gap-0 md:gap-2">
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

          <div className="text-7xl sm:text-9xl md:text-[160px] lg:text-[200px] font-black tracking-tighter leading-[0.8] flex justify-center">
            <span style={{ color: colors.purple }}>C</span>
            <span style={{ color: colors.teal }}>e</span>
            <span style={{ color: colors.orange }}>l</span>
            <span style={{ color: colors.pink }}>e</span>
            <span style={{ color: colors.teal }}>b</span>
            <span style={{ color: colors.orange }}>r</span>
            <span style={{ color: colors.green }}>a</span>
          </div>

          <div className="mt-8 md:mt-12 space-y-2 md:space-y-4">
            <p className="text-xl sm:text-3xl md:text-5xl text-[#D7CCC8] font-bold tracking-tight opacity-90 drop-shadow-lg">
              Espai per a esdeveniments
            </p>
            <p className="text-4xl sm:text-6xl md:text-8xl text-white font-black tracking-wide uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.55)]">
              Algemesí
            </p>
          </div>
        </div>

        {/* BOTONES (VISIBLES) */}
        <div className="fade-in-up flex flex-col sm:flex-row gap-4 md:gap-8 justify-center mt-12 md:mt-24 w-full max-w-2xl px-4">
          <a
            href="#reservar"
            className="flex-1 bg-white text-black px-6 py-5 rounded-[25px] text-xl md:text-3xl font-black transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3 border-4 border-transparent hover:border-orange-500 cursor-pointer"
          >
            🗓️ RESERVAR 2026
          </a>

          <a
  href="https://wa.me/34669106393?text=Hola%20%F0%9F%91%8B%0AHe%20realizado%20una%20reserva%20en%20Juga%20i%20Celebra%20a%20trav%C3%A9s%20de%20la%20web.%0ASi%20necesit%C3%A1is%20algo%20m%C3%A1s%20por%20mi%20parte%2C%20quedo%20atento%2Fa.%0AGracias%20%F0%9F%98%8A"
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1 bg-[#25D366] text-white px-6 py-5 rounded-[25px] text-xl md:text-3xl font-black transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
>
  💬 WHATSAPP
</a>

          >
            💬 WHATSAPP
          </a>
        </div>
      </div>

      {/* TEXTURA */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* CSS EN LÍNEA: TODO LO QUE FALTABA */}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(115vh) rotate(720deg); opacity: 0; }
        }
        .confetti-fall { animation: confetti-fall linear infinite; }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }
        .float { animation: float 5.2s ease-in-out infinite; }
        .float-delayed { animation: float 6.1s ease-in-out infinite; animation-delay: 0.9s; }

        @keyframes zoomIn {
          0% { transform: scale(0.96); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .zoom-in { animation: zoomIn .8s ease-out both; }

        @keyframes fadeInUp {
          0% { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .fade-in-up { animation: fadeInUp .9s ease-out .35s both; }
      `}</style>
    </div>
  );
};

export default Hero;
