

import Testimonials from "./components/Testimonials";
const reviews = [
  { name: 'Laura García', text: 'El millor lloc per celebrar l\'aniversari de la meua filla. Les monitores són encantadores i el pastís estava boníssim.', rating: 5 },
  { name: 'Marc Soler', text: 'Instal·lacions molt netes i segures. El millor és que pots prendre alguna cosa mentre veus als nens jugar.', rating: 5 },
  // Fixed unescaped single quote in 'anar-se\'n'
  { name: 'Sara Montiel', text: 'El meu fill no volia anar-se\'n de la piscina de boles. Vam celebrar el cumple VIP i va meréixer molt la pena.', rating: 5 },
];

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-12">Què diuen de nosaltres?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-md border-t-4 border-yellow-400">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, star) => (
                <span key={star} className={`text-xl ${star < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
              ))}
            </div>
            <p className="text-gray-600 italic mb-6">"{review.text}"</p>
            <h4 className="font-bold text-gray-800 text-lg">— {review.name}</h4>
          </div>
        ))}
      </div>
      </div>
  );
};

export default Testimonials;
