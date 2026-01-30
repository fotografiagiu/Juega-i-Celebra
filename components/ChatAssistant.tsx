import React, { useEffect, useMemo, useRef, useState } from "react";
import { t, type Lang } from "../src/i18n";

type Props = {
  lang: Lang;
};

type Msg = { from: "bot" | "user"; text: string };

const PHONE_E164 = "34614037792"; // +34 614 03 77 92
const WA_LINK = `https://wa.me/${PHONE_E164}`;

export default function ChatAssistant({ lang }: Props) {
  const tr = t(lang);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    { from: "bot", text: `${tr.chat.title}: ${tr.chat.subtitle}` },
  ]);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // cuando cambias idioma, refresco mensaje inicial sin romper el historial
    setMsgs((prev) => {
      if (!prev.length) return [{ from: "bot", text: `${tr.chat.title}: ${tr.chat.subtitle}` }];
      const first = prev[0];
      const rest = prev.slice(1);
      return [{ ...first, text: `${tr.chat.title}: ${tr.chat.subtitle}` }, ...rest];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (!open) return;
    const tm = setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(tm);
  }, [open, msgs]);

  const chips = useMemo(
    () => [
      { key: "location", label: tr.chat.chips.location },
      { key: "hours", label: tr.chat.chips.hours },
      { key: "prices", label: tr.chat.chips.prices },
      { key: "deposit", label: tr.chat.chips.deposit },
      { key: "reserve", label: tr.chat.chips.reserve },
      { key: "whatsapp", label: tr.chat.chips.whatsapp },
    ],
    [tr]
  );

  const answerFor = (key: string) => {
    const a = tr.chat.answers;
    if (key === "location") return a.location;
    if (key === "hours") return a.hours;
    if (key === "prices") return a.prices;
    if (key === "deposit") return a.deposit;
    if (key === "reserve") return a.reserve;
    if (key === "whatsapp") return a.whatsapp;
    return "OK";
  };

  const push = (m: Msg) => setMsgs((p) => [...p, m]);

  const onChip = (key: string) => {
    push({ from: "user", text: chips.find((c) => c.key === key)?.label || key });
    push({ from: "bot", text: answerFor(key) });

    if (key === "reserve") {
      setTimeout(() => {
        const el = document.querySelector("#reservar");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }

    if (key === "whatsapp") {
      setTimeout(() => window.open(WA_LINK, "_blank"), 150);
    }
  };

  const onSend = () => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    push({ from: "user", text: q });

    // “matcher” simple por palabras clave (sin IA)
    const low = q.toLowerCase();
    const has = (arr: string[]) => arr.some((w) => low.includes(w));

    if (has(["ubic", "dónde", "donde", "direc", "mapa"])) return push({ from: "bot", text: tr.chat.answers.location });
    if (has(["hora", "horari", "abre", "cierra", "obert"])) return push({ from: "bot", text: tr.chat.answers.hours });
    if (has(["precio", "tarifa", "cuánto", "cuanto", "coste"])) return push({ from: "bot", text: tr.chat.answers.prices });
    if (has(["fianza", "limpieza", "deposito", "depósito"])) return push({ from: "bot", text: tr.chat.answers.deposit });
    if (has(["reserv", "fecha", "dispon"])) return push({ from: "bot", text: tr.chat.answers.reserve });

    // fallback
    push({
      from: "bot",
      text: `${tr.chat.subtitle}. ${tr.chat.inputHint}`,
    });
  };

  return (
    <>
      {/* FAB */}
      <button
        type="button"
        aria-label={tr.chat.fabLabel}
        className="jugaChatFab"
        onClick={() => setOpen((v) => !v)}
      >
        💬
      </button>

      {/* Panel */}
      {open && (
        <div className="jugaChatPanel" role="dialog" aria-modal="false">
          <div className="jugaChatHeader">
            <div>
              <div className="jugaChatTitle">{tr.chat.title}</div>
              <div className="jugaChatSub">{tr.chat.subtitle}</div>
            </div>
            <button type="button" className="jugaChatClose" onClick={() => setOpen(false)}>
              {tr.chat.actions.close} ✕
            </button>
          </div>

          <div className="jugaChatBody" ref={listRef}>
            {msgs.map((m, idx) => (
              <div key={idx} className={`jugaChatMsg ${m.from === "user" ? "isUser" : "isBot"}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="jugaChatChips">
            {chips.map((c) => (
              <button key={c.key} type="button" className="jugaChatChip" onClick={() => onChip(c.key)}>
                {c.label}
              </button>
            ))}
          </div>

          <div className="jugaChatInputRow">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tr.chat.placeholder}
              className="jugaChatInput"
              onKeyDown={(e) => e.key === "Enter" && onSend()}
            />
            <button type="button" className="jugaChatSend" onClick={onSend}>
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{css}</style>
    </>
  );
}

const css = `
.jugaChatFab{
  position: fixed;
  right: 18px;
  bottom: 18px;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: #fff;
  font-size: 22px;
  box-shadow: 0 16px 40px rgba(0,0,0,.22);
  cursor: pointer;
  z-index: 9999;
}

.jugaChatPanel{
  position: fixed;
  right: 18px;
  bottom: 86px;
  width: 340px;
  max-width: calc(100vw - 36px);
  background: #ffffff;
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 18px;
  box-shadow: 0 18px 60px rgba(0,0,0,.24);
  overflow: hidden;
  z-index: 9999;
}

.jugaChatHeader{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap: 10px;
  padding: 14px 14px 10px;
  background: linear-gradient(135deg, rgba(37,99,235,.12), rgba(249,115,22,.10));
  border-bottom: 1px solid rgba(0,0,0,.06);
}

.jugaChatTitle{ font-weight: 900; color:#0f172a; }
.jugaChatSub{ font-size: 12px; opacity: .75; margin-top: 2px; }

.jugaChatClose{
  border: none;
  background: rgba(255,255,255,.8);
  padding: 8px 10px;
  border-radius: 12px;
  cursor:pointer;
  font-weight: 700;
  font-size: 12px;
}

.jugaChatBody{
  height: 260px;
  overflow: auto;
  padding: 12px;
  background: #fff;
}

.jugaChatMsg{
  max-width: 85%;
  padding: 10px 12px;
  border-radius: 14px;
  margin: 8px 0;
  font-size: 13px;
  line-height: 1.25rem;
}

.jugaChatMsg.isBot{
  background: #f1f5f9;
  color: #0f172a;
  border: 1px solid rgba(0,0,0,.05);
}

.jugaChatMsg.isUser{
  margin-left: auto;
  background: #2563eb;
  color: #fff;
}

.jugaChatChips{
  display:flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid rgba(0,0,0,.06);
  background: #fff;
}

.jugaChatChip{
  border: 1px solid rgba(0,0,0,.08);
  background: #fff;
  border-radius: 999px;
  padding: 7px 10px;
  font-size: 12px;
  font-weight: 800;
  cursor:pointer;
}

.jugaChatInputRow{
  display:flex;
  gap: 8px;
  padding: 10px 12px 12px;
  border-top: 1px solid rgba(0,0,0,.06);
  background: #fff;
}

.jugaChatInput{
  flex:1;
  border: 1px solid rgba(0,0,0,.10);
  border-radius: 12px;
  padding: 10px 12px;
  outline: none;
  font-size: 13px;
}

.jugaChatSend{
  width: 42px;
  border: none;
  border-radius: 12px;
  background: #0f172a;
  color:#fff;
  font-weight: 900;
  cursor:pointer;
}
`;
