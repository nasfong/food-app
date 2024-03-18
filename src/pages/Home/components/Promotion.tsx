import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './../../../promoition.css';

const cards = [
  {
    image: 'https://imgs.search.brave.com/oiEqgwJQYE06WHRyr5yXE9L0HjuGoJexVYemQRFK_7Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NjcwMDM5MDk1ODUt/MmY4YTcyNzAwMjg4/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVEI4Zkh4bGJu/d3dmSHg4Zkh3PQ',
    name: 'Roast Duck Breast',
    price: '14.50',
    detail: 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce'
  },
  {
    image: 'https://imgs.search.brave.com/m5uimNhN8PWgJ-xav3Qvom0MQJOuba3GLlWrhgWiehw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9ocmx0eDEy/cGw4aHEvMmYxUHEy/eThhcVVYV2dWU0No/MWNONC9kZmU1MWUy/MDRjYmVmOGZkZjA0/OWIzMWY4OWE2NWUw/NS9mb29kLWFuZC1k/cmluay1pbWFnZXMu/anBnP2ZpdD1maWxs/Jnc9NjAwJmg9NDAw',
    name: 'Chicken and Walnut Salad',
    price: '10.95',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing'
  }
]

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const Promotion = () => {
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
            <img src={item.image} alt="" className='object-cover' />
            <div className='absolute bg-white bg-opacity-80 p-5'>
              <div className='font-bold'>{item.name}</div>
              <div>{item.detail}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Promotion