import React, { useEffect, useState } from "react";

import Navbar from "./src/components/Navbar";
import Hero from "./src/components/Hero";
import Services from "./src/components/Services";
import Features from "./src/components/Features";
import Gallery from "./src/components/Gallery";
import Pricing from "./src/components/Pricing";
import Contact from "./src/components/Contact";
import Footer from "./src/components/Footer";
import BookingCalendar from "./src/components/BookingCalendar";
import ChatAssistant from "./src/components/ChatAssistant";

import LanguageModal, { type Lang } from "./src/components/LanguageModal";
import LanguagePill from "./src/components/LanguagePill";

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

  // Mostrar modal SOLO si no hay idioma guardado
  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "val" || saved === "es") {
      setLang(saved as Lang);
      setShowLangModal(false);
    } else {
      setShowLangModal(true);
    }
  }, []);

  const handleSelectLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem(LANG_KEY, l);
    setShowLangModal(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Modal (solo primera vez o si forzamos abrirlo) */}
      <LanguageModal open={showLangModal} onSelect={handleSelectLang} />

      {/* Botón visible siempre para cambiar idioma */}
      <LanguagePill current={lang} onClick={() => setShowLangModal(true)} />

      <Navbar scrolled={scrolled} />

      <main>
        <section id="inicio">
          <Hero />
        </section>

        <section id="servicios" className="py-20">
          <Services />
        </section>

        <section id="reservar" className="py-20 bg-gray-50 scroll-mt-28">
          <BookingCalendar />
        </section>

        <section className="py-20">
          <Features />
        </section>

        <section className="py-20 bg-yellow-50">
          <Gallery />
        </section>

        <section id="tarifas" className="py-20 scroll-mt-28">
          <Pricing />
        </section>

        <section id="contacto" className="py-20">
          <Contact />
        </section>
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default App;
