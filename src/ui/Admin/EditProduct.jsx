import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import toast from 'react-hot-toast';

function EditProduct({ product, onProductUpdated, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    imageFile: null,
    description: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        imageFile: null,
        description: product.description || ''
      });
      setImagePreview(product.image);
    }
  }, [product]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, imageFile: file });
    }
  };

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('products')
      .upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      toast.error(`Image upload failed: ${error.message}`);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from('products')
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Please fill required fields');
      return;
    }

    setLoading(true);

    let imageUrl = product.image;
    if (formData.imageFile) {
      imageUrl = await uploadImage(formData.imageFile);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.from('products')
      .update({
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        image: imageUrl,
        description: formData.description
      })
      .eq('id', product.id);

    if (error) {
      console.error('Update error:', error);
      toast.error(`Failed to update product: ${error.message}`);
    } else {
      toast.success('Product updated successfully');
      onProductUpdated();
      onClose();
    }
    setLoading(false);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              type="text" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleInputChange} 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
              <option value="books">Books</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦) *</label>
            <input 
              name="price" 
              value={formData.price} 
              onChange={handleInputChange} 
              type="number" 
              min="0"
              step="0.01"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
            />
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              rows="4" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
              placeholder="Enter product description..."
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              disabled={loading} 
              className="flex-1 bg-[#FF496C] text-white px-4 py-2 rounded-lg hover:bg-[#e63d5e] transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
            <button 
              type="button"
              onClick={onClose} 
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;