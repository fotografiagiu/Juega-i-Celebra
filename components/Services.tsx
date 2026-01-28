import React from "react";
import { t, type Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

const Services: React.FC<Props> = ({ lang }) => {
  const tr = t(lang);

  const services = [
    {
      title: tr.services.cards.ball.title,
      desc: tr.services.cards.ball.desc,
      icon: "🤸‍♂️",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: tr.services.cards.party.title,
      desc: tr.services.cards.party.desc,
      icon: "🎉",
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: tr.services.cards.baby.title,
      desc: tr.services.cards.baby.desc,
      icon: "👶",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Fondo con desenfoque */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1515606353081-4460122d99c8?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(15px) saturate(1.2)",
          transform: "scale(1.1)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-6 drop-shadow-md font-['Baloo_2'] uppercase tracking-tight">
            {tr.services.title.pre}{" "}
            <span className="text-orange-500">{tr.services.title.highlight}</span>
          </h2>

          <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mb-8 shadow-sm" />

          <p className="text-xl text-gray-800 font-bold max-w-3xl mx-auto bg-white/60 backdrop-blur-xl p-8 rounded-[40px] shadow-sm border border-white/40">
            {tr.services.lead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group relative bg-white/80 backdrop-blur-md p-10 rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-b-8 border-transparent hover:border-blue-500 overflow-hidden border border-white/50"
            >
              <div
                className={`w-20 h-20 ${service.color} rounded-[25px] flex items-center justify-center text-5xl mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                {service.icon}
              </div>

              <h3 className="text-2xl font-black mb-4 text-gray-800 font-['Baloo_2']">
                {service.title}
              </h3>

              <p className="text-gray-700 leading-relaxed font-semibold">
                {service.desc}
              </p>

              <div className="mt-8">
                <a
                  href="#reservar"
                  className="text-blue-600 font-black text-lg flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  {tr.services.cta} <span className="text-2xl">&rarr;</span>
                </a>
              </div>

              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-50/50 rounded-full -z-10 group-hover:scale-150 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
