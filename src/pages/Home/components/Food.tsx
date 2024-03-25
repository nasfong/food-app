import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

import './../../../food.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Food = () => {
  const navigate = useNavigate()
  const { data } = useQuery<any[]>({
    queryKey: ['food-type'],
    queryFn: () =>
      axios.get('/food-type').then((res) =>
        res.data,
      ),
  })

  const handleClick = (foodType: string) => {
    navigate(`shop/${foodType}`)
  }
  return (
    <div className="h-[400px] mt-10 mb-28 bg-gray container mx-auto text-center">
      <div>
        <div className='form-to'>From 11:00am to 10:00pm</div>
        <div className='title'>ORDER ONLINE</div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          380: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
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
        {data?.map((item, index) => (
          <SwiperSlide key={index} onClick={() => handleClick(item._id)}>
            <img
              src={item.image || 'https://www.invoicera.com/wp-content/uploads/2023/11/default-image.jpg'}
              alt={`Slide 1s`}
              className='img rounded-lg'
            />
            <div className="inner-shadow-food"></div>
            <div className='absolute bottom-16 text-white uppercase'>
              {item.name}
            </div>
            <div className="inner-shadow-footer"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Food