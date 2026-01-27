import React, { useState, useEffect } from "react";

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

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // 🌍 idioma global
  const [lang, setLang] = useState<Lang>("val");
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 👉 mostrar popup SOLO la primera vez
  useEffect(() => {
    const saved = localStorage.getItem("juga_lang");
    if (saved === "val" || saved === "es") {
      setLang(saved as Lang);
    } else {
      setShowLangModal(true);
    }
  }, []);

  const handleSelectLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("juga_lang", l);
    setShowLangModal(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">

      {/* 🌍 POPUP IDIOMA */}
      <LanguageModal
        open={showLangModal}
        onSelect={handleSelectLang}
      />

      {/* 🌐 BOTÓN FLOTANTE */}
      <LanguagePill
        current={lang}
        onClick={() => setShowLangModal(true)}
      />

      <Navbar scrolled={scrolled} />

      <main>
        <section id="inicio">
          <Hero />
        </section>

        <section id="servicios" className="py-20">
          <Services />
        </section>

        <section
          id="reservar"
          className="py-20 bg-gray-50 scroll-mt-28"
        >
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
