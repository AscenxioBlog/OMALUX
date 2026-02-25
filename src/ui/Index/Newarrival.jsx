import React, { useRef, useEffect } from 'react';
import { newarrival } from '../../../Resources/Newarrival';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

function Newarrival() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Make sure Swiper has access to button refs
  useEffect(() => {
    // Just to trigger re-render with ref filled
  }, []);

  return (
    <div>
      {/* Title Section */}
      <div className="flex flex-col gap-2 mt-8">
        <h1 className="text-3xl font-bold">New Arrival</h1>
        <div className="h-[3px] w-25 rounded bg-[#FF496C]"></div>
      </div>

      {/* Navigation Buttons */}
      {/* <div className=" mt-4">
        <button className="custom-prev absolute left-[-5px] top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button className="custom-next absolute right-[-5px] top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
      </div> */}

      {/* Swiper Slider */}
      <div className="mt-4">
        <Swiper
          loop={true}
          autoplay={{
            delay: 2900,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // Ensure Swiper gets the refs for navigation
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {newarrival.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/product/newarrival/${item.id}`} className="flex flex-col items-center p-4 border border-gray-200 rounded shadow-sm bg-white">
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-full lg:w-60 object-contain mb-4"
                />
                <p className="mt-3 text-center text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
                <p className="mt-3 text-sm font-bold text-black-600">
                  ₦ {item.price}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Newarrival;
