import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BookingCalendar from "./components/BookingCalendar";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <Navbar scrolled={scrolled} />

      <main>
        <section id="inicio">
          <Hero />
        </section>

        {/* ACTIVA UNO A UNO cambiando true/false */}
        {true && (
          <section id="servicios">
            <Services />
          </section>
        )}

        {true && (
          <section id="reservar" className="py-20 bg-gray-50/50">
            <BookingCalendar />
          </section>
        )}

        {true && (
          <section id="por-que-nosotros" className="py-20">
            <Features />
          </section>
        )}

        {true && (
          <section id="galeria" className="py-20 bg-yellow-50/50">
            <Gallery />
          </section>
        )}

        {true && (
          <section id="tarifas" className="py-20">
            <Pricing />
          </section>
        )}

        {true && (
          <section id="opiniones" className="py-20 bg-purple-50/30">
            <Testimonials />
          </section>
        )}

        {true && (
          <section id="contacto" className="py-20">
            <Contact />
          </section>
        )}
      </main>

      {true && <Footer />}
    </div>
  );
}
