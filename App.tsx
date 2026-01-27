import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BookingCalendar from "./components/BookingCalendar";
import ChatAssistant from "./components/ChatAssistant";

import LanguageModal from "./src/components/LanguageModal";
import LanguagePill from "./src/components/LanguagePill";

import type { Lang } from "./src/i18n";

const LANG_KEY = "juga_lang";

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  const [lang, setLang] = useState<Lang>("val");
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Modal SOLO si no hay idioma guardado
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "val" || saved === "es") {
        setLang(saved as Lang);
        setShowLangModal(false);
      } else {
        setShowLangModal(true);
      }
    } catch {
      setShowLangModal(true);
    }
  }, []);

  const handleSelectLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {}
    setShowLangModal(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Modal idioma */}
      <LanguageModal
        open={showLangModal}
        onClose={() => setShowLangModal(false)}
        onSelect={handleSelectLang}
      />

      {/* Botón visible siempre */}
      <LanguagePill lang={lang} onOpen={() => setShowLangModal(true)} />

      <Navbar scrolled={scrolled} lang={lang} />

      <main>
        <section id="inicio">
          <Hero lang={lang} />
        </section>

        <section id="servicios" className="py-20">
          <Services lang={lang} />
        </section>

        {/* 👇 DESTINO DEL BOTÓN */}
        <section id="reservar" className="py-20 bg-gray-50 scroll-mt-28">
          <BookingCalendar lang={lang} />
        </section>

        <section className="py-20">
          <Features lang={lang} />
        </section>

        <section className="py-20 bg-yellow-50">
          <Gallery lang={lang} />
        </section>

        <section id="tarifas" className="py-20 scroll-mt-28">
          <Pricing lang={lang} />
        </section>

        <section id="contacto" className="py-20">
          <Contact lang={lang} />
        </section>
      </main>

      <Footer lang={lang} />
      <ChatAssistant />
    </div>
  );
};

export default App;
