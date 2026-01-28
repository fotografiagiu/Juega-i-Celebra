export type Lang = "val" | "es";
export const LANG_KEY = "juga_lang";

type Dict = Record<string, any>;

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

    hero: {
      subtitle: "Espai per a esdeveniments",
      city: "Algemesí",
      ctaReserve: "RESERVAR 2026",
      ctaWhatsapp: "WHATSAPP",
      whatsapp: {
        greeting: "Hola 👋",
        line1: "He realitzat una reserva en Juga i Celebra a través de la web.",
        line2: "Si necessiteu res més per la meua part, quede atent/a.",
        thanks: "Gràcies 😊",
      },
    },

    services: {
      title: "Què vas a trobar?",
      intro:
        "En Juga i Celebra hem dissenyat el paradís del joc. Instal·lacions modernes, segures i pensades perquè cada minut siga una nova aventura.",
      cta: "Veure tarifes",
      cards: [
        {
          title: "Selva de boles i tobogans",
          desc:
            "Un circuit d’aventura multinivell amb milers de boles de colors, tobogans gegants i obstacles per a gastar energia sense parar.",
        },
        {
          title: "Celebracions",
          desc:
            "Lloguer d’espai per a festes infantils i esdeveniments familiars. Un local ampli i còmode perquè organitzes la celebració a la teua manera.",
        },
        {
          title: "Zona baby segura",
          desc:
            "Espai segur per als més menuts (0-3 anys) amb jocs de psicomotricitat, sòl encoixinat i total seguretat.",
        },
      ],
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

    hero: {
      subtitle: "Espacio para eventos",
      city: "Algemesí",
      ctaReserve: "RESERVAR 2026",
      ctaWhatsapp: "WHATSAPP",
      whatsapp: {
        greeting: "Hola 👋",
        line1: "He realizado una reserva en Juga i Celebra a través de la web.",
        line2: "Si necesitáis algo más por mi parte, quedo atento/a.",
        thanks: "Gracias 😊",
      },
    },

    services: {
      title: "¿Qué vas a encontrar?",
      intro:
        "En Juga i Celebra hemos diseñado el paraíso del juego. Instalaciones modernas, seguras y pensadas para que cada minuto sea una nueva aventura.",
      cta: "Ver tarifas",
      cards: [
        {
          title: "Selva de Bolas & Toboganes",
          desc:
            "Un circuito de aventura multinivel con miles de bolas de colores, toboganes gigantes y obstáculos para quemar energía sin parar.",
        },
        {
          title: "Celebraciones",
          desc:
            "Alquiler de espacio para fiestas infantiles y eventos familiares. Un local amplio y cómodo para que organices la celebración a tu manera.",
        },
        {
          title: "Zona Baby Segura",
          desc:
            "Espacio exclusivo para los más pequeñines (0-3 años) con juegos de psicomotricidad, suelo acolchado y total seguridad.",
        },
      ],
    },
  },
};

export function t(lang: Lang) {
  return DICT[lang] || DICT.val;
}

export function getSavedLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === "val" || v === "es" ? (v as Lang) : null;
  } catch {
    return null;
  }
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}
