import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './../../../promoition.css';

const cards = [
  {
    image: 'https://cdn11.bigcommerce.com/s-t5mzvifm/product_images/uploaded_images/prorestaurantequipment-seotool-37328-tipsforimproving-blogbanner1.jpg',
    name: 'Roast Duck Breast',
    price: '14.50',
    detail: 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce'
  },
  {
    image: 'https://images.getbento.com/accounts/5cd3abbf1d76fd4b1351f8efda30f047/media/images/57852CH_Quality_BISTRO_NYC_559.jpg?w=1200&fit=crop&auto=compress,format&h=600',
    name: 'Chicken and Walnut Salad',
    price: '10.95',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing'
  }
]

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { default_image } from '@/constant/constant';
// import { useRef } from 'react';

const Promotion = () => {
  // const progressCircle = useRef<any>(null);
  // const progressContent = useRef(null);
  // const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
  //   progressCircle.current.style.setProperty('--progress', 1 - progress);
  //   (progressContent.current as any).textContent = `${Math.ceil(time / 1000)}s`;
  // };
  return (
    <div className='h-[500px] my-10 bg-gray'>
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
        {cards.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.image}
              alt=""
              className='promotion object-cover'
              onError={(e) => {
                (e.target as any).src = default_image
              }}
            />
            <div className='absolute bg-white bg-opacity-95 p-5'>
              <div className='font-bold text-[32px]'>{item.name}</div>
              <div className='text-[16px]'>{item.detail}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Promotion