import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AddToCartButton from '../../PrimaryComponent/AddToCartButton'
import {
  Star,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Heart
} from 'lucide-react'
import { shopProductsS } from '../../../Resources/ShopProducts'
import { newarrival } from '../../../Resources/Newarrival'
import { topsales } from '../../../Resources/TopSales'
import { featuredproducts } from '../../../Resources/FeaturedProducts'
import { handPicked } from '../../../Resources/Handpicked'

function ProductDetail() {
  const { source, id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('overview')

  if (!id || !source) {
    return <div className='text-center py-20'>Invalid product parameters</div>
  }

  // Get the correct product array based on source
  const getProductArray = (source) => {
    switch(source) {
      case 'shop': return shopProductsS
      case 'newarrival': return newarrival
      case 'topsales': return topsales
      case 'featured': return featuredproducts
      case 'handpicked': return handPicked
      default: return []
    }
  }

  const productArray = getProductArray(source)
  const product = productArray.find(item => item.id === parseInt(id))
  
  if (!product) {
    return <div className='text-center py-20'>Product not found</div>
  }



  return (
    <div className='bg-[#F5F5F5] min-h-screen px-4 py-10'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6'>
        {/* Product Details Section */}
        <div className='bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Images */}
          <div>
            <div className='h-[300px] md:h-[450px] w-full rounded-lg overflow-hidden'>
              <img
                src={product.image}
                alt='Product'
                className='h-full w-full rounded object-contain'
              />
            </div>
          </div>

          {/* Product Info */}
          <div className='space-y-4'>
            <h1 className='text-2xl md:text-2xl font-bold text-gray-900'>{product.description}</h1>
            <p className='font-medium text-sm text-gray-700'>Brand: <span className=' text-red-700'>Oma’s Lux</span></p>

            {/* Rating */}
            <div className='flex items-center gap-2'>
              <div className='flex text-yellow-400'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-4 h-4 fill-current' />
                ))}
              </div>
              <span className='text-gray-600 text-sm'>(128 reviews)</span>
            </div>

            {/* Price */}
            <div className='border-t border-gray-200 pt-4'>
              <span className='text-3xl font-bold text-gray-900'>₦{product.price}</span>
            </div>

            {/* Quantity */}
            <div className='border-t pt-4 border-gray-200 flex items-center gap-4 flex-wrap'>
              <h3 className='font-semibold'>Quantity</h3>
              <div className='flex items-center border border-gray-300 rounded'>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className='p-2'>
                  <Minus className='w-4 h-4' />
                </button>
                <span className='px-4 py-2'>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className='p-2'>
                  <Plus className='w-4 h-4' />
                </button>
              </div>
              <span className='text-red-600 text-sm'>In Stock</span>
            </div>

            {/* Actions */}
            <div className='flex gap-4 pt-4 flex-wrap'>
              <AddToCartButton 
                product={{...product, quantity}} 
                className='py-3 rounded-lg font-medium flex items-center justify-center gap-2' 
              />
              <button className='p-3 border border-gray-300 rounded-lg hover:bg-gray-100'>
                <Heart className='w-6 h-6' />
              </button>
            </div>

            {/* Additional Info */}
            <div className='border-t pt-6 border-gray-200 space-y-2 text-sm text-gray-700'>
              <div className='flex justify-between'>
                <span>Free shipping</span>
                <span className='font-medium'>On orders over $50</span>
              </div>
              <div className='flex justify-between'>
                <span>Return policy</span>
                <span className='font-medium'>30 days return</span>
              </div>
              <div className='flex justify-between'>
                <span>Delivery</span>
                <span className='font-medium'>2-3 business days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Card */}
        <div className='bg-white p-6 rounded-lg shadow space-y-6'>
          <div>
            <h2 className='font-bold border-b border-gray-200 pb-2'>Same Day Delivery Available in:</h2>
            <p className='mt-4 bg-[#FF496C] text-white text-sm font-semibold px-3 py-2 rounded-md w-fit'>
              Lagos
            </p>
            <p className='text-xs text-gray-500 mt-4'>
              *Orders placed before 2pm qualify.
              <br />
              *Terms and conditions apply.
            </p>
          </div>

          {/* Delivery Info */}
          <div className='flex items-start gap-3 border-t border-gray-200 pt-4'>
            <Truck className='text-pink-500 mt-1' size={25} />
            <div>
              <h3 className='font-semibold'>Delivery</h3>
              <p>Estimated: 1–9 business days</p>
              <p className='mt-2'><strong>Same Day:</strong> order before 11AM</p>
              <p><strong>Next Day:</strong> order after 3PM</p>
              <p className='text-xs mt-1 text-gray-500'>*May vary by location</p>
            </div>
          </div>

          {/* Return Info */}
          <div className='flex items-start gap-3'>
            <RotateCcw className='text-[#FF496C] mt-1' size={25} />
            <div>
              <h3 className='font-semibold'>Return Policy</h3>
              <p className='font-semibold'>7-Day Guarantee</p>
              <p className='text-sm'>
                Read our full policy at{' '}
                <a href='#' className='text-[#FF496C] underline font-medium'>
                  Oma’s Lux Return Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className='mt-8 max-w-7xl rounded bg-[white] mx-auto'>
        <div className='border-b border-gray-200'>
          <nav className='flex space-x-8 overflow-x-auto'>
            {['overview', 'description', 'warranty'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className='py-8 px-4 space-y-6'>
          {activeTab === 'overview' && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700'>
              <div>
                <h4 className='font-medium mb-3'>Key Features</h4>
                <ul className='space-y-2'>
                  <li>• 100% Premium Cotton</li>
                  <li>• Comfortable Regular Fit</li>
                  <li>• Pre-shrunk Fabric</li>
                  <li>• Machine Washable</li>
                  <li>• Sustainable Manufacturing</li>
                </ul>
              </div>
              <div>
                <h4 className='font-medium mb-3'>Specifications</h4>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span>Material:</span>
                    <span>100% Cotton</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Weight:</span>
                    <span>180 GSM</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Origin:</span>
                    <span>Made in USA</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Care:</span>
                    <span>Machine Wash Cold</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>SKU:</span>
                    <span>TSH-001</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'description' && (
            <div className='text-gray-700 space-y-4'>
              <h3 className='text-sm font-semibold'>Detailed Description</h3>
              <p>
                Our Premium Cotton T-Shirt offers the perfect blend of comfort, style, and sustainability.
                Made from 100% organic cotton, it’s soft, breathable, and designed for long-term wear.
              </p>
              <p>
                Pre-treated to reduce shrinkage, reinforced stitching, and tailored to a regular fit – this is a staple that lasts.
              </p>
              <h4 className='font-medium mt-4'>Care Instructions:</h4>
              <ul className='list-disc pl-5'>
                <li>Machine wash cold with like colors</li>
                <li>Use mild detergent, avoid bleach</li>
                <li>Tumble dry low or hang dry</li>
                <li>Iron on low if needed</li>
                <li>Do not dry clean</li>
              </ul>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className='text-gray-700 space-y-4'>
              <h3 className='text-sm font-semibold'>Warranty Information</h3>
              <p>
                We stand behind the quality of our t-shirts with a 6-month warranty covering manufacturing defects.
              </p>
              <p>
                30-day hassle-free return policy for unused items in original condition with tags attached.
              </p>
              <div className='bg-gray-100 p-4 rounded-lg'>
                <h4 className='font-medium mb-2'>Contact Us</h4>
                <p>Email: support@omashop.com</p>
                <p>Phone: 1-800-OMA-SHOP</p>
                <p>Hours: Mon–Fri, 9AM–6PM EST</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
