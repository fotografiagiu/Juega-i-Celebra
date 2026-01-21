
import React from 'react';

const tiers = [
  {
    name: 'Lloguer Entre Setmana',
    price: '80€',
    unit: '/dia',
    features: ['De dilluns a dijous', 'Espai exclusiu', 'Accés a totes les zones', 'Cuina equipada', 'Fiança de 100€'],
    color: 'border-blue-200'
  },
  {
    name: 'Cap de Setmana Tarda',
    price: '150€',
    unit: '/dia',
    features: ['Divendres o Dissabte/Diumenge (15-22h)', 'Ideal per aniversaris', 'Espai privat total', 'Servei neteja opcional (60€)', 'Fiança de 100€'],
    color: 'border-orange-400 scale-105 shadow-2xl relative',
    recommended: true
  },
  {
    name: 'Cap de Setmana Complet',
    price: '200€',
    unit: '/dia',
    features: ['Dissabte o Diumenge (10-22h)', 'Dia sencer de celebració', 'Tots els extres inclosos', 'Gran capacitat', 'Fiança de 100€'],
    color: 'border-purple-200'
  }
];

const Pricing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-['Quicksand']">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-blue-600 mb-4 font-['Baloo_2']">Tarifes de Lloguer</h2>
        <div className="w-24 h-2 bg-yellow-400 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 font-medium">Lloga el nostre espai en exclusiva per al teu esdeveniment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {tiers.map((tier, i) => (
          <div key={i} className={`bg-white rounded-[40px] p-8 border-2 ${tier.color} transition-all duration-300 hover:shadow-xl`}>
            {tier.recommended && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
                El Més Reservat
              </span>
            )}
            <h3 className="text-2xl font-black mb-2 text-gray-800 font-['Baloo_2']">{tier.name}</h3>
            <div className="mb-6">
              <span className="text-5xl font-black text-blue-600">{tier.price}</span>
              <span className="text-gray-400 font-bold ml-1">{tier.unit}</span>
            </div>
            <ul className="space-y-4 mb-8">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600 font-semibold">
                  <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#reservar" className={`block w-full text-center py-4 rounded-2xl font-black text-lg transition-all ${tier.recommended ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
              Veure Disponibilitat
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center text-gray-400 text-sm font-bold uppercase tracking-widest">
        * Fiança de 100€ obligatòria per a tots els lloguers (retornable)
      </div>
    </div>
  );
};

export default Pricing;
