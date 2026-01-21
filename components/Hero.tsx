import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black font-['Baloo_2']">
      {/* Elementos Decorativos: Globos Gigantes con Movimiento */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Globo Naranja Izquierda - Gigante */}
        <div className="absolute top-[10%] left-[5%] text-[180px] animate-float opacity-90 drop-shadow-[0_0_30px_rgba(255,87,34,0.4)]">
          🎈
        </div>

        {/* Globo Cian Derecha - Gigante */}
        <div className="absolute top-[15%] right-[5%] text-[160px] animate-float-delayed opacity-90 drop-shadow-[0_0_30px_rgba(0,188,212,0.4)]">
          🎈
        </div>

        {/* Globo Amarillo Abajo - Gigante */}
        <div className="absolute bottom-[10%] left-[10%] text-[140px] animate-float-slow opacity-80 drop-shadow-[0_0_30px_rgba(255,235,59,0.4)]">
          🎈
        </div>

        {/* Globo Rosa Abajo Derecha */}
        <div className="absolute bottom-[20%] right-[12%] text-[120px] animate-float opacity-85 drop-shadow-[0_0_30px_rgba(233,30,99,0.4)]">
          🎈
        </div>

        {/* Confeti y Formas */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex gap-12 opacity-80">
          <span
            className="text-orange-500 text-6xl animate-spin"
            style={{ animationDuration: "5s" }}
          >
            ✨
          </span>
          <span className="text-yellow-400 text-5xl rotate-12">⭐</span>
          <span className="text-pink-500 text-6xl -rotate-12 animate-pulse">
            〰️
          </span>
        </div>

        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-40 animate-pulse"
            style={{
              width: `${Math.random() * 15 + 8}px`,
              height: `${Math.random() * 15 + 8}px`,
              backgroundColor: ["#ff5722", "#00bcd4", "#4caf50", "#e91e63", "#facc15"][
                Math.floor(Math.random() * 5)
              ],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl">
        {/* LOGO CENTRAL (IMAGEN) */}
        <div className="mb-6 flex flex-col items-center animate-[zoomIn_1s_ease-out]">
          <div className="relative">
            <img
              src="/images/logo-jugaicelebra.jpg"
              alt="Juga i Celebra"
              className="mx-auto w-[280px] md:w-[520px] rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.15)]"
            />

            {/* Globos flotando alrededor del logo */}
            <div className="pointer-events-none absolute -top-6 -left-8 text-5xl animate-float opacity-90">
              🎈
            </div>
            <div className="pointer-events-none absolute -top-10 -right-6 text-4xl animate-float-delayed opacity-85">
              🎈
            </div>
            <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 text-4xl animate-float-slow opacity-80">
              🎈
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <p className="text-3xl md:text-5xl text-[#d7ccc8] font-medium tracking-wide">
              Espai per a esdeveniments
            </p>
            <p className="text-5xl md:text-8xl font-black tracking-widest uppercase bg-gradient-to-r from-orange-400 via-yellow-200 to-pink-500 bg-clip-text text-transparent">
              Algemesí
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center mt-16 animate-[fadeInUp_1.2s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <a
            href="#reservar"
            className="bg-white text-black px-12 py-5 rounded-[25px] text-2xl font-black transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-95 flex items-center justify-center gap-3 border-4 border-transparent hover:border-orange-500"
          >
            🗓️ CALENDARI 2026
          </a>

          <a
            href="https://wa.me/34699106393"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-12 py-5 rounded-[25px] text-2xl font-black transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 flex items-center justify-center gap-3"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.002 0-3.971-.505-5.717-1.46l-6.276 1.678zm6.33-3.692c1.472.873 3.123 1.335 4.805 1.335 5.23 0 9.487-4.258 9.487-9.488 0-2.536-.988-4.92-2.783-6.715-1.794-1.795-4.18-2.783-6.715-2.783-5.232 0-9.489 4.258-9.489 9.488 0 1.777.494 3.511 1.428 5.013l-.934 3.41 3.493-.933zm9.648-5.79c-.27-.135-1.59-.785-1.838-.875-.246-.09-.427-.135-.607.135-.18.27-.697.875-.855 1.056-.158.18-.316.203-.585.068-.27-.135-1.14-.42-2.172-1.34-.802-.716-1.345-1.6-1.502-1.87-.157-.27-.017-.417.118-.552.122-.122.27-.315.405-.473.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.473-.067-.135-.607-1.462-.832-2.002-.22-.529-.441-.458-.607-.466-.157-.008-.337-.008-.517-.008s-.473.067-.72.337c-.247.27-.945.922-.945 2.25s.967 2.61 1.102 2.812c.135.202 1.902 2.903 4.608 4.069.644.277 1.146.442 1.538.567.647.206 1.235.177 1.7.108.518-.077 1.59-.652 1.815-1.282.225-.63.225-1.17.157-1.282-.067-.113-.247-.18-.517-.315z" />
            </svg>
            WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
