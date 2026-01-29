// src/i18n.ts
export type Lang = "val" | "es";
export const LANG_KEY = "juga_lang";

type Dict = Record<string, any>;

const DICT: Record<Lang, Dict> = {
  /* ===========================
     VALENCIÀ
  ============================ */
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
            "Circuit multinivell amb milers de boles, tobogans gegants i obstacles.",
        },
        {
          title: "Celebracions",
          desc:
            "Lloguer d’espai per a festes infantils i esdeveniments familiars.",
        },
        {
          title: "Zona baby segura",
          desc:
            "Espai segur per als més menuts (0-3 anys) amb sòl encoixinat.",
        },
      ],
    },

    pricing: {
      title: "Tarifes de lloguer 2026",
      subtitle: "Lloga el nostre espai en exclusiva per a la teua celebració.",
      badgeRecommended: "MÉS RESERVAT",
      cta: "Reserva ara 🗓️",
      tiers: [
        {
          name: "Entre setmana",
          price: "80€",
          unit: "/dia",
          features: [
            "De dilluns a dijous (10:00-21:30)",
            "Accés exclusiu a tot l’espai",
            "Cuina equipada",
            "Fiança de 100€",
            "Servei de neteja (+60€)",
          ],
          recommended: false,
        },
        {
          name: "Vesprada / Divendres",
          price: "100€",
          unit: "/dia",
          features: [
            "Divendres / vespra de festiu",
            "Ideal per a celebracions",
            "Accés exclusiu",
            "Fiança de 100€",
            "Servei de neteja (+60€)",
          ],
          recommended: true,
        },
        {
          name: "Cap de setmana",
          price: "160€",
          unit: "/dia",
          features: [
            "Dissabte / Diumenge",
            "Dia complet",
            "Accés exclusiu",
            "Fiança de 100€",
            "Servei de neteja (+60€)",
          ],
          recommended: false,
        },
      ],
      conditionsTitle: "Condicions de reserva",
      conditions: [
        "Fiança de 100€ en efectiu.",
        "Es retorna després de revisar el local.",
        "Servei de neteja opcional: 60€.",
      ],
    },

    gallery: {
      title: "Galeria",
      subtitle:
        "Parc de boles i la resta del local. Polsa per a veure totes les fotos.",
      photosWord: "fotos",
      viewButton: "Veure galeria",
      ariaOpen: "Obrir galeria",
      ariaOpenPhoto: "Obrir foto",
      groups: {
        bolas: {
          title: "Parc de boles",
          subtitle: "Zona de joc",
          slidePrefix: "Parc de boles",
        },
        local: {
          title: "El local",
          subtitle: "Taules, cuina, lavabo i zones comunes",
          slidePrefix: "Local",
        },
      },
    },

    contact: {
      title: "Parlem?",
      subtitle:
        "Estem encantats d’ajudar-te a planificar el millor esdeveniment.",
      info: {
        addressTitle: "La nostra adreça",
        addressValue: "Avinguda País Valencià 58 (Algemesí)",
        phoneTitle: "Telèfon",
        phoneValue: "+34 614 03 77 92",
        hoursTitle: "Horari",
        hoursValue: "Dilluns a diumenge: 10:00 - 21:30",
      },
      form: {
        fullNameLabel: "Nom complet",
        fullNamePlaceholder: "El teu nom",
        contactLabel: "Correu / Telèfon",
        contactPlaceholder: "Dades de contacte",
        eventTypeLabel: "Tipus d’esdeveniment",
        messageLabel: "Missatge",
        messagePlaceholder: "En què podem ajudar-te?",
        send: "Enviar missatge",
        sending: "Enviant…",
      },
      success: {
        title: "Missatge rebut!",
        subtitle: "Et contestarem prompte.",
        sendAnother: "Enviar un altre missatge",
      },
      alertError: "Error en l’enviament. Contacta per telèfon.",
      eventTypes: {
        birthday: "Aniversari",
        freeplay: "Joc lliure",
        private: "Esdeveniment privat",
        other: "Altres",
      },
    },
  },

  /* ===========================
     CASTELLANO
  ============================ */
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
        "Instalaciones modernas, seguras y pensadas para disfrutar sin límites.",
      cta: "Ver tarifas",
      cards: [
        {
          title: "Selva de bolas y toboganes",
          desc:
            "Circuito multinivel con bolas, toboganes y obstáculos.",
        },
        {
          title: "Celebraciones",
          desc:
            "Alquiler de espacio para fiestas y eventos familiares.",
        },
        {
          title: "Zona baby segura",
          desc:
            "Espacio seguro para peques de 0 a 3 años.",
        },
      ],
    },

    pricing: {
      title: "Tarifas de Alquiler 2026",
      subtitle: "Alquila nuestro espacio en exclusiva.",
      badgeRecommended: "MÁS RESERVADO",
      cta: "Reserva ahora 🗓️",
      tiers: [],
      conditionsTitle: "Condiciones",
      conditions: [],
    },

    gallery: {
      title: "Galería",
      subtitle:
        "Parque de bolas y el resto del local. Pulsa para ver todas las fotos.",
      photosWord: "fotos",
      viewButton: "Ver galería",
      ariaOpen: "Abrir galería",
      ariaOpenPhoto: "Abrir foto",
      groups: {
        bolas: {
          title: "Parque de bolas",
          subtitle: "Zona de juego",
          slidePrefix: "Parque de bolas",
        },
        local: {
          title: "El local",
          subtitle: "Mesas, cocina y zonas comunes",
          slidePrefix: "Local",
        },
      },
    },

    contact: {
      title: "¿Hablamos?",
      subtitle:
        "Estamos encantados de ayudarte a planificar tu evento.",
      info: {
        addressTitle: "Dirección",
        addressValue: "Avinguda País Valencià 58 (Algemesí)",
        phoneTitle: "Teléfono",
        phoneValue: "+34 614 03 77 92",
        hoursTitle: "Horario",
        hoursValue: "Lunes a domingo: 10:00 - 21:30",
      },
      form: {
        fullNameLabel: "Nombre completo",
        fullNamePlaceholder: "Tu nombre",
        contactLabel: "Correo / Teléfono",
        contactPlaceholder: "Datos de contacto",
        eventTypeLabel: "Tipo de evento",
        messageLabel: "Mensaje",
        messagePlaceholder: "¿En qué podemos ayudarte?",
        send: "Enviar mensaje",
        sending: "Enviando…",
      },
      success: {
        title: "¡Mensaje recibido!",
        subtitle: "Te contestaremos lo antes posible.",
        sendAnother: "Enviar otro mensaje",
      },
      alertError: "Error en el envío. Contacta por teléfono.",
      eventTypes: {
        birthday: "Cumpleaños",
        freeplay: "Juego libre",
        private: "Evento privado",
        other: "Otro",
      },
    },
  },
};

/* ===========================
   HELPERS
=========================== */
export function t(lang: Lang) {
  return DICT[lang] ?? DICT.val;
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
