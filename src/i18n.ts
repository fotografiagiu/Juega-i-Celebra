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

    features: {
      local: {
        imageAlt: "Local Juga i Celebra",
        badgeSub: "per al teu esdeveniment",
        titlePre: "El local per al teu",
        titleHighlight: "esdeveniment",
        description:
          "Un espai a Algemesí pensat per a celebracions familiars, reunions i esdeveniments privats. Tu tries el pla, nosaltres posem el lloc.",
        points: [
          "Aforament autoritzat per a un màxim de 48 persones.",
          "Espai ampli per a aniversaris, comunions, jubilacions i reunions.",
          "Taules i cadires per a adults i xiquets.",
          "Local còmode i lluminós per a organitzar l’esdeveniment a la teua manera.",
          "Ubicació: Avinguda País Valencià 58 (Algemesí).",
        ],
        equipmentTitle: "Equipament i comoditats",
        equipment: {
          items: [
            { icon: "🪑", text: "40 cadires adults" },
            { icon: "🧒", text: "16 cadires peques (ampliarem pròximament amb 4+)" },
            { icon: "🪑", text: "6 taules plegables" },
            { icon: "🧸", text: "4 taules peques (ampliarem pròximament amb 1+)" },
            { icon: "👶", text: "2 trones" },
            { icon: "🚻", text: "Bany adaptat PMR amb canviador" },
            { icon: "🧥", text: "Penjadors i zona de descans" },
            { icon: "📺", text: "Smart TV amb internet" },
            { icon: "📦", text: "Magatzem" },
          ],
          kitchen: {
            icon: "🍽️",
            prefix: "Cuina de suport",
            noCook: "(no es pot cuinar)",
            details: "nevera/congelador, cafetera, microones i boteller",
          },
        },
        ctaContact: "Contactar ara",
        ctaWhatsapp: "WhatsApp",
      },

      park: {
        imageAlt: "Parc de boles Juga i Celebra",
        badgeTitle: "Parc",
        badgeSub: "zona de joc",
        titlePre: "Parc de boles i",
        titleHighlight: "diversió",
        description:
          "Zona de joc dissenyada perquè els peques s’ho passen genial mentre alliberen energia de manera segura durant la celebració.",
        points: [
          "Parc de boles amb circuit de joc, obstacles i tobogans.",
          "Ideal perquè els peques es divertisquen i gasten energia durant la celebració.",
          "Accés i ús del parc sota la supervisió d’un adult responsable.",
          "Normes bàsiques: calcetins obligatoris i sense calçat dins l’àrea de joc.",
          "Normes bàsiques: no es permet menjar/beguda dins del parc de boles.",
        ],
        ctaGallery: "Veure galeria",
      },
    },

    // (Opcional) si tu Contact/Pricing usan tr.contact / tr.pricing, aquí tienes base lista
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
        fullNamePlaceholder: "El teu nom...",
        contactLabel: "Correu electrònic / Telèfon",
        contactPlaceholder: "Dades de contacte...",
        eventTypeLabel: "Tipus d’esdeveniment",
        messageLabel: "Missatge",
        messagePlaceholder: "En què podem ajudar-te?",
        send: "Enviar missatge",
        sending: "Enviant...",
      },
      eventTypes: {
        birthday: "Aniversari",
        freeplay: "Joc lliure",
        private: "Esdeveniment privat",
        other: "Altres",
      },
      success: {
        title: "Missatge rebut!",
        subtitle: "Et contestarem el més prompte possible.",
        sendAnother: "Enviar un altre missatge",
      },
      alertError: "Error en l’enviament. Per favor, contacta per telèfon.",
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

    features: {
      local: {
        imageAlt: "Local Juga i Celebra",
        badgeSub: "para tu evento",
        titlePre: "El local para tu",
        titleHighlight: "evento",
        description:
          "Un espacio en Algemesí pensado para celebraciones familiares, reuniones y eventos privados. Tú decides el plan, nosotros ponemos el sitio.",
        points: [
          "Aforo autorizado para un máximo de 48 personas.",
          "Espacio amplio para cumpleaños, comuniones, jubilaciones y reuniones.",
          "Mesas y sillas para adultos y niños.",
          "Local cómodo y luminoso para organizar el evento a tu manera.",
          "Ubicación: Avinguda País Valencià 58 (Algemesí).",
        ],
        equipmentTitle: "Equipamiento y comodidades",
        equipment: {
          items: [
            { icon: "🪑", text: "40 sillas adultos" },
            { icon: "🧒", text: "16 sillas peques (ampliamos próximamente con 4+)" },
            { icon: "🪑", text: "6 mesas plegables" },
            { icon: "🧸", text: "4 mesas peques (ampliamos próximamente con 1+)" },
            { icon: "👶", text: "2 tronas" },
            { icon: "🚻", text: "Baño adaptado PMR con cambiador" },
            { icon: "🧥", text: "Percheros y zona de descanso" },
            { icon: "📺", text: "Smart TV con internet" },
            { icon: "📦", text: "Almacén" },
          ],
          kitchen: {
            icon: "🍽️",
            prefix: "Cocina de apoyo",
            noCook: "(no se puede cocinar)",
            details: "nevera/congelador, cafetera, microondas y botellero",
          },
        },
        ctaContact: "Contactar ahora",
        ctaWhatsapp: "WhatsApp",
      },

      park: {
        imageAlt: "Parque de bolas Juga i Celebra",
        badgeTitle: "Parque",
        badgeSub: "zona de juego",
        titlePre: "Parque de bolas y",
        titleHighlight: "diversión",
        description:
          "Zona de juego diseñada para que los peques se lo pasen en grande, mientras liberan energía de forma segura durante la celebración.",
        points: [
          "Parque de bolas con circuito de juego, obstáculos y toboganes.",
          "Ideal para que los peques se diviertan y gasten energía durante la celebración.",
          "Acceso y uso del parque bajo supervisión de un adulto responsable.",
          "Normas básicas: calcetines obligatorios y sin calzado dentro del área de juego.",
          "Normas básicas: no se permite comida/bebida dentro del parque de bolas.",
        ],
        ctaGallery: "Ver galería",
      },
    },

    contact: {
      title: "¿Hablamos?",
      subtitle:
        "Estamos encantados de resolver tus dudas o ayudarte a planificar el mejor evento para tus peques.",
      info: {
        addressTitle: "Nuestra Dirección",
        addressValue: "Avinguda País Valencià 58 (Algemesí), Valencia",
        phoneTitle: "Teléfono",
        phoneValue: "+34 614 03 77 92",
        hoursTitle: "Horario",
        hoursValue: "Lunes a Domingo: 10:00 - 21:30",
      },
      form: {
        fullNameLabel: "Nombre Completo",
        fullNamePlaceholder: "Tu nombre...",
        contactLabel: "Correo Electrónico / Teléfono",
        contactPlaceholder: "Datos de contacto...",
        eventTypeLabel: "Tipo de Evento",
        messageLabel: "Mensaje",
        messagePlaceholder: "¿En qué podemos ayudarte?",
        send: "Enviar Mensaje",
        sending: "Enviando...",
      },
      eventTypes: {
        birthday: "Cumpleaños",
        freeplay: "Juego Libre",
        private: "Evento Privado",
        other: "Otro",
      },
      success: {
        title: "¡Mensaje Recibido!",
        subtitle: "Te contestaremos lo antes posible.",
        sendAnother: "Enviar otro mensaje",
      },
      alertError: "Error en el envío. Por favor, contacta por teléfono.",
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
