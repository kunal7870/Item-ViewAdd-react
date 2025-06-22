import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddItem from './pages/AddItem';
import ViewItems from './pages/ViewItems';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>  
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/view" element={<ViewItems />} />
        </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-gray-900 to-gray-500 text-center px-4">
      <h1 className="text-3xl text-white font-bold">Item Manager</h1>
      <div className="flex gap-4">
        <a href="/view" className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-950 text-white font-semibold rounded shadow hover:brightness-125 transition">View Items</a>
        <a href="/add" className="px-6 py-3 bg-gradient-to-r from-gray-950 to-gray-800 text-white font-semibold rounded shadow hover:brightness-125 transition">Add Item</a>
      </div>
    </div>
  );
}