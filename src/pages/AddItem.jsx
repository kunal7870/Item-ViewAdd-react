import React, { use } from 'react'
import { useState } from 'react'

const AddItem = () => {
    const [formData, setformData] = useState({
        name:'',
        type:'',
        description:'',
        coverImage:'',
        additionalImages:'',
    });

    const [success, setsuccess] = useState(false);
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setformData({...formData,[name]:value});
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      //store
      const existing = JSON.parse(localStorage.getItem('items') || '[]');
      const newItem = {...formData,id:Date.now(),additionalImages: formData.additionalImages.split(',')};
      existing.push(newItem);
      localStorage.setItem('items',JSON.stringify(existing));

      setsuccess(true);
      setformData({name:'',type:'',description:'',coverImage:'',additionalImages:''});
    }
    
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 to-gray-700 p-6">

    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/80 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
      {success && <p className="text-green-600 mb-4">Item successfully added!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="type" placeholder="Item Type (e.g. Shirt)" value={formData.type} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Item Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="coverImage" placeholder="Cover Image URL" value={formData.coverImage} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="additionalImages" placeholder="Additional Image URLs (comma separated)" value={formData.additionalImages} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="mx-auto block bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold px-4 py-2 rounded shadow hover:scale-105 transition">Add Item</button>
      </form>
    </div>
    </div>
  )
}

export default AddItem
