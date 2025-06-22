import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ItemModal({ item, onClose }) {
  const { name, type, description, coverImage, additionalImages } = item;

  return (
    <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-xl p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-3 right-4 text-lg text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-sm text-gray-500 mb-4">Type : {type}</p>
        <p className="text-gray-700 mb-4">{description}</p>

        {/*carousal */}
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
          {[coverImage, ...additionalImages].map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`Image ${idx + 1}`}
                className="h-72 object-contain mx-auto rounded"
              />
            </div>
          ))}
        </Carousel>

        <button
          className="mt-6 text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => alert('Enquiry sent!')}
        >
          Enquire
        </button>
      </div>
    </div>
  );
}
