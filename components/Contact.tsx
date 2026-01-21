
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Aniversari',
    message: ''
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const WEB_APP_ENDPOINT = "https://script.google.com/macros/s/AKfycbzX9qZPXu6HMmCziQsHYJelYMoR4_eXrJpb9KqG0td57qboG7kEzMw6sIkG_h8uQVk/exec";

    const payload = {
      id: `contact-${Date.now()}`,
      status: "CONTACTE",
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
      setFormData({ name: '', email: '', type: 'Aniversari', message: '' });
      
    } catch (error) {
      console.error("Error contacte:", error);
      alert("Error en l'enviament. Per favor, contacta per telèfon.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-blue-600 rounded-[50px] p-8 md:p-16 flex flex-col lg:flex-row gap-12 shadow-2xl text-white">
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Parlem?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Estem encantats de resoldre els teus dubtes o ajudar-te a planificar el millor esdeveniment per als teus peques.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">📍</div>
              <div>
                <p className="font-bold text-lg">La Nostra Adreça</p>
                <p className="text-blue-100">Carrer Major, 12, Algemesí, València</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">📞</div>
              <div>
                <p className="font-bold text-lg">Telèfon</p>
                <p className="text-blue-100">+34 669 106 393</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">⏰</div>
              <div>
                <p className="font-bold text-lg">Horari</p>
                <p className="text-blue-100">Dilluns a Diumenge: 10:00 - 21:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 bg-white rounded-3xl p-8 text-gray-800">
          {!submitted ? (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nom Complet</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="El teu nom..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Correu Electrònic / Telèfon</label>
                <input required type="text" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Dades de contacte..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tipus d'Esdeveniment</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Aniversari</option>
                  <option>Joc Lliure</option>
                  <option>Esdeveniment Privat</option>
                  <option>Altre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Missatge</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Com et podem ajudar?"></textarea>
              </div>
              <button 
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Enviant...' : 'Enviar Missatge'}
              </button>
            </form>
          ) : (
            <div className="text-center py-20 animate-[zoomIn_0.3s_ease-out]">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Missatge Rebut!</h3>
              <p className="text-gray-500 mb-8 font-medium">Et contestarem el més aviat possible.</p>
              <button onClick={() => setSubmitted(false)} className="text-blue-600 font-bold hover:underline">Enviar un altre missatge</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
