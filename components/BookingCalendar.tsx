
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
  const PHONE_NUMBER = "34669106393";
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/1508WnsK-OIkXKnjLhs9O5vr3jDELT6lbR2Sj3Jp25lo/export?format=csv&gid=0";

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    kids: '15',
    notes: '',
    rentalType: '80', 
    cleaning: false // Se mantiene en false ya que no es seleccionable en el flujo de pago
  });

  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    cardName: ''
  });

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const rentalOptions = [
    { label: "Lunes a Jueves (80€)", value: "80" },
    { label: "Viernes / Víspera de festivo (150€)", value: "150" },
    { label: "Sábado, domingo y festivos (15:00-22:00) (150€)", value: "150_PM" },
    { label: "Sábado, domingo y festivos (10:00-22:00) (200€)", value: "200" },
  ];

  const basePrice = parseFloat(formData.rentalType.split('_')[0]);
  // La limpieza ahora es "A consultar", por lo que no se suma al total de la pasarela de pago
  const cleaningPrice = 0; 
  const totalPrice = basePrice + cleaningPrice;
  const depositToPay = totalPrice / 2;

  const getToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };
  
  const businessMinDate = new Date(2026, 0, 20);
  businessMinDate.setHours(0, 0, 0, 0);

  async function loadDates() {
    try {
      const res = await fetch(`${SHEET_URL}&t=${Date.now()}`, { cache: "no-store" });
      const csv = await res.text();
      const csvRows = csv.split('\n').map(r => r.split(','));
      
      if (csvRows.length < 2) return;

      const header = csvRows[0].map(h => h.trim().toLowerCase());
      const dateIdx = header.indexOf("date") !== -1 ? header.indexOf("date") : 0;
      const statusIdx = header.indexOf("status") !== -1 ? header.indexOf("status") : 2;

      const rows = csvRows.slice(1).map(row => ({
        date: (row[dateIdx] || "").trim(),
        status: (row[statusIdx] || "").trim().toUpperCase()
      }));

      // FILTRO SOLICITADO: reservedDates = rows.filter(r => r.status === 'RESERVADO').map(r => r.date)
      const reservedDates = rows.filter(r => r.status === 'RESERVADO').map(r => r.date);

      setBookedDates(new Set(reservedDates));
    } catch (e) {
      console.error("Error al cargar fechas:", e);
    }
  }

  useEffect(() => { loadDates(); }, []);

  useEffect(() => {
    if (selectedISO && formRef.current) {
      const timer = setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedISO]);

  const handleDateClick = (d: number, isPast: boolean, isBooked: boolean, iso: string) => {
    if (isPast || isBooked) return;
    setSelectedDate(`${d} de ${months[month]} 2026`);
    setSelectedISO(iso);
    setSubmitted(false);
    setPaymentStep(false);
  };

  const handleFinalPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const WEB_APP_ENDPOINT = "https://script.google.com/macros/s/AKfycbz_DOb29XxVv8HJXy5uaog4WEBUomPg23QNL4vbyVFGedI20nj-4BpI5MlvaNFVZTgBhA/exec";
    const body = new URLSearchParams({
      action: "new",
      date: selectedISO || "",
      status: "RESERVADO", 
      name: formData.name,
      phone: formData.phone,
      notes: `WEB_RESERVA | Pago Tarjeta (${depositToPay}€) | ${formData.rentalType} | Limpieza: A CONSULTAR | Fianza: ${SECURITY_DEPOSIT}€`,
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

      const waMsg = `¡Hola! He reservado el día ${selectedDate}.\n👤: ${formData.name}\n💰 Pago Reserva (50%): ${depositToPay}€\n🏦 Cuenta: ${BANK_ACCOUNT}\n⚠️ Recordatorio: Fianza de ${SECURITY_DEPOSIT}€ en efectivo y Limpieza (60€) a consultar.`;
      window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(waMsg)}`, "_blank");
    } catch (err) {
      alert("Error al registrar la reserva. Contacta por WhatsApp.");
      setIsSubmitting(false);
    }
  };

  const formatCardNumber = (value: string) => value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
  const formatExpiry = (value: string) => value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').trim().substring(0, 5);

  const daysArr = Array.from({ length: new Date(2026, month + 1, 0).getDate() }, (_, i) => i + 1);
  const firstDay = new Date(2026, month, 1).getDay();
  const blanks = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, (_, i) => i);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 font-['Quicksand']">
      <div className="relative mb-20 text-center">
        <div className="inline-block px-8 py-3 bg-blue-600 rounded-full text-white font-black text-sm uppercase mb-6 shadow-xl animate-bounce">
          Calendario Algemesí 2026
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-blue-700 mb-6 font-['Baloo_2'] tracking-tighter">
          Reserva tu <span className="text-orange-500">Fiesta</span>
        </h2>
        <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-bold italic bg-white/40 backdrop-blur-sm p-6 rounded-[30px] border border-white/60">
          Las fechas en <span className="text-green-600 font-black">VERDE</span> ya están <span className="text-green-600 font-black">RESERVADAS</span> y bloqueadas automáticamente.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Calendario */}
        <div className="w-full lg:w-5/12 bg-white rounded-[50px] shadow-2xl p-10 border border-blue-50 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <button onClick={() => setMonth(m => Math.max(0, m - 1))} className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-xl disabled:opacity-20" disabled={month === 0}>◀</button>
            <h3 className="text-2xl font-black text-gray-800 uppercase font-['Baloo_2']">{months[month]} 2026</h3>
            <button onClick={() => setMonth(m => Math.min(11, m + 1))} className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-xl disabled:opacity-20" disabled={month === 11}>▶</button>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'].map(d => (
              <div key={d} className="text-center font-black text-blue-300 text-[12px] py-2">{d}</div>
            ))}
            {blanks.map(b => <div key={`b-${b}`} className="h-12 md:h-14"></div>)}
            {daysArr.map(d => {
              const checkDate = new Date(2026, month, d);
              checkDate.setHours(0, 0, 0, 0);
              const today = getToday();
              const isPast = checkDate < today || checkDate < businessMinDate;
              const iso = `2026-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
              
              const isBooked = bookedDates.has(iso);
              const isSelected = selectedISO === iso;
              
              return (
                <button
                  key={d}
                  disabled={isPast || isBooked}
                  onClick={() => handleDateClick(d, isPast, isBooked, iso)}
                  className={`h-12 md:h-14 rounded-2xl flex flex-col items-center justify-center text-lg font-black transition-all transform relative
                    ${isPast ? 'bg-gray-50 text-gray-200 cursor-not-allowed' :
                      isBooked ? 'bg-green-600 text-white shadow-lg border-2 border-green-700 cursor-not-allowed scale-95' :
                      isSelected ? 'bg-blue-600 text-white shadow-xl scale-110 z-10 ring-4 ring-blue-100' : 
                      'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-100 hover:scale-105'}
                  `}
                >
                  {d}
                  {isBooked && <span className="absolute bottom-1 text-[6px] font-black uppercase text-white/80">RESERVADO</span>}
                </button>
              );
            })}
          </div>
          
          <div className="mt-10 flex flex-wrap gap-4 text-[11px] font-black uppercase">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-full"><span className="w-2 h-2 bg-white rounded-full"></span> RESERVADO</div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full"><span className="w-2 h-2 bg-white rounded-full"></span> Selección</div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-400 rounded-full border border-gray-200">Libre</div>
          </div>
        </div>

        {/* Formulario */}
        <div ref={formRef} className="w-full lg:w-7/12 min-h-[500px]">
          {!selectedDate ? (
            <div className="h-full bg-blue-50/30 rounded-[50px] border-4 border-dashed border-blue-200 flex flex-col items-center justify-center p-12 text-center">
              <div className="text-6xl mb-8 animate-bounce">🎈</div>
              <h3 className="text-3xl font-black text-blue-400 uppercase font-['Baloo_2']">¿Cuándo es el cumple?</h3>
              <p className="text-gray-400 mt-4 font-bold text-lg">Elige un día disponible en el calendario para comenzar.</p>
            </div>
          ) : submitted ? (
            <div className="bg-white rounded-[50px] shadow-2xl p-12 border-4 border-green-500 text-center animate-[zoomIn_0.3s_ease-out]">
              <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-5xl mx-auto mb-10 shadow-xl">✓</div>
              <h4 className="text-5xl font-black text-gray-800 mb-6 font-['Baloo_2']">¡RESERVADO!</h4>
              <p className="text-gray-500 mb-8 font-bold text-xl leading-relaxed">
                Tu fecha <span className="text-green-600">{selectedDate}</span> ya está marcada en <span className="text-green-600">VERDE</span> fijo.
              </p>
              <button 
                onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}`, "_blank")}
                className="bg-[#25D366] text-white px-10 py-5 rounded-[25px] font-black text-xl hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3 mx-auto"
              >
                ENVIAR JUSTIFICANTE POR WHATSAPP 📄
              </button>
            </div>
          ) : !paymentStep ? (
            <div className="bg-white rounded-[50px] shadow-2xl p-10 border-4 border-blue-600 animate-[fadeInRight_0.4s_ease-out]">
              <form onSubmit={(e) => {e.preventDefault(); setPaymentStep(true);}} className="space-y-8">
                <div className="bg-blue-600 p-6 rounded-[30px] text-white flex justify-between items-center shadow-lg">
                  <div>
                    <h3 className="text-3xl font-black font-['Baloo_2']">Datos del Evento</h3>
                    <p className="text-blue-100 font-bold uppercase tracking-widest">{selectedDate}</p>
                  </div>
                  <span className="text-4xl animate-pulse">🎉</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-2">Responsable de la Fiesta</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none font-black text-lg focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Nombre completo" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-2">WhatsApp de Contacto</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none font-black text-lg focus:ring-2 focus:ring-blue-600 transition-all" placeholder="6XX XXX XXX" />
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100">
                  <p className="font-black text-blue-600 uppercase mb-6 tracking-widest text-sm">Configuración del Alquiler</p>
                  <div className="space-y-3 mb-8">
                    {rentalOptions.map(opt => (
                      <label key={opt.value} className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.rentalType === opt.value ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200'}`}>
                        <input type="radio" name="rentalType" value={opt.value} checked={formData.rentalType === opt.value} onChange={() => setFormData({...formData, rentalType: opt.value})} className="hidden" />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.rentalType === opt.value ? 'border-white' : 'border-gray-300'}`}>
                          {formData.rentalType === opt.value && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                        </div>
                        <span className="font-black text-lg">{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* SECCIÓN SERVICIO DE LIMPIEZA - AHORA SOLO INFORMATIVA */}
                  <div className="p-6 rounded-3xl border-2 border-blue-100 bg-white flex items-center justify-between group cursor-default opacity-80">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl bg-blue-50">
                        🧼
                      </div>
                      <div>
                        <p className="font-black text-lg text-gray-800">SERVICIO DE LIMPIEZA</p>
                        <p className="text-xs font-black text-orange-500 uppercase tracking-tighter">60€ - A consultar con el local</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-gray-50">
                         <span className="text-gray-300 font-black text-xs">?</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 p-8 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                   <div className="text-center md:text-left">
                     <p className="text-xs font-black text-blue-200 uppercase tracking-widest mb-1">Pago Reserva hoy (50%)</p>
                     <p className="text-5xl font-black tracking-tighter">{depositToPay.toFixed(2)}€</p>
                   </div>
                   <button className="w-full md:w-auto bg-white text-blue-600 px-12 py-5 rounded-[25px] font-black text-xl hover:bg-blue-50 shadow-xl transform active:scale-95 transition-all">
                    SIGUIENTE PASO 🚀
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-[50px] shadow-2xl p-10 border border-gray-100 animate-[fadeInRight_0.4s_ease-out]">
               <div className="flex justify-between items-center mb-8">
                 <button onClick={() => setPaymentStep(false)} className="text-blue-600 font-black hover:underline flex items-center gap-2">← MODIFICAR</button>
                 <h4 className="text-3xl font-black text-gray-800 font-['Baloo_2'] uppercase tracking-tight">Pago Seguro</h4>
               </div>
               
               <div className="mb-10 p-8 bg-blue-50 rounded-[40px] border border-blue-100 shadow-inner">
                 <h5 className="text-xs font-black text-blue-400 uppercase mb-4 tracking-widest">Resumen de tu selección</h5>
                 <div className="space-y-2 text-gray-700 font-bold">
                    <p className="flex justify-between"><span>Alquiler Base:</span> <span>{basePrice}€</span></p>
                    <p className="flex justify-between text-gray-400 italic text-sm"><span>Servicio Limpieza:</span> <span>A consultar</span></p>
                    <div className="h-px bg-blue-200 my-4"></div>
                    <p className="flex justify-between text-xl text-gray-800 font-black"><span>Total Alquiler:</span> <span>{totalPrice}€</span></p>
                    <p className="flex justify-between text-blue-600 text-3xl font-black pt-2"><span>PAGO RESERVA:</span> <span>{depositToPay.toFixed(2)}€</span></p>
                    <div className="bg-white/80 p-5 rounded-2xl mt-6 border border-blue-200 text-xs text-gray-500 leading-relaxed shadow-sm">
                       <p className="text-blue-800 font-black mb-1">📋 INFORMACIÓN ADICIONAL:</p>
                       <p>• La fianza de <strong>{SECURITY_DEPOSIT}€</strong> se abona en efectivo el día del evento.</p>
                       <p>• El servicio de limpieza de <strong>60€</strong> debe solicitarse aparte.</p>
                       <p>• Al confirmar, enviaremos los datos a la hoja de cálculo como <strong>RESERVADO</strong>.</p>
                    </div>
                 </div>
               </div>

               <form onSubmit={handleFinalPayment} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">Número de Tarjeta</label>
                    <input required type="text" value={cardData.number} onChange={e => setCardData({...cardData, number: formatCardNumber(e.target.value)})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-mono text-lg focus:ring-2 focus:ring-blue-600 outline-none transition-all shadow-inner" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">MM / AA</label>
                      <input required type="text" value={cardData.expiry} onChange={e => setCardData({...cardData, expiry: formatExpiry(e.target.value)})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-mono focus:ring-2 focus:ring-blue-600 outline-none shadow-inner" placeholder="12 / 26" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">CVV</label>
                      <input required type="text" maxLength={3} value={cardData.cvc} onChange={e => setCardData({...cardData, cvc: e.target.value.replace(/\D/g, '')})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-mono focus:ring-2 focus:ring-blue-600 outline-none shadow-inner" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">Titular</label>
                    <input required type="text" value={cardData.cardName} onChange={e => setCardData({...cardData, cardName: e.target.value.toUpperCase()})} className="w-full px-5 py-4 bg-gray-50 rounded-2xl font-black uppercase focus:ring-2 focus:ring-blue-600 outline-none shadow-inner" placeholder="NOMBRE EN TARJETA" />
                  </div>
                  
                  <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-6 rounded-[25px] font-black text-2xl hover:bg-blue-700 disabled:opacity-50 shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-4 mt-4">
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        CONFIRMANDO...
                      </>
                    ) : `CONFIRMAR RESERVA 🥳`}
                  </button>
               </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
