
import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white text-center">
      <h1 className="text-6xl md:text-8xl font-black mb-6">
        Jugai <span className="text-orange-500">Celebra</span>
      </h1>

      <p className="text-xl md:text-3xl mb-12 opacity-80">
        Espai per a esdeveniments · Algemesí
      </p>

      <div className="flex gap-6">
        {/* 👇 ESTO ES LO IMPORTANTE */}
        <a
          href="#reservar"
          className="bg-white text-black px-8 py-4 rounded-2xl text-xl font-black hover:scale-105 transition"
        >
          🗓️ RESERVAR 2026
        </a>

        <a
          href="https://wa.me/34669106393"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-8 py-4 rounded-2xl text-xl font-black hover:scale-105 transition"
        >
          💬 WHATSAPP
        </a>
      </div>
    </div>
  );
};

export default Hero;
