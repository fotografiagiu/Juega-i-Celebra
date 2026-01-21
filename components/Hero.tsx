
{/* Logotipo Central (imagen) */}
<div className="mb-6 flex flex-col items-center animate-[zoomIn_1s_ease-out]">
  <div className="relative">
    <img
      src="/images/logo-jugaicelebra.jpg"
      alt="Juga i Celebra"
      className="w-[280px] md:w-[520px] rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.15)]"
    />

    {/* Globos flotando alrededor del logo */}
    <div className="pointer-events-none absolute -top-6 -left-8 text-5xl animate-float opacity-90">🎈</div>
    <div className="pointer-events-none absolute -top-10 -right-6 text-4xl animate-float-delayed opacity-85">🎈</div>
    <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 text-4xl animate-float-slow opacity-80">🎈</div>
  </div>

  <div className="mt-10 space-y-3">
    <p className="text-3xl md:text-5xl text-[#d7ccc8] font-medium tracking-wide">
      Espai per a esdeveniments
    </p>
    <p className="text-5xl md:text-8xl text-white font-black tracking-widest uppercase bg-gradient-to-r from-orange-400 via-yellow-200 to-pink-500 bg-clip-text text-transparent">
      Algemesí
    </p>
  </div>
</div>
