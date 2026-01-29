     },
    },

    // ✅ AÑADIDO: Footer (tr.footer.*)
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

    contact: {
      title: "Parlem?",
      subtitle:
@@ -411,60 +432,81 @@
      },
    },

    // ✅ AÑADIDO: Footer (tr.footer.*)
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
