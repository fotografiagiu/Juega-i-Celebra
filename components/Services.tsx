
import React from 'react';

const services = [
  {
    title: 'Aniversaris Màgics',
    desc: 'Festes personalitzades amb berenar, pastís, jocs dirigits i molta diversió per a totes les edats.',
    icon: '🎂',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    title: 'Esdeveniments Privats',
    desc: 'Lloguem el nostre espai per a celebracions familiars, batejos o comunions amb total exclusivitat.',
    icon: '🌟',
    color: 'bg-purple-100 text-purple-600'
  }
];

const Services: React.FC = () => {
  return (
    <div className="relative py-24 overflow-hidden">
      {/* Fondo de "Agua de Bolas" con 30% de opacidad */}
      <div 
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1515606353081-4460122d99c8?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'saturate(1.5)'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-6 drop-shadow-lg font-['Baloo_2']">Què t'oferim?</h2>
          <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mb-8 shadow-md"></div>
          <p className="text-xl text-gray-800 font-bold max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-[30px] shadow-sm border border-white/50">
            A Juga i Celebra ho tenim tot preparat perquè els xiquets i xiquetes s'ho passen d'allò més bé en la millor "piscina" de boles d'Algemesí. 
            Més que un parc, una experiència inoblidable!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white/95 backdrop-blur-md p-10 rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-b-8 border-transparent hover:border-blue-500 overflow-hidden border border-gray-100"
            >
              <div className={`w-20 h-20 ${service.color} rounded-[25px] flex items-center justify-center text-5xl mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-800 font-['Baloo_2']">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {service.desc}
              </p>
              <div className="mt-8">
                <button className="text-blue-600 font-black text-lg flex items-center gap-2 group-hover:gap-4 transition-all">
                  Saber-ne més <span className="text-2xl">&rarr;</span>
                </button>
              </div>
              
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-50/50 rounded-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          ))}

          {/* Tarjeta Proximament */}
          <div className="group relative bg-gray-50/80 backdrop-blur-md p-10 rounded-[40px] shadow-inner border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl mb-6 animate-pulse">
              🚀
            </div>
            <h3 className="text-3xl font-black text-gray-400 font-['Baloo_2'] uppercase tracking-widest">
              Pròximament
            </h3>
            <p className="text-gray-400 mt-4 font-bold">
              Estem preparant noves activitats i sorpreses per a tu!
            </p>
            <div className="mt-8">
               <span className="inline-block bg-white text-gray-400 px-6 py-2 rounded-full font-black text-sm shadow-sm border border-gray-100">
                 ESTIGA'T ATENT
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
