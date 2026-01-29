// src/i18n.ts
export type Lang = "val" | "es";
export const LANG_KEY = "juga_lang";

type Dict = Record<string, any>;

const DICT: Record<Lang, Dict> = {
  /* =======================
     VALENCIÀ
  ======================= */
  val: {
    nav: {
      inicio: "Inici",
      servicios: "Serveis",
      calendario: "Calendari",
      tarifas: "Tarifes",
      contacto: "Contacte",
      reservar: "Reservar 2026",
    },

    pricing: {
      title: "Tarifes de lloguer 2026",
      subtitle: "Lloga el nostre espai en exclusiva per a la teua celebració.",
      badgeRecommended: "MÉS RESERVAT",
      cta: "Reserva ara 🗓️",
      tiers: [],
      conditionsTitle: "Condicions de reserva",
      conditions: [],
    },

    features: {
      ctaContact: "Contactar ara",
      ctaWhatsapp: "WhatsApp",
    },

    gallery: {
      title: "Galeria",
      subtitle: "Parc de boles i la resta del local. Polsa per veure totes les fotos.",
      viewButton: "Veure galeria",
      photosWord: "fotos",
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
        "Estem encantats de resoldre els teus dubtes o ajudar-te a planificar el millor esdeveniment per als teus peques.",
      info: {
        addressTitle: "La nostra adreça",
        addressValue: "Avinguda País Valencià 58 (Algemesí), València",
        phoneTitle: "Telèfon",
        phoneValue: "+34 614 03 77 92",
        hoursTitle: "Horari",
        hoursValue: "Dilluns a diumenge: 10:00 - 21:30",
      },
      form: {
        fullNameLabel: "Nom complet",
        fullNamePlaceholder: "El teu nom…",
        contactLabel: "Correu / Telèfon",
        contactPlaceholder: "Dades de contacte…",
        eventTypeLabel: "Tipus d’esdeveniment",
        messageLabel: "Missatge",
        messagePlaceholder: "En què podem ajudar-te?",
        send: "Enviar missatge",
        sending: "Enviant…",
      },
      success: {
        title: "Missatge rebut!",
        subtitle: "Et contestarem tan prompte com siga possible.",
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

  /* =======================
     CASTELLANO
  ======================= */
  es: {
    nav: {
      inicio: "Inicio",
      servicios: "Servicios",
      calendario: "Calendario",
      tarifas: "Tarifas",
      contacto: "Contacto",
      reservar: "Reservar 2026",
    },

    pricing: {
      title: "Tarifas de Alquiler 2026",
      subtitle: "Alquila nuestro espacio en exclusiva para tu celebración.",
      badgeRecommended: "MÁS RESERVADO",
      cta: "Reserva ahora 🗓️",
      tiers: [],
      conditionsTitle: "Condiciones de reserva",
      conditions: [],
    },

    features: {
      ctaContact: "Contactar ahora",
      ctaWhatsapp: "WhatsApp",
    },

    gallery: {
      title: "Galería",
      subtitle: "Parque de bolas y el resto del local. Pulsa para ver todas las fotos.",
      viewButton: "Ver galería",
      photosWord: "fotos",
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
          subtitle: "Mesas, cocina, aseo y zonas comunes",
          slidePrefix: "Local",
        },
      },
    },

    contact: {
      title: "¿Hablamos?",
      subtitle:
        "Estamos encantados de resolver tus dudas o ayudarte a planificar el mejor evento para tus peques.",
      info: {
        addressTitle: "Nuestra dirección",
        addressValue: "Avinguda País Valencià 58 (Algemesí), Valencia",
        phoneTitle: "Teléfono",
        phoneValue: "+34 614 03 77 92",
        hoursTitle: "Horario",
        hoursValue: "Lunes a domingo: 10:00 - 21:30",
      },
      form: {
        fullNameLabel: "Nombre completo",
        fullNamePlaceholder: "Tu nombre…",
        contactLabel: "Correo / Teléfono",
        contactPlaceholder: "Datos de contacto…",
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

export function t(lang: Lang) {
  return DICT[lang] ?? DICT.val;
}
