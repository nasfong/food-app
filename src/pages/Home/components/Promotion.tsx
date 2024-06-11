import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './../../../promoition.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { default_image } from '@/constant/constant';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface IFood {
  _id: string;
  name: string;
  image: string
  star: number
  price: number
  description: string
  foodType: string
  chef: boolean
}

interface FoodQuery {
  data: IFood[]
  totalPages: number
  currentPage: number
}

const Promotion = () => {
  const { data } = useQuery<FoodQuery>({
    queryKey: ['food', { pageSize: 3, promotion: true }],
    queryFn: () =>
      axios.get('/food', { params: { pageSize: 3, promotion: true } }).then((res) => res.data),
  })

  return (
    <section className='h-[500px] my-10 bg-gray'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.image}
              alt={item.image}
              className='promotion object-cover'
              onError={(e) => {
                (e.target as any).src = default_image
              }}
              loading="lazy"
            />
            <div className='absolute bg-white bg-opacity-95 p-5'>
              <h5 className='font-bold text-[32px]'>{item.name}</h5>
              <h6 className='text-[16px]'>{item.description}</h6>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Promotion