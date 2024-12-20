import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import apiClient from '../../config/axiosConfig'; // Assuming you have the axios config
import toast from 'react-hot-toast';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    image: '', // Use a URL string for the image
    expected_quantity: '',
    expected_produce_month: '',
    description: '',
  });

  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    try {
      // Create a FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('expected_quantity', formData.expected_quantity);
      formDataToSend.append('expected_produce_month', formData.expected_produce_month);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image); // Just append the URL string for image

      console.log(formData);

      // Send the request
      const res = await apiClient.post('/products', formDataToSend);
      console.log(res);

      if (res.status !== 200) {
        throw new Error(`Failed to add product: ${res.statusText}`);
      }

      const data = res.data;
      console.log('Product added successfully:', data);

      // Reset the form on successful submission
      setFormData({
        name: '',
        price: '',
        location: '',
        image: '', // Reset the image URL input
        expected_quantity: '',
        expected_produce_month: '',
        description: '',
      });
      toast.success('Product added successfully!');
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.message || 'Something went wrong!');
    }
  };

  return (
    <div className="grid grid-cols-[1fr_3fr]">
      <div>
        <Sidebar />
      </div>

      <div className="p-5">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">পণ্যে যোগ করুন</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block font-medium">
                পণ্যের নাম
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="পণ্যের নাম লিখুন"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Product Price */}
            <div>
              <label htmlFor="price" className="block font-medium">
                মূল্য
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="মূল্য লিখুন"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Product Location */}
            <div>
              <label htmlFor="location" className="block font-medium">
                অবস্থান
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="অবস্থান লিখুন"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Expected Quantity */}
            <div>
              <label htmlFor="expected_quantity" className="block font-medium">
                প্রত্যাশিত পরিমাণ
              </label>
              <input
                type="number"
                id="expected_quantity"
                name="expected_quantity"
                value={formData.expected_quantity}
                onChange={handleChange}
                placeholder="প্রত্যাশিত পরিমাণ লিখুন"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Expected Produce Month */}
            <div>
              <label htmlFor="expected_produce_month" className="block font-medium">
                প্রত্যাশিত উৎপাদন মাস
              </label>
              <input
                type="month"
                id="expected_produce_month"
                name="expected_produce_month"
                value={formData.expected_produce_month}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Product Description */}
            <div>
              <label htmlFor="description" className="block font-medium">
                বর্ণনা
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="পণ্যের বর্ণনা লিখুন"
                className="textarea textarea-bordered w-full"
                required
              />
            </div>

            {/* Product Image URL */}
            <div>
              <label htmlFor="image" className="block font-medium">
                পণ্যের ছবি URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="ছবির URL লিখুন"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              পণ্য যোগ করুন
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
