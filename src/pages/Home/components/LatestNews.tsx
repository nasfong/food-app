import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './../../../promoition.css';

const cards = [
  {
    image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    name: 'Roast Duck Breast',
    price: '14.50',
    detail: 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce',
    date: "April 3, 2018"
  },
  {
    image: 'https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg',
    name: 'Chicken and Walnut Salad',
    price: '10.95',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing',
    date: "April 3, 2018"
  },
  {
    image: 'https://media.post.rvohealth.io/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg',
    name: 'Chicken and Walnut Salad',
    price: '10.95',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing',
    date: "April 3, 2018"
  }
]

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { default_image } from '@/constant/constant';

const LatestNews = () => {
  return (
    <div className='relative h-[750px] mt-10 bg-gray'>
      <div className='absolute top-10 left-0 right-0 text-center z-10'>
        <div className='form-to text-xl'>From Our Blog</div>
        <div className='title text-white text-4xl border-white'>LATEST NEWS</div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper z-0"
      >
        {cards.map((item, index) => (
          <SwiperSlide key={index} className='relative'>
            <img
              src={item.image}
              alt=""
              className="brightness-50 h-full w-full object-cover"
              onError={(e) => {
                (e.target as any).src = default_image
              }}
            />

            <div className='absolute top-44 right-50 flex flex-col md:flex-row justify-center items-center gap-5  w-[70%] md:w-[90%]'>
              <img
                src={item.image}
                alt=""
                className='h-[200px] w-[600px] md:h-[400px] md:w-[600px] object-cover'
                onError={(e) => {
                  (e.target as any).src = default_image
                }}
              />
              <div className="text-white text-start flex flex-col gap-5">
                <div className=''>{item.date}</div>
                <div className='text-4xl'>{item.name}</div>
                <div className=''>{item.detail}</div>
                {/* <button className='mt-5 p-2 text-white text-start'>
                  Add Card
                </button> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default LatestNews