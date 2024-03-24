import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

import './../../../food.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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