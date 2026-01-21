
import React, { useState } from 'react';
import { getPartyRecommendation } from '../services/gemini';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    age: 5,
    kids: 10,
    interests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await getPartyRecommendation(formData.age, formData.kids, formData.interests);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl transition-transform hover:scale-110"
      >
        {isOpen ? '✕' : '✨'}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeInUp_0.3s_ease-out] border border-blue-100">
          <div className="bg-blue-600 p-6 text-white">
            <h3 className="text-xl font-bold">Asistente de Fiestas</h3>
            <p className="text-blue-100 text-sm">¡Te ayudo a planificar el cumple perfecto!</p>
          </div>
          
          <div className="p-6 max-h-[450px] overflow-y-auto">
            {!response ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-gray-600 text-sm">Dime unos detalles y te daré una recomendación:</p>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase">Edad del cumpleañero/a</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                    className="w-full border-b-2 border-gray-100 py-2 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase">Número de niños/as</label>
                  <input 
                    type="number" 
                    value={formData.kids}
                    onChange={(e) => setFormData({...formData, kids: parseInt(e.target.value)})}
                    className="w-full border-b-2 border-gray-100 py-2 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase">¿Qué le gusta? (Superhéroes, Piratas...)</label>
                  <input 
                    type="text" 
                    value={formData.interests}
                    onChange={(e) => setFormData({...formData, interests: e.target.value})}
                    placeholder="Ej: Dinosaurios y fútbol"
                    className="w-full border-b-2 border-gray-100 py-2 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-gray-400"
                >
                  {loading ? 'Calculando magia...' : '¡Obtener Recomendación!'}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-2xl text-gray-700 leading-relaxed text-sm">
                  {response}
                </div>
                <button 
                  onClick={() => {setResponse(null); setFormData({age: 5, kids: 10, interests: ''})}}
                  className="w-full py-2 text-blue-600 font-bold hover:underline"
                >
                  Probar otra configuración
                </button>
                <a 
                  href="#contacto"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-orange-500 text-center text-white py-3 rounded-xl font-bold hover:bg-orange-600 shadow-md"
                >
                  ¡Quiero reservar esto!
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
