import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

import './../../../food.css'

const Food = () => {
  return (
    <div className="h-[400px] mt-10 bg-gray container">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={"https://media.cntraveler.com/photos/652d4cddbb93c1559f6e1829/master/w_1600%2Cc_limit/o%2520pedro.JPG"}
            alt={`Slide 1s`}
            className='img'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Food