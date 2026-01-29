// src/i18n.ts
export type Lang = "val" | "es";
export const LANG_KEY = "juga_lang";

type Dict = Record<string, any>;

const DICT: Record<Lang, Dict> = {
  /* =========================
     VALENCIÀ
  ========================= */
  val: {
    nav: {
      inicio: "Inici",
      servicios: "Serveis",
      reservar: "Reservar 2026",
      tarifas: "Tarifes",
      contacto: "Contacte",
    },

    hero: {
      subtitle: "Espai per a esdeveniments",
      city: "Algemesí",
      ctaReserve: "RESERVAR 2026",
      ctaWhatsapp: "WHATSAPP",
    },

    services: {
      title: "Què vas a trobar?",
      intro:
        "En Juga i Celebra hem dissenyat el paradís del joc.",
      cta: "Veure tarifes",
      cards: [
        {
          title: "Selva de boles i tobogans",
          desc:
            "Circuit multinivell amb boles, tobogans i obstacles.",
        },
        {
          title: "Celebracions",
          desc:
            "Lloguer d’espai per a festes i esdeveniments.",
        },
        {
          title: "Zona baby segura",
          desc:
            "Espai segur per a xiquets de 0 a 3 anys.",
        },
      ],
    },

    pricing: {
      title: "Tarifes de lloguer 2026",
      subtitle:
        "Lloga el nostre espai en exclusiva.",
      badgeRecommended: "MÉS RESERVAT",
      cta: "Reserva ara 🗓️",
      tiers: [
        {
          name: "Entre setmana",
          price: "80€",
          unit: "/dia",
          features: [
            "De dilluns a dijous",
            "Accés exclusiu",
            "Fiança 100€",
          ],
          recommended: false,
        },
        {
          name: "Divendres",
          price: "100€",
          unit: "/dia",
          features: [
            "Divendres / vespra festiu",
            "Accés exclusiu",
            "Fiança 100€",
          ],
          recommended: true,
        },
      ],
    },

    features: {
      ctaContact: "Contactar ara",
      ctaWhatsapp: "WhatsApp",

      local: {
        imageAlt: "Local Juga i Celebra",
        titlePre: "El local per al teu",
        titleHighlight: "esdeveniment",
        description:
          "Espai ampli i lluminós a Algemesí.",
        points: [
          "Fins a 48 persones",
          "Taules i cadires",
          "Ubicació cèntrica",
        ],
      },

      park: {
        imageAlt: "Parc de boles",
        titlePre: "Parc de boles i",
        titleHighlight: "diversió",
        description:
          "Zona de joc segura per als peques.",
      },
    },

    gallery: {
      title: "Galeria",
      subtitle:
        "Parc de boles i el local.",
      photosWord: "fotos",
      viewButton: "Veure galeria",
      ariaOpen: "Obrir galeria",
      ariaOpenPhoto: "Obrir foto",
      groups: {
        bolas: {
          title: "Parc de boles",
          subtitle: "Zona de joc",
          slidePrefix: "Parc",
        },
        local: {
          title: "El local",
          subtitle: "Espais comuns",
          slidePrefix: "Local",
        },
      },
    },

    contact: {
      title: "Parlem?",
      subtitle:
        "Contacta amb nosaltres.",
      info: {
        addressTitle: "Adreça",
        addressValue:
          "Avinguda País Valencià 58, Algemesí",
        phoneTitle: "Telèfon",
        phoneValue: "+34 614 03 77 92",
        hoursTitle: "Horari",
        hoursValue: "10:00 - 21:30",
      },
      form: {
        fullNameLabel: "Nom complet",
        contactLabel: "Telèfon o correu",
        eventTypeLabel: "Tipus",
        messageLabel: "Missatge",
        send: "Enviar",
        sending: "Enviant…",
      },
      eventTypes: {
        birthday: "Aniversari",
        freeplay: "Joc lliure",
        private: "Privat",
        other: "Altres",
      },
    },
  },

  /* =========================
     CASTELLANO
  ========================= */
  es: {
    nav: {
      inicio: "Inicio",
      servicios: "Servicios",
      reservar: "Reservar 2026",
      tarifas: "Tarifas",
      contacto: "Contacto",
    },

    hero: {
      subtitle: "Espacio para eventos",
      city: "Algemesí",
      ctaReserve: "RESERVAR 2026",
      ctaWhatsapp: "WHATSAPP",
    },

    services: {
      title: "¿Qué vas a encontrar?",
      intro:
        "Hemos diseñado el paraíso del juego.",
      cta: "Ver tarifas",
      cards: [
        {
          title: "Selva de bolas",
          desc: "Circuito de juego multinivel.",
        },
        {
          title: "Celebraciones",
          desc: "Alquiler del local.",
        },
        {
          title: "Zona baby",
          desc: "Zona segura 0–3 años.",
        },
      ],
    },

    pricing: {
      title: "Tarifas 2026",
      subtitle:
        "Alquiler exclusivo del espacio.",
      badgeRecommended: "MÁS RESERVADO",
      cta: "Reservar 🗓️",
      tiers: [],
    },

    features: {
      ctaContact: "Contactar ahora",
      ctaWhatsapp: "WhatsApp",
      local: { imageAlt: "Local" },
      park: { imageAlt: "Parque" },
    },

    gallery: {
      title: "Galería",
      subtitle:
        "Parque y local.",
      photosWord: "fotos",
      viewButton: "Ver galería",
      ariaOpen: "Abrir galería",
      ariaOpenPhoto: "Abrir foto",
      groups: {
        bolas: {
          title: "Parque de bolas",
          subtitle: "Zona de juego",
          slidePrefix: "Parque",
        },
        local: {
          title: "El local",
          subtitle: "Zonas comunes",
          slidePrefix: "Local",
        },
      },
    },

    contact: {
      title: "¿Hablamos?",
      subtitle:
        "Contacta con nosotros.",
      info: {
        phoneValue: "+34 614 03 77 92",
      },
    },
  },
};

/* =========================
   HELPERS
========================= */
export function t(lang: Lang) {
  return DICT[lang] ?? DICT.val;
}

export function getSavedLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === "val" || v === "es" ? v : null;
  } catch {
    return null;
  }
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}
