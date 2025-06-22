import React, { useState } from 'react';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImageUrl: '',
    coverImageFile: null,
    additionalImageUrls: '',
    additionalImageFiles: [],
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'coverImageFile') {
      setFormData({ ...formData, coverImageFile: files[0] });
    } else if (name === 'additionalImageFiles') {
      setFormData({ ...formData, additionalImageFiles: Array.from(files) });
    }
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverImage = formData.coverImageUrl;

    // If file is selected, convert to base64
    if (formData.coverImageFile) {
      coverImage = await fileToBase64(formData.coverImageFile);
    }

    const additionalImageFiles = await Promise.all(
      formData.additionalImageFiles.map(file => fileToBase64(file))
    );

    const additionalImageUrls = formData.additionalImageUrls
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean);

    const newItem = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      description: formData.description,
      coverImage,
      additionalImages: [...additionalImageFiles, ...additionalImageUrls],
    };

    const existing = JSON.parse(localStorage.getItem('items') || '[]');
    localStorage.setItem('items', JSON.stringify([...existing, newItem]));

    setSuccess(true);
    setFormData({
      name: '',
      type: '',
      description: '',
      coverImageUrl: '',
      coverImageFile: null,
      additionalImageUrls: '',
      additionalImageFiles: [],
    });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-gray-900 to-gray-700 p-6">
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/80 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
        {success && <p className="text-green-600 mb-4">Item successfully added!</p>}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="type"
            placeholder="Item Type (e.g. Shirt)"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            placeholder="Item Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Cover Image */}
          <label className="block font-semibold">Cover Image (URL or Upload)</label>
          <input
            type="text"
            name="coverImageUrl"
            placeholder="Cover Image URL"
            value={formData.coverImageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            name="coverImageFile"
            accept="image/*"
            className="w-full"
            onChange={handleFileChange}
          />

          {/* Additional Images */}
          <label className="block font-semibold">Additional Images (URLs or Upload)</label>
          <input
            type="text"
            name="additionalImageUrls"
            placeholder="Additional Image URLs (comma separated)"
            value={formData.additionalImageUrls}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            name="additionalImageFiles"
            accept="image/*"
            multiple
            className="w-full"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            className="mx-auto block bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold px-4 py-2 rounded shadow hover:scale-105 transition"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
