
import React, { useState } from 'react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  // IMPORTANTE: usa SIEMPRE "reservar"
  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Servicios', id: 'servicios' },
    { name: 'Calendario', id: 'reservar' },
    { name: 'Tarifas', id: 'tarifas' },
    { name: 'Contacto', id: 'contacto' },
  ];

  // Encuentra el contenedor que realmente hace scroll (subiendo desde el target)
  const findScrollParent = (el: HTMLElement | null): HTMLElement => {
    let parent = el?.parentElement;

    while (parent) {
      const style = window.getComputedStyle(parent);
      const overflowY = style.overflowY;

      const canScroll =
        (overflowY === 'auto' || overflowY === 'scroll') &&
        parent.scrollHeight > parent.clientHeight;

      if (canScroll) return parent;

      parent = parent.parentElement;
    }

    // Fallback: el elemento que scrollea el documento
    return (document.scrollingElement as HTMLElement) || document.documentElement;
  };

  // Scroll a sección (funciona aunque el scroll NO esté en window)
  const handleScroll = (id: string) => {
    setIsOpen(false);
    if (typeof window === 'undefined') return;

    const target = document.getElementById(id);
    if (!target) {
      console.warn(`No encuentro el id="${id}" en la página`);
      return;
    }

    const container = findScrollParent(target);

    // Offset para que el navbar fixed no tape el inicio
    const NAVBAR_OFFSET = 120;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const top =
      (targetRect.top - containerRect.top) +
      container.scrollTop -
      NAVBAR_OFFSET;

    container.scrollTo({ top, behavior: 'smooth' });
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
          {/* Logo */}
          <div
            onClick={() => handleScroll('inicio')}
            className="flex-shrink-0 flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-3xl font-extrabold tracking-tight flex gap-1">
              <span className="text-orange-500">J</span>
              <span className="text-cyan-400">u</span>
              <span className="text-green-500">g</span>
              <span className="text-pink-500">a</span>
              <span className="text-white mx-1">i</span>
              <span className="text-purple-500">C</span>
              <span className="text-orange-400">e</span>
              <span className="text-cyan-500">l</span>
              <span className="text-pink-400">e</span>
              <span className="text-green-400">b</span>
              <span className="text-yellow-500">r</span>
              <span className="text-orange-500">a</span>
            </span>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScroll(link.id)}
                  className="px-3 py-2 rounded-md text-sm font-bold transition-colors text-white hover:text-yellow-300 drop-shadow-sm cursor-pointer bg-transparent border-none"
                >
                  {link.name}
                </button>
              ))}

              <button
                onClick={() => handleScroll('reservar')}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold hover:from-pink-500 hover:to-orange-500 transition-all shadow-md transform hover:scale-105 cursor-pointer border-none"
              >
                Reservar 2026
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
              aria-label="Abrir menú"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden absolute w-full bg-black transition-all duration-300 shadow-xl ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScroll(link.id)}
              className="block w-full text-left px-3 py-4 text-base font-bold text-white hover:text-cyan-400 border-b border-gray-800 bg-transparent border-none cursor-pointer"
            >
              {link.name}
            </button>
          ))}

          <div className="mt-4 px-3">
            <button
              onClick={() => handleScroll('reservar')}
              className="block w-full text-center bg-orange-500 text-white px-6 py-3 rounded-xl font-bold border-none cursor-pointer"
            >
              Reservar 2026
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
