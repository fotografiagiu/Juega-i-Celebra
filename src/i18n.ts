export type Lang = "val" | "es";

export const t = (lang: Lang) => {
  const isVal = lang === "val";

  return {
    nav: {
      inicio: isVal ? "Inici" : "Inicio",
      servicios: isVal ? "Serveis" : "Servicios",
      calendario: isVal ? "Calendari" : "Calendario",
      tarifas: isVal ? "Tarifes" : "Tarifas",
      contacto: isVal ? "Contacte" : "Contacto",
      reservar: isVal ? "Reservar 2026" : "Reservar 2026",
    },

    hero: {
      subtitle: isVal ? "Espai per a esdeveniments" : "Espacio para eventos",
    },

    // aquí iremos metiendo más claves según lo que quieras traducir
  };
};
