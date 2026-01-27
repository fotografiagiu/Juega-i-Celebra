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

import LanguageModal, { type Lang } from "./components/LanguageModal";
import LanguagePill from "./components/LanguagePill";

const STORAGE_KEY = "juga_lang_v1";

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  const [lang, setLang] = useState<Lang>("val"); // Valencià por defecto
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Abrir modal solo la primera vez (si no hay elección guardada)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "val" || saved === "es") {
        setLang(saved);
        return;
      }
      setLangOpen(true);
    } catch {
      setLangOpen(true);
    }
  }, []);

  // ⚠️ Por ahora: el idioma se guarda y se muestra el selector.
  // Si quieres traducción real (textos cambiando), te lo hago después con un diccionario.
  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
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

      {/* Selector visible */}
      <LanguagePill lang={lang} onOpen={() => setLangOpen(true)} />

      {/* Modal */}
      <LanguageModal
        open={langOpen}
        onClose={() => setLangOpen(false)}
        onSelect={(l) => setLang(l)}
      />
    </div>
  );
};

export default App;
