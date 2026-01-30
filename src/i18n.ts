// src/i18n.ts
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
            "Fiança de 100€ (Efectiu)",
            "Servei neteja (+60€)",
          ],
          recommended: false,
        },
        {
          name: "Vesprada / Divendres",
          price: "100€",
          unit: "/dia",
          features: [
            "Divendres / Vespra de festiu (10:00-21:30)",
            "Ideal per a celebracions i reunions",
            "Accés exclusiu a tot l’espai",
            "Fiança de 100€ (Efectiu)",
            "Servei neteja (+60€)",
          ],
          recommended: true,
        },
        {
          name: "Cap de setmana (dia complet)",
          price: "160€",
          unit: "/dia",
          features: [
            "Dissabte/Diumenge (10:00-21:30)",
            "Dia complet per al teu esdeveniment",
            "Accés exclusiu a tot l’espai",
            "Fiança de 100€ (Efectiu)",
            "Servei neteja (+60€)",
          ],
          recommended: false,
        },
      ],
      conditionsTitle: "Condicions de reserva",
      conditions: [
        "Fiança de 100€, que s’abonarà en efectiu en el moment del lliurament de claus.",
        "Es retornarà una vegada revisat el local i verificat que tot està en perfecte estat.",
        "Servei de neteja: 60€ (opcional).",
        "Les reserves modificades o cancel·lades amb menys d’una setmana d’antelació no tenen devolució.",
        "En aquest cas, es retornarà el 50% de la reserva.",
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
            { icon: "🧒", text: "16 cadires peques (ampliem pròximament amb 4+)" },
            { icon: "🪑", text: "6 taules plegables" },
            { icon: "🧸", text: "4 taules peques (ampliem pròximament amb 1+)" },
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
          "Zona de joc dissenyada perquè els peques s’ho passen en gran mentre alliberen energia de manera segura durant la celebració.",
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

    footer: {
      description:
        "Dedicats a crear experiències màgiques per als més menuts de la casa. El millor parc de boles d’Algemesí.",
      quickLinksTitle: "Enllaços Ràpids",
      links: {
        inicio: "Inici",
        servicios: "Serveis",
        tarifas: "Tarifes",
        contacto: "Contacte",
      },
      legalTitle: "Legal",
      legal: {
        legalNotice: "Avís Legal",
        privacy: "Política de Privacitat",
        cookies: "Cookies",
      },
      copyright: "© 2026 Juga i Celebra. Tots els drets reservats.",
      designed: "Dissenyat amb ❤️ per a la comunitat d’Algemesí.",
    },

    // ✅ CHAT: ampliat i professional
    chat: {
      meta: {
        phone: "+34 614 03 77 92",
        phoneDigits: "34614037792",
        address: "Avinguda País Valencià 58 (Algemesí), València",
        hours: "Dilluns a diumenge: 10:00 - 21:30",
        capacityMax: "48",
        capacityText: "Aforament autoritzat: fins a 48 persones.",
        adultsChairs: "40 cadires d’adults",
        kidsChairs: "16 cadires de xiquets (ampliem pròximament amb 4+)",
        foldTables: "6 taules plegables",
        kidsTables: "4 taules menudes (ampliem pròximament amb 1+)",
        highChairs: "2 trones",
        kitchenText:
          "Cuina de suport (NO es pot cuinar): nevera/congelador, cafetera, microones i boteller.",
        foodText:
          "Sí, podeu portar el vostre menjar i beguda. Només demanem respectar les normes i deixar-ho tot en bon estat.",
      },

      ui: {
        fabLabel: "Obrir xat",
        title: "Assistència",
        subtitle: "Respostes ràpides",
        placeholder: "Escriu ací…",
        chips: {
          reserve: "🗓️ Reservar",
          whatsapp: "📲 WhatsApp",
          phone: "📞 Telèfon",
          location: "📍 Ubicació",
          hours: "🕒 Horari",
          prices: "💶 Tarifes",
          deposit: "🧾 Fiança i neteja",
          capacity: "👥 Aforament",
          seating: "🪑 Taules i cadires",
          food: "🍕 Menjar",
          kitchen: "🍽️ Cuina",
        },
        actions: {
          goReserve: "Anar a reservar",
          openWhatsapp: "Obrir WhatsApp",
        },
      },

      answers: {
        intro:
          "Hola! Sóc l’assistent de Juga i Celebra. Pregunta’m el que necessites (ubicació, horari, tarifes, aforament, taules/cadires, menjar, cuina o reserva).",
        location: "📍 Ubicació: {address}",
        hours: "🕒 Horari: {hours}",
        phone: "📞 Telèfon: {phone}",
        whatsapp: "📲 Escriu-nos per WhatsApp i t’ajudem ara mateix.",
        prices:
          "💶 Tarifes 2026: Dilluns-Dijous 80€, Divendres/Vespra 100€, Dissabte-Diumenge/Festiu 160€.",
        deposit:
          "🧾 Fiança: 100€ en efectiu el dia de les claus. Neteja: 60€ (opcional, a consultar).",
        reserve:
          "🗓️ Per reservar: baixa a “Reservar 2026” i tria una data disponible (les verdes ja estan reservades).",
        capacity: "👥 {capacityText}",
        seating:
          "🪑 Equipament:\n- {adultsChairs}\n- {kidsChairs}\n- {foldTables}\n- {kidsTables}\n- {highChairs}",
        food: "🍕 {foodText}",
        kitchen: "🍽️ {kitchenText}",
        fallback:
          "Pots preguntar per ubicació, horari, tarifes, fiança/neteja, aforament, taules/cadires, menjar, cuina o reserva.",
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

    pricing: {
      title: "Tarifas de Alquiler 2026",
      subtitle: "Alquila nuestro espacio en exclusiva para tu celebración.",
      badgeRecommended: "MÁS RESERVADO",
      cta: "Reserva ahora 🗓️",
      tiers: [
        {
          name: "Entre Semana",
          price: "80€",
          unit: "/día",
          features: [
            "De lunes a jueves (10:00-21:30)",
            "Acceso exclusivo a todo el espacio",
            "Cocina equipada",
            "Fianza de 100€ (Efectivo)",
            "Servicio limpieza (+60€)",
          ],
          recommended: false,
        },
        {
          name: "Tarde / Viernes",
          price: "100€",
          unit: "/día",
          features: [
            "Viernes / Víspera festivo (10:00-21:30)",
            "Ideal para celebraciones y reuniones",
            "Acceso exclusivo a todo el espacio",
            "Fianza de 100€ (Efectivo)",
            "Servicio limpieza (+60€)",
          ],
          recommended: true,
        },
        {
          name: "Fin de Semana (Día completo)",
          price: "160€",
          unit: "/día",
          features: [
            "Sábado/Domingo (10:00-21:30)",
            "Día completo para tu evento",
            "Acceso exclusivo a todo el espacio",
            "Fianza de 100€ (Efectivo)",
            "Servicio limpieza (+60€)",
          ],
          recommended: false,
        },
      ],
      conditionsTitle: "Condiciones de Reserva",
      conditions: [
        "Fianza de 100€, que se abonará en efectivo en el momento de la entrega de llaves.",
        "Se devolverá una vez revisado el local y verificado que todo está en perfecto estado.",
        "Servicio de limpieza: 60€ (opcional).",
        "Las reservas modificadas o canceladas con menos de una semana de antelación no tienen devolución.",
        "En este caso, se retornará el 50% de la reserva.",
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
          subtitle: "Mesas, cocina, aseo y zonas comunes",
          slidePrefix: "Local",
        },
      },
    },

    footer: {
      description:
        "Dedicados a crear experiencias mágicas para los más pequeños de la casa. El mejor parque de bolas de Algemesí.",
      quickLinksTitle: "Enlaces Rápidos",
      links: {
        inicio: "Inicio",
        servicios: "Servicios",
        tarifas: "Tarifas",
        contacto: "Contacto",
      },
      legalTitle: "Legal",
      legal: {
        legalNotice: "Aviso Legal",
        privacy: "Política de Privacidad",
        cookies: "Cookies",
      },
      copyright: "© 2026 Juga i Celebra. Todos los derechos reservados.",
      designed: "Diseñado con ❤️ para la comunidad de Algemesí.",
    },

    // ✅ CHAT: ampliat i profesional
    chat: {
      meta: {
        phone: "+34 614 03 77 92",
        phoneDigits: "34614037792",
        address: "Avinguda País Valencià 58 (Algemesí), Valencia",
        hours: "Lunes a domingo: 10:00 - 21:30",
        capacityMax: "48",
        capacityText: "Aforo autorizado: hasta 48 personas.",
        adultsChairs: "40 sillas de adultos",
        kidsChairs: "16 sillas de niños (ampliamos próximamente con 4+)",
        foldTables: "6 mesas plegables",
        kidsTables: "4 mesas pequeñas (ampliamos próximamente con 1+)",
        highChairs: "2 tronas",
        kitchenText:
          "La cocina es auxiliar (NO se puede cocinar): nevera/congelador, cafetera, microondas y botellero.",
        foodText:
          "Sí, podéis traer vuestra comida y bebida. Solo pedimos respetar las normas y dejarlo todo en buen estado.",
      },

      ui: {
        fabLabel: "Abrir chat",
        title: "Asistente",
        subtitle: "Respuestas rápidas",
        placeholder: "Escribe aquí…",
        chips: {
          reserve: "🗓️ Reservar",
          whatsapp: "📲 WhatsApp",
          phone: "📞 Teléfono",
          location: "📍 Ubicación",
          hours: "🕒 Horario",
          prices: "💶 Tarifas",
          deposit: "🧾 Fianza y limpieza",
          capacity: "👥 Aforo",
          seating: "🪑 Mesas y sillas",
          food: "🍕 Comida",
          kitchen: "🍽️ Cocina",
        },
        actions: {
          goReserve: "Ir a reservar",
          openWhatsapp: "Abrir WhatsApp",
        },
      },

      answers: {
        intro:
          "¡Hola! Soy el asistente de Juga i Celebra. Pregúntame lo que necesites (ubicación, horario, tarifas, aforo, mesas/sillas, comida, cocina o reserva).",
        location: "📍 Ubicación: {address}",
        hours: "🕒 Horario: {hours}",
        phone: "📞 Teléfono: {phone}",
        whatsapp: "📲 Escríbenos por WhatsApp y te ayudamos ahora mismo.",
        prices:
          "💶 Tarifas 2026: Lunes-Jueves 80€, Viernes/Víspera 100€, Sábado-Domingo/Festivo 160€.",
        deposit:
          "🧾 Fianza: 100€ en efectivo el día de entrega de llaves. Limpieza: 60€ (opcional, a consultar).",
        reserve:
          "🗓️ Para reservar: baja a “Reservar 2026” y elige una fecha disponible (las verdes ya están reservadas).",
        capacity: "👥 {capacityText}",
        seating:
          "🪑 Equipamiento:\n- {adultsChairs}\n- {kidsChairs}\n- {foldTables}\n- {kidsTables}\n- {highChairs}",
        food: "🍕 {foodText}",
        kitchen: "🍽️ {kitchenText}",
        fallback:
          "Puedes preguntarme por ubicación, horario, tarifas, fianza/limpieza, aforo, mesas/sillas, comida, cocina o reserva.",
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
