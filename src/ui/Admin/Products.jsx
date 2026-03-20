import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { supabase } from '../../supabase';
import toast from 'react-hot-toast';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ProductList from './ProductList';

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to fetch products');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setLoading(true);
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete product');
    } else {
      toast.success('Product deleted successfully');
      fetchProducts();
    }
    setLoading(false);
  };

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#FF496C] text-white px-4 py-2 rounded-lg hover:bg-[#e63d5e] transition"
        >
          <MdAdd className="text-xl" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-96">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF496C]"
        />
      </div>

      {/* Products List */}
      <ProductList 
        products={filteredProducts}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProduct 
          onProductAdded={fetchProducts}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <EditProduct 
          product={editingProduct}
          onProductUpdated={fetchProducts}
          onClose={() => {
            setShowEditModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default Products;


