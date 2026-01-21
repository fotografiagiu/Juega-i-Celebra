
import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
      <div className="lg:w-1/2 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <img 
          src="https://picsum.photos/id/447/800/600" 
          alt="Parque de bolas" 
          className="relative rounded-[40px] shadow-2xl z-10"
        />
        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border-l-4 border-blue-500">
          <p className="text-3xl font-black text-blue-600">+150 m²</p>
          <p className="text-gray-500 font-bold">de pura diversión</p>
        </div>
      </div>

      <div className="lg:w-1/2">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-6">Un entorno diseñado para la <span className="text-orange-500">felicidad</span></h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Nuestras instalaciones cumplen con todas las normativas europeas de seguridad. Los peques podrán explorar de forma segura mientras los padres y madres descansan en la zona común.
        </p>
        
        <ul className="space-y-4">
          {[
            'Aforo autorizado para un máximo de 48 personas.',
            'Zona específica para bebés (0-3 años).',
            'Limpieza diaria y desinfección con ozono.',
            'Zona de cafetería con vistas al parque para los familiares.',
            'Menús adaptados para alérgicos y celíacos.'
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
              <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <a href="#contacto" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all">
            Contactar ahora
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;
