import React from 'react';
import { FreeShippingOrder, handPicked } from '../../../Resources/Handpicked';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Virtual, Navigation } from 'swiper/modules';
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { LiaTruckMovingSolid } from "react-icons/lia";
import { FaRecycle } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useCart } from '../Checkout/CartContext';

function Handpicked() {
  const { addToCart } = useCart();

  // Icon map to dynamically render icons based on string keys
  const iconMap = {
    LiaTruckMovingSolid: LiaTruckMovingSolid,
    IoCallOutline: IoCallOutline,
    FaRecycle: FaRecycle,
    FaMoneyCheckDollar: FaMoneyCheckDollar,
  };

  return (
    <div className="w-full py-12">
      {/* Title Section */}
      <div className="flex justify-between font-bold rounded p-3 gap-2 bg-[#ff496c] text-white">
        <h1 className="lg:text-2xl">Handpicked for you | Up to 50% Off</h1>
        <Link className="flex gap-2 items-center hover:underline" to="/handpicked">
          See All <FaLongArrowAltRight />
        </Link>
      </div>

      {/* Handpicked Products Slider */}
      <div className="w-full relative">
        {/* Custom Navigation Buttons */}
        <button className="custom-prev absolute left-[-5px] top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button className="custom-next absolute right-[-5px] top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <Swiper
          modules={[Pagination, Virtual, Navigation, Autoplay]}
          spaceBetween={20}
          autoplay={{ delay: 3000 }}
          loop={false}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          virtual
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {handPicked.map((item, index) => (
            <SwiperSlide key={item.id} virtualIndex={index}>
              <div className="h-[280px] mt-2 w-full border border-gray-200 p-4 flex flex-col items-center rounded shadow-sm relative group bg-white">
                <Link to={`/product/handpicked/${item.id}`} className="w-full">
                  <img
                    src={item.image}
                    alt={item.description}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                    {item.description}
                  </p>
                  <p className="text-sm font-bold text-gray-800 mt-3">₦ {item.price}</p>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Free Shipping / Services Grid */}
 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
  {FreeShippingOrder.slice(0, 4).map((item) => {
    const IconComponent = iconMap[item.icon];
    return (
      <div
        key={item.id}
        className="p-4 flex items-center space-x-3 rounded-lg bg-white shadow-sm hover:shadow-md transition"
      >
        <span className="text-3xl text-[#FF496C]">
          {IconComponent && <IconComponent />}
        </span>
        <div className="flex flex-col">
          <strong className="text-gray-700">{item.description}</strong>
          <p className="font-bold text-gray-900">{item.text}</p>
        </div>
      </div>
    );
  })}
</div>


    </div>
  );
}

export default Handpicked;
