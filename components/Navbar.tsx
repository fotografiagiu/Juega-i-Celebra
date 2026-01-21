
import React, { useState } from 'react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inici', href: '#inicio' },
    { name: 'Serveis', href: '#servicios' },
    { name: 'Calendari', href: '#reservar' },
    { name: 'Tarifes', href: '#tarifas' },
    { name: 'Contacte', href: '#contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
            <span className="text-3xl font-extrabold tracking-tight flex gap-1">
              <span className="text-orange-500">J</span>
              <span className="text-cyan-400">u</span>
              <span className="text-green-500">g</span>
              <span className="text-pink-500">a</span>
              <span className="text-yellow-400 mx-1">i</span>
              <span className="text-purple-500">C</span>
              <span className="text-orange-400">e</span>
              <span className="text-cyan-500">l</span>
              <span className="text-pink-400">e</span>
              <span className="text-green-400">b</span>
              <span className="text-yellow-500">r</span>
              <span className="text-orange-500">a</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-bold transition-colors text-white hover:text-yellow-300 drop-shadow-sm`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#reservar"
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold hover:from-pink-500 hover:to-orange-500 transition-all shadow-md transform hover:scale-105"
              >
                Reserva 2026
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
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

      <div className={`md:hidden absolute w-full bg-black transition-all duration-300 shadow-xl ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold text-white hover:text-cyan-400 border-b border-gray-800"
            >
              {link.name}
            </a>
          ))}
          <div className="mt-4 px-3">
             <a
              href="#reservar"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-orange-500 text-white px-6 py-3 rounded-xl font-bold"
            >
              Reserva 2026
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
