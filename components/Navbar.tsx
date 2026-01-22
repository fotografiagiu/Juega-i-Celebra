
import React, { useState } from 'react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Servicios', id: 'servicios' },
    { name: 'Calendario', id: 'reservar' },
    { name: 'Tarifas', id: 'tarifas' },
    { name: 'Contacto', id: 'contacto' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);

    const el = window.document.getElementById(id);
    if (!el) {
      console.warn(`No existe el id: ${id}`);
      return;
    }

    const NAVBAR_HEIGHT = 120; // ajustado a tu diseño
    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      NAVBAR_HEIGHT;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div
            onClick={() => scrollToSection('inicio')}
            className="cursor-pointer text-white font-black text-xl"
          >
            JugaiCelebra
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white font-bold hover:text-yellow-300"
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => scrollToSection('reservar')}
              className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition"
            >
              Reservar 2026
            </button>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left font-bold"
            >
              {link.name}
            </button>
          ))}

          <button
            onClick={() => scrollToSection('reservar')}
            className="w-full bg-orange-500 py-3 rounded-xl font-bold"
          >
            Reservar 2026
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
