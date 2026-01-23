import React from 'react';

const tiers = [
  {
    name: 'Entre Semana',
    price: '80€',
    unit: '/día',
    features: [
      'De lunes a jueves (10:00-21:30)',
      'Acceso exclusivo a todo el espacio',
      'Cocina equipada',
      'Fianza de 100€ (Efectivo)',
      'Servicio limpieza (+60€)'
    ],
    color: 'border-blue-200'
  },
  {
    name: 'Tarde / Viernes',
    price: '130€',
    unit: '/día',
    features: [
      'Viernes / Víspera festivo (10:00-21:30)',
      'Ideal para celebraciones y reuniones',
      'Acceso exclusivo a todo el espacio',
      'Fianza de 100€ (Efectivo)',
      'Servicio limpieza (+60€)'
    ],
    color: 'border-orange-400 scale-105 shadow-2xl relative',
    recommended: true
  },
  {
    name: 'Fin de Semana (Tarde)',
    price: '150€',
    unit: '/día',
    features: [
      'Sábado/Domingo (15:00-21:30)',
      'Perfecto para tardes de celebración',
      'Acceso exclusivo a todo el espacio',
      'Fianza de 100€ (Efectivo)',
      'Servicio limpieza (+60€)'
    ],
    color: 'border-purple-200'
  },
  {
    name: 'Fin de Semana (Día completo)',
    price: '200€',
    unit: '/día',
    features: [
      'Sábado/Domingo (10:00-21:30)',
      'Día completo para tu evento',
      'Acceso exclusivo a todo el espacio',
      'Fianza de 100€ (Efectivo)',
      'Servicio limpieza (+60€)'
    ],
    color: 'border-purple-200'
  }
];

const Pricing: React.FC = () => {
  const scrollToReservar = () => {
    const element = document.getElementById('reservar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-['Quicksand']">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-blue-600 mb-4 font-['Baloo_2']">
          Tarifas de Alquiler 2026
        </h2>
        <div className="w-24 h-2 bg-yellow-400 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 font-medium">
          Alquila nuestro espacio en exclusiva para tu celebración.
        </p>
      </div>

      {/* ✅ Cambiado a 4 columnas en desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={`bg-white rounded-[40px] p-8 border-2 ${tier.color} transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
          >
            {tier.recommended && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-1 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg z-20">
                MÁS RESERVADO
              </span>
            )}

            <div className="relative z-10 h-full flex flex-col">
              <div>
                <h3 className="text-2xl font-black mb-2 text-gray-800 font-['Baloo_2']">
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <span className="text-5xl font-black text-blue-600">{tier.price}</span>
                  <span className="text-gray-400 font-bold ml-1">{tier.unit}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 font-semibold text-sm">
                      <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">
                        ✔
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={scrollToReservar}
                className={`mt-auto block w-full text-center py-4 rounded-2xl font-black text-lg transition-all border-none cursor-pointer ${
                  tier.recommended
                    ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md transform hover:-translate-y-1'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                Reserva ahora 🗓️
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 p-8 rounded-[40px] border border-gray-100 max-w-4xl mx-auto">
        <h4 className="text-xl font-black text-gray-800 mb-4 font-['Baloo_2'] uppercase tracking-wide">
          Condiciones de Reserva
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-medium text-gray-500">
          <div className="space-y-3">
            <p>
              <span className="text-blue-600 font-bold">• Fianza:</span> 100€ que se abonará en efectivo a la entrega de llaves.
            </p>
            <p>
              <span className="text-blue-600 font-bold">• Servicio Limpieza:</span> 60€ opcional si no quieres encargarte tú.
            </p>
          </div>
          <div className="space-y-3">
            <p>
              <span className="text-blue-600 font-bold">• Confirmación:</span> Pago del 50% mediante transferencia bancaria.
            </p>
            <p>
              <span className="text-blue-600 font-bold">• Cancelaciones:</span> Consultar condiciones para devoluciones de reserva.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
