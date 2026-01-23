
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Cumpleaños',
    message: ''
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const WEB_APP_ENDPOINT = "https://script.google.com/macros/s/AKfycbzX9qZPXu6HMmCziQsHYJelYMoR4_eXrJpb9KqG0td57qboG7kEzMw6sIkG_h8uQVk/exec";

    const payload = {
      id: `contact-${Date.now()}`,
      status: "CONTACTO",
      name: formData.name,
      email: formData.email,
      type: formData.type,
      message: formData.message,
      created_at: new Date().toISOString()
    };

    try {
      await fetch(WEB_APP_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload)
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', type: 'Cumpleaños', message: '' });
    } catch (error) {
      console.error("Error contacto:", error);
      alert("Error en el envío. Por favor, contacta por teléfono.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-blue-600 rounded-[50px] p-8 md:p-16 flex flex-col lg:flex-row gap-12 shadow-2xl text-white">
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">¿Hablamos?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Estamos encantados de resolver tus dudas o ayudarte a planificar el mejor evento para tus peques.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">📍</div>
              <div>
                <p className="font-bold text-lg">Nuestra Dirección</p>
                <p className="text-blue-100">Avinguda País Valencià 58 (Algemesí), Valencia</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">📞</div>
              <div>
                <p className="font-bold text-lg">Teléfono</p>
                <p className="text-blue-100">+34 669 106 393</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">⏰</div>
              <div>
                <p className="font-bold text-lg">Horario</p>
                <p className="text-blue-100">Lunes a Domingo: 10:00 - 21:30</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 bg-white rounded-3xl p-8 text-gray-800">
          {!submitted ? (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Tu nombre..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico / Teléfono</label>
                <input required type="text" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Datos de contacto..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tipo de Evento</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Cumpleaños</option>
                  <option>Juego Libre</option>
                  <option>Evento Privado</option>
                  <option>Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mensaje</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="¿En qué podemos ayudarte?"></textarea>
              </div>
              <button 
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          ) : (
            <div className="text-center py-20 animate-[zoomIn_0.3s_ease-out]">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">¡Mensaje Recibido!</h3>
              <p className="text-gray-500 mb-8 font-medium">Te contestaremos lo antes posible.</p>
              <button onClick={() => setSubmitted(false)} className="text-blue-600 font-bold hover:underline">Enviar otro mensaje</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
