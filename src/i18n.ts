export type Lang = "val" | "es";

export const LANG_KEY = "juga_lang";

type Dict = Record<string, any>;

/**
 * Diccionario mínimo (amplíalo). Estructura:
 * t(lang).hero.title, t(lang).nav.inicio, etc.
 */
const DICT: Record<Lang, Dict> = {
  val: {
    nav: {
      inicio: "Inici",
      servicios: "Serveis",
      calendario: "Calendari",
      tarifas: "Tarifes",
      contacto: "Contacte",
      reservar: "Reservar 2026",
    },
  },
  es: {
    nav: {
      inicio: "Inicio",
      servicios: "Servicios",
      calendario: "Calendario",
      tarifas: "Tarifas",
      contacto: "Contacto",
      reservar: "Reservar 2026",
    },
  },
};

export function t(lang: Lang) {
  return DICT[lang] || DICT.val;
}
