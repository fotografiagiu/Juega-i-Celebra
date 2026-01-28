import React, { useState } from "react";
import { t, type Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

type EventTypeKey = "birthday" | "freeplay" | "private" | "other";

const Contact: React.FC<Props> = ({ lang }) => {
  const tr = t(lang);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "birthday" as EventTypeKey,
    message: "",
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const WEB_APP_ENDPOINT =
      "https://script.google.com/macros/s/AKfycbzX9qZPXu6HMmCziQsHYJelYMoR4_eXrJpb9KqG0td57qboG7kEzMw6sIkG_h8uQVk/exec";

    // Mandamos el label traducido + la key (por si quieres filtrar luego)
    const typeLabel = tr.contact.eventTypes[formData.type];

    const payload = {
      id: `contact-${Date.now()}`,
      status: "CONTACTO",
      name: formData.name,
      email: formData.email,
      type_key: formData.type,
      type: typeLabel,
      message: formData.message,
      created_at: new Date().toISOString(),
      lang,
    };

    try {
      await fetch(WEB_APP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", type: "birthday", message: "" });
    } catch (error) {
      console.error("Error contacto:", error);
      alert(tr.contact.alertError);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-blue-600 rounded-[50px] p-8 md:p-16 flex flex-col lg:flex-row gap-12 shadow-2xl text-white">
        {/* LEFT */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            {tr.contact.title}
          </h2>

          <p className="text-blue-100 text-lg mb-8">{tr.contact.subtitle}</p>

          <div className="space-y-6">
            {/* Dirección */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                📍
              </div>
              <div>
                <p className="font-bold text-lg">{tr.contact.info.addressTitle}</p>
                <p className="text-blue-100">{tr.contact.info.addressValue}</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                📞
              </div>
              <div>
                <p className="font-bold text-lg">{tr.contact.info.phoneTitle}</p>
                <p className="text-blue-100">{tr.contact.info.phoneValue}</p>
              </div>
            </div>

            {/* Horario */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                ⏰
              </div>
              <div>
                <p className="font-bold text-lg">{tr.contact.info.hoursTitle}</p>
                <p className="text-blue-100">{tr.contact.info.hoursValue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-1/2 bg-white rounded-3xl p-8 text-gray-800">
          {!submitted ? (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  {tr.contact.form.fullNameLabel}
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={tr.contact.form.fullNamePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  {tr.contact.form.contactLabel}
                </label>
                <input
                  required
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={tr.contact.form.contactPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  {tr.contact.form.eventTypeLabel}
                </label>

                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as EventTypeKey })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="birthday">{tr.contact.eventTypes.birthday}</option>
                  <option value="freeplay">{tr.contact.eventTypes.freeplay}</option>
                  <option value="private">{tr.contact.eventTypes.private}</option>
                  <option value="other">{tr.contact.eventTypes.other}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  {tr.contact.form.messageLabel}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={tr.contact.form.messagePlaceholder}
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? tr.contact.form.sending : tr.contact.form.send}
              </button>
            </form>
          ) : (
            <div className="text-center py-20 animate-[zoomIn_0.3s_ease-out]">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                ✓
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">
                {tr.contact.success.title}
              </h3>
              <p className="text-gray-500 mb-8 font-medium">
                {tr.contact.success.subtitle}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-blue-600 font-bold hover:underline"
              >
                {tr.contact.success.sendAnother}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
