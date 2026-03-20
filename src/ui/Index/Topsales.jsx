import React from 'react';
import { topsales } from '../../../Resources/TopSales';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../Wishlist/useWishlist';

function Topsales() {
  const { toggleWishlist, isWishlisted } = useWishlist();

  return (
    <div>
      {/* Title Section */}
      <div className="flex gap-2 flex-col mt-8">
        <h1 className="text-3xl font-bold">Top Sales</h1>
        <div className="h-[3px] w-24 rounded bg-[#FF496C]"></div>
      </div>

      {/* Swiper Carousel */}
      <div className="mt-6">
        <Swiper
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 25 },
            1280: { slidesPerView: 6, spaceBetween: 30 },
          }}
          className="mySwiper"
        >
          {topsales.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/product/topsales/${item.id}`} className="relative border border-gray-200 p-4 flex flex-col items-center rounded shadow-sm bg-white">
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(item); }}
                  className="absolute top-3 right-3 text-xl z-10"
                >
                  {isWishlisted(item.id) ? <FaHeart className="text-[#FF496C]" /> : <FaRegHeart className="text-gray-400" />}
                </button>
                <img src={item.image} alt={item.description} className="w-full lg:w-60 object-contain mb-4" />
                <p className="text-gray-600 text-center text-sm mt-3 line-clamp-2">{item.description}</p>
                <p className="text-sm font-bold text-black-600 mt-3">₦ {item.price}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Topsales;
