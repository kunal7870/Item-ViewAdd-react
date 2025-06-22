import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 shadow px-6 py-3 sticky top-0 z-10">
  <div className="max-w-6xl mx-auto flex justify-between items-center">
    <Link to="/" className="text-xl font-extrabold text-white tracking-wide drop-shadow">Item Manager</Link>
    <div className="flex gap-4">
      <Link
        to="/view"
        className={`px-4 py-2 rounded text-sm font-medium transition ${
          location.pathname === '/view'
            ? 'bg-white text-red-600 shadow'
            : 'text-white hover:bg-white hover:text-red-600'
        }`}
      >
        Items
      </Link>
      <Link
        to="/add"
        className={`px-4 py-2 rounded text-sm font-medium transition ${
          location.pathname === '/add'
            ? 'bg-white text-red-600 shadow'
            : 'text-white hover:bg-white hover:text-red-600'
        }`}
      >
        Add Item
      </Link>
    </div>
  </div>
</nav>

  );
}
