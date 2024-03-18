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

const LatestNews = () => {
  return (
    <div className='relative h-[600px] mt-10 bg-gray'>
      <div className='absolute top-20 left-0 right-0 text-center z-10'>
        <div className='text-[#e6bb65]'>- From Our Blog -</div>
        <div className='text-white text-4xl'>LATEST NEWS</div>
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
            <img src={item.image} alt="" className="brightness-50 h-full w-full object-cover" />

            <div className='absolute bottom-24 left-10 flex justify-center items-center gap-5'>
              <img src={item.image} alt="" className='h-[400px] w-[600px] object-cover' />
              <div className="text-white">
                <div>{item.date}</div>
                <div className=''>{item.name}</div>
                <div className=''>{item.detail}</div>
                <button className='mt-5 p-2 text-white '>Add Card</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default LatestNews