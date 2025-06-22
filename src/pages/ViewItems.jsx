import { useEffect, useState } from 'react';
import ItemModal from '../components/ItemModal';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ViewItems() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('items') || '[]');
    setItems(stored);
  }, []);

  return (

    <div className="w-full mx-auto p-6 min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 to-gray-500 ">
      <h2 className="text-2xl text-white font-bold mb-6 text-center">Items Available</h2>
      {items.length === 0 ? (
        <p className="text-gray-600 text-center">No items found !</p>
      ) : (
        <div className="flex flex-wrap gap-5 justify-center ">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-white p-2 rounded shadow w-96 cursor-pointer hover:shadow-xl transform hover:scale-105 transition duration-300"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.coverImage} alt={item.name} className="w-full h-40 object-cover mb-3 rounded" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.type}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal popup for item details */}
      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}
