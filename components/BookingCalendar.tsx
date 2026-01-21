
import React, { useState, useEffect, useRef } from 'react';

const BookingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedISO, setSelectedISO] = useState<string | null>(null);
  const [month, setMonth] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLDivElement>(null);

  const BANK_ACCOUNT = "ES37 0081 5416 3200 0166 1868";
  const CLEANING_FEE = 60;
  const SECURITY_DEPOSIT = 100;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    kids: '15',
    notes: '',
    rentalType: '80', 
    cleaning: false
  });

  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    cardName: ''
  });

  const months = [
    "Gener", "Febrer", "Març", "Abril", "Maig", "Juny",
    "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
  ];

  const rentalOptions = [
    { label: "Dilluns a Dijous (80€)", value: "80" },
    { label: "Divendres / Vespre de festiu (150€)", value: "150" },
    { label: "Dissabte, diumenge i festius (15:00-22:00) (150€)", value: "150_PM" },
    { label: "Dissabte, diumenge i festius (10:00-22:00) (200€)", value: "200" },
  ];

  const basePrice = parseFloat(formData.rentalType.split('_')[0]);
  const cleaningPrice = formData.cleaning ? CLEANING_FEE : 0;
  const totalPrice = basePrice + cleaningPrice;
  const depositToPay = totalPrice / 2;

  const getToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };
  
  const businessMinDate = new Date(2026, 0, 20);
  businessMinDate.setHours(0, 0, 0, 0);

  async function getBookedRows() {
    const url = `https://docs.google.com/spreadsheets/d/1508WnsK-OIkXKnjLhs9O5vr3jDELT6lbR2Sj3Jp25lo/export?format=csv&gid=0&t=${Date.now()}`;
    try {
      const res = await fetch(url, { cache: "no-store" });
      const csv = await res.text();
      const rows = csv.split('\n').map(r => r.split(','));
      if (rows.length < 2) return [];
      const header = rows[0].map(h => h.trim().toLowerCase());
      const iDate = header.indexOf("date");
      const iStatus = header.indexOf("status");
      const booked = [];
      for (let r = 1; r < rows.length; r++) {
        const status = (rows[r][iStatus] || "").trim().toUpperCase();
        if (status === "RESERVADO" || status === "RESERVAT") booked.push({ date: rows[r][iDate].trim() });
      }
      return booked;
    } catch (e) { return []; }
  }

  async function loadDates() {
    const rows = await getBookedRows();
    setBookedDates(new Set(rows.map(r => r.date)));
  }

  useEffect(() => { loadDates(); }, []);

  const handleDateClick = (d: number, isPast: boolean, isBooked: boolean, iso: string) => {
    if (isPast || isBooked) return;
    setSelectedDate(`${d} ${months[month]} 2026`);
    setSelectedISO(iso);
    setSubmitted(false);
    setPaymentStep(false);
  };

  const handleFinalPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulem el procés de pagament bancari
    await new Promise(resolve => setTimeout(resolve, 3000));

    const WEB_APP_ENDPOINT = "https://script.google.com/macros/s/AKfycbz_DOb29XxVv8HJXy5uaog4WEBUomPg23QNL4vbyVFGedI20nj-4BpI5MlvaNFVZTgBhA/exec";
    const body = new URLSearchParams({
      action: "new",
      date: selectedISO || "",
      name: formData.name,
      phone: formData.phone,
      notes: `TARIFES_REALS | Pagament: Targeta (${depositToPay}€) | Tipus: ${formData.rentalType} | Neteja: ${formData.cleaning ? 'SI' : 'NO'} | Pendent resta a ${BANK_ACCOUNT} | Fiança 100€ pendent entrega claus`,
      kids: formData.kids,
      formatted_date: selectedDate || "",
    }).toString();

    try {
      await fetch(WEB_APP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body,
      });
      setBookedDates(prev => new Set([...prev, selectedISO!]));
      setSubmitted(true);
      setIsSubmitting(false);
      const waMsg = `✅ RESERVA CONFIRMADA!\n📅 Data: ${selectedDate}\n👤 Nom: ${formData.name}\n💳 Pagament reserva realitzat: ${depositToPay}€\n🧹 Neteja: ${formData.cleaning ? 'SÍ' : 'NO'}\n🔑 Fiança pendent: ${SECURITY_DEPOSIT}€ (efectiu)\n🏦 Restant pendent a: ${BANK_ACCOUNT}`;
      window.open(`https://wa.me/34699106393?text=${encodeURIComponent(waMsg)}`, "_blank");
    } catch (err) {
      alert("Error en registrar el pagament. Contacta per WhatsApp.");
      setIsSubmitting(false);
    }
  };

  const formatCardNumber = (value: string) => value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
  const formatExpiry = (value: string) => value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').trim().substring(0, 5);

  const daysArr = Array.from({ length: new Date(2026, month + 1, 0).getDate() }, (_, i) => i + 1);
  const firstDay = new Date(2026, month, 1).getDay();
  const blanks = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, (_, i) => i);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-['Quicksand']">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-blue-600 mb-4 font-['Baloo_2']">Reserva el teu Espai 2026</h2>
        <div className="w-24 h-2 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full mb-6"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">Tria el dia de la teua celebració al calendari i reserva amb un 50% d'import.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Calendari */}
        <div className="w-full lg:w-5/12 bg-white rounded-[40px] shadow-2xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <button onClick={() => setMonth(m => Math.max(0, m - 1))} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-blue-100 transition-all text-xl disabled:opacity-20" disabled={month === 0}>◀</button>
            <h3 className="text-xl font-black text-gray-800 uppercase tracking-widest font-['Baloo_2']">{months[month]} 2026</h3>
            <button onClick={() => setMonth(m => Math.min(11, m + 1))} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-blue-100 transition-all text-xl disabled:opacity-20" disabled={month === 11}>▶</button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['DL', 'DT', 'DC', 'DJ', 'DV', 'DS', 'DG'].map(d => (
              <div key={d} className="text-center font-bold text-gray-400 text-[10px] py-1">{d}</div>
            ))}
            {blanks.map(b => <div key={`b-${b}`} className="h-10 md:h-12"></div>)}
            {daysArr.map(d => {
              const checkDate = new Date(2026, month, d);
              checkDate.setHours(0, 0, 0, 0);
              const today = getToday();
              const isPast = checkDate < today || checkDate < businessMinDate;
              const iso = `2026-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
              const isBooked = bookedDates.has(iso);
              const isSelected = selectedISO === iso;
              return (
                <button key={d} disabled={isPast || (isBooked && !isSelected)} onClick={() => handleDateClick(d, isPast, isBooked, iso)} className={`h-10 md:h-12 rounded-lg flex flex-col items-center justify-center text-base font-bold transition-all transform relative ${isPast ? 'bg-gray-100 text-gray-300 opacity-50 cursor-not-allowed' : isBooked ? 'bg-green-500 text-white shadow-inner opacity-90' : isSelected ? 'bg-blue-600 text-white shadow-lg scale-110 z-10 ring-2 ring-blue-100' : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-transparent'}`}>
                  {d}
                  {isBooked && <span className="absolute bottom-0.5 text-[6px] font-black uppercase opacity-70">Ocupat</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Formulari / Passarel·la */}
        <div ref={formRef} className="w-full lg:w-7/12">
          {!selectedDate ? (
            <div className="h-full min-h-[450px] bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-500">🎈</div>
              <h3 className="text-xl font-black text-gray-400 uppercase font-['Baloo_2']">Tria una data al calendari</h3>
              <p className="text-gray-400 mt-4 font-bold text-sm">Selecciona el dia de la teua festa per veure disponibilitat i preus.</p>
            </div>
          ) : submitted ? (
            <div className="bg-white rounded-[40px] shadow-2xl p-10 border-4 border-green-500 text-center animate-[zoomIn_0.3s_ease-out]">
              <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-xl animate-bounce">✓</div>
              <h4 className="text-4xl font-black text-gray-800 mb-4 font-['Baloo_2']">¡Reserva Completada!</h4>
              <p className="text-gray-500 mb-6 font-medium text-lg leading-relaxed">
                El pagament del 50% ({depositToPay}€) s'ha registrat correctament.
              </p>
              <div className="bg-blue-50 p-6 rounded-3xl mb-8 border-2 border-blue-100 text-left">
                <p className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-widest">Informació pendent</p>
                <ul className="text-sm font-bold text-gray-700 space-y-2">
                  <li>• Restant 50% al compte: {BANK_ACCOUNT}</li>
                  <li>• Fiança de {SECURITY_DEPOSIT}€ en efectiu el dia de l'esdeveniment.</li>
                </ul>
              </div>
              <button onClick={() => {setSubmitted(false); setPaymentStep(false); setSelectedDate(null); setSelectedISO(null);}} className="bg-gray-100 text-gray-600 px-10 py-4 rounded-3xl font-bold hover:bg-gray-200 transition-all">Tornar al calendari</button>
            </div>
          ) : !paymentStep ? (
            <div className="bg-white rounded-[40px] shadow-2xl p-8 border-4 border-blue-500 animate-[fadeInRight_0.4s_ease-out]">
              <form onSubmit={() => setPaymentStep(true)} className="space-y-6">
                <div className="flex items-center justify-between mb-4 bg-blue-50 p-4 rounded-2xl">
                  <h3 className="text-2xl font-black text-blue-600 font-['Baloo_2'] leading-none">Configura la Reserva</h3>
                  <span className="bg-white text-blue-600 px-4 py-2 rounded-xl font-black text-sm shadow-sm border border-blue-100">{selectedDate}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Nom Responsable</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none" placeholder="Joan E." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Telèfon WhatsApp</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none" placeholder="6XX XXX XXX" />
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-4 tracking-widest">Tipus de Lloguer</label>
                  <div className="grid grid-cols-1 gap-2">
                    {rentalOptions.map(opt => (
                      <label key={opt.value} className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.rentalType === opt.value ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-100 text-gray-600'}`}>
                        <input type="radio" name="rentalType" value={opt.value} checked={formData.rentalType === opt.value} onChange={() => setFormData({...formData, rentalType: opt.value})} className="hidden" />
                        <span className="font-bold text-sm">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-gray-100 cursor-pointer" onClick={() => setFormData({...formData, cleaning: !formData.cleaning})}>
                    <input type="checkbox" checked={formData.cleaning} readOnly className="w-5 h-5 rounded accent-blue-600" />
                    <label className="font-bold text-gray-700 text-sm cursor-pointer">Servei de Neteja opcional (+{CLEANING_FEE}€)</label>
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 bg-blue-600 text-white rounded-[30px] shadow-xl">
                  <div><p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Reserva ara (50%)</p><p className="text-4xl font-black">{depositToPay.toFixed(2)}€</p></div>
                  <button type="submit" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-lg">PAGAR AMB TARGETA →</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-[#f8f9fa] rounded-[40px] shadow-2xl overflow-hidden border border-gray-200 animate-[fadeInRight_0.4s_ease-out]">
              <div className="bg-white p-6 border-b border-gray-200 flex justify-between items-center">
                <button onClick={() => setPaymentStep(false)} className="text-gray-400 hover:text-blue-600">← Tornar</button>
                <div className="flex items-center gap-2"><div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs italic">S</div><span className="font-black text-gray-800 tracking-tight">Checkout Segur</span></div>
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2 space-y-6">
                    <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Resum Reserva</h4>
                    <p className="text-2xl font-black text-gray-800">{formData.name}<br/><span className="text-sm text-gray-400">{selectedDate}</span></p>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-4xl font-black text-blue-600">{depositToPay.toFixed(2)}€</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-4 uppercase">Resta de lloguer i fiança de {SECURITY_DEPOSIT}€ pendent per transferència o efectiu.</p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <form onSubmit={handleFinalPayment} className="space-y-4">
                      <input required type="text" value={cardData.number} onChange={e => setCardData({...cardData, number: formatCardNumber(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl outline-none font-mono tracking-widest" placeholder="4242 4242 4242 4242" />
                      <div className="grid grid-cols-2 gap-4">
                        <input required type="text" value={cardData.expiry} onChange={e => setCardData({...cardData, expiry: formatExpiry(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl outline-none font-mono" placeholder="MM / AA" />
                        <input required type="text" maxLength={3} value={cardData.cvc} onChange={e => setCardData({...cardData, cvc: e.target.value.replace(/\D/g, '')})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl outline-none font-mono" placeholder="CVC" />
                      </div>
                      <input required type="text" value={cardData.cardName} onChange={e => setCardData({...cardData, cardName: e.target.value.toUpperCase()})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-xl outline-none font-bold uppercase" placeholder="NOM TITULAR" />
                      <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg disabled:opacity-50">
                        {isSubmitting ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> PROCESSANT...</> : <>PAGAR {depositToPay.toFixed(2)}€ ARA</>}
                      </button>
                    </form>
                  </div>
                </div>
                <div className="mt-8 flex justify-center gap-4 opacity-50 grayscale">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
