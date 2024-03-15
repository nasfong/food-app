import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './../../../promoition.css';

const cards = [
  {
    image: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/a4/b5/6b7c4dcb4029b5f270dbc2ef299f/2024-cen-mar-hp-cc-overlay-italian-dinner-2x._TTW_._CR0,0,2160,1296_._SR1500,900_._QL100_.jpg',
    name: 'Roast Duck Breast',
    detail: 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce'
  },
  {
    image: 'https://www.foodandwine.com/thmb/K9zYrbzvWUqU8B2BfDF3ht4tNU8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/short-rib-chili-with-pickled-red-onion-FT-RECIPE0222-2-cb71113b52c14256b7686e70cefa0a2e.jpg',
    name: 'Chicken and Walnut Salad',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing'
  }
]

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useRef } from 'react';

const Promotion = () => {
  const progressCircle = useRef<any>(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    (progressContent.current as any).textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className='h-[500px] mt-10 bg-gray'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {cards.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.image} alt="" />
            <div className='absolute max-w-sm rounded overflow-hidden shadow-lg bg-white opacity-[95%]'>
              <div className='px-8 py-6'>
                <div className='text-2xl'>{item.name}</div>
                <div className='text-sm'>{item.detail}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  )
}

export default Promotion