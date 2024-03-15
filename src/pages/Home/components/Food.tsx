import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

import './../../../food.css'

const foods = [
  {
    image: 'https://www.allrecipes.com/thmb/pH8hoFfytcOT9XVK1DSmxv3L0OU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140877-easy-eggless-strawberry-ice-cream-ddmfs-3x4-1-092e4d11b59049c8b3843014ea3c57f2.jpg',
    name: 'Pizza',
  },
  {
    image: 'https://www.allrecipes.com/thmb/pH8hoFfytcOT9XVK1DSmxv3L0OU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140877-easy-eggless-strawberry-ice-cream-ddmfs-3x4-1-092e4d11b59049c8b3843014ea3c57f2.jpg',
    name: 'Soups',
  },
  {
    image: 'https://www.allrecipes.com/thmb/pH8hoFfytcOT9XVK1DSmxv3L0OU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140877-easy-eggless-strawberry-ice-cream-ddmfs-3x4-1-092e4d11b59049c8b3843014ea3c57f2.jpg',
    name: 'Deserts',
  },
  {
    image: 'https://www.allrecipes.com/thmb/pH8hoFfytcOT9XVK1DSmxv3L0OU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140877-easy-eggless-strawberry-ice-cream-ddmfs-3x4-1-092e4d11b59049c8b3843014ea3c57f2.jpg',
    name: 'Deserts',
  },
  {
    image: 'https://www.allrecipes.com/thmb/pH8hoFfytcOT9XVK1DSmxv3L0OU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140877-easy-eggless-strawberry-ice-cream-ddmfs-3x4-1-092e4d11b59049c8b3843014ea3c57f2.jpg',
    name: 'Deserts',
  },
  {
    image: 'https://www.allrecipes.com/thmb/pH8hoFfytcOT9XVK1DSmxv3L0OU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/140877-easy-eggless-strawberry-ice-cream-ddmfs-3x4-1-092e4d11b59049c8b3843014ea3c57f2.jpg',
    name: 'Deserts',
  }
]


const Food = () => {
  return (
    <div className='container mx-auto  text-center'>
      <div>
        <div className='text-[#d1a054]'>- From 11:00am to 10:00pm -</div>
        <div
          className='text-[32px] border-solid border-y-[1px] pad'
        >
          ORDER ONLINE
        </div>
      </div>
      <div className="h-[400px] mt-10 bg-gray">

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination,Navigation]}
          className="mySwiper"
        >
          {foods.map((item, index) => (
            <SwiperSlide key={index} className='rounded h-auto w-[270px]'>
              <img
                src={item.image}
                alt={`Slide 1s`}
                className='object-contain hover:scale-[1.1] transition-all duration-2000 cursor-pointer shadow-[inset_0_0px_30px_rgba(0,0,0,0.9)]'
              />
              <div className='absolute bottom-10 text-white uppercase'>{item.name}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Food