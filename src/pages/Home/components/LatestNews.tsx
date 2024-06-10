import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './../../../promoition.css';

// const cards = [
//   {
//     image: 'https://clicklovegrow.com/wp-content/uploads/2020/03/Naomi-Sherman-Advanced-Graduate4.jpg',
//     name: 'Roast Duck Breast',
//     price: '14.50',
//     detail: 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce',
//     date: "April 3, 2018",
//     id: 'where-can-i-get-some'
//   },
//   {
//     image: 'https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg',
//     name: 'Chicken and Walnut Salad',
//     price: '10.95',
//     detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing',
//     date: "April 3, 2018",
//     id: 'where-dose-it-come-from'
//   },
//   {
//     image: 'https://media.post.rvohealth.io/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg',
//     name: 'Chicken and Walnut Salad',
//     price: '10.95',
//     detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing',
//     date: "April 3, 2018",
//     id: 'what-is-lorem-ipsum'
//   }
// ]

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { default_image } from '@/constant/constant';
import { useNavigate } from 'react-router-dom';
import { truncateDescription } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const LatestNews = () => {
  const navigate = useNavigate();

  const { data } = useQuery<any>({
    queryKey: ['/food/latest/3'],
    queryFn: () =>
      axios.get('/food/latest/3').then((res) => res.data),
  })

  return (
    <section className='relative h-[750px] mt-10 bg-gray'>
      <div className='absolute top-10 left-0 right-0 text-center z-10'>
        <h2 className='form-to text-xl'>From Our Blog</h2>
        <h3 className='title text-white text-4xl border-white'>LATEST NEWS</h3>
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
        {data?.map((item, index) => (
          <SwiperSlide key={index} className='relative'>
            <img
              src={item.image}
              alt={item.image}
              className="brightness-50 h-full w-full object-cover"
              onError={(e) => {
                (e.target as any).src = default_image
              }}
              loading="lazy"
            />

            <div className='absolute top-44 right-50 flex flex-col md:flex-row justify-center items-center gap-5  w-[70%] md:w-[90%]'>
              <img
                src={item.image}
                alt={item.image}
                className='h-[200px] w-[600px] md:h-[400px] md:w-[600px] object-cover'
                onError={(e) => {
                  (e.target as any).src = default_image
                }}
                loading="lazy"
              />
              <div className="text-white text-start flex flex-col gap-5">
                <div className=''>{item.description}</div>
                <h4 className='text-4xl'>{item.name}</h4>
                <h5 className=''>{truncateDescription(item.description, 80)}</h5>
                <button
                  className='button4 mt-5 p-2 relative z-10 flex justify-center align-middle gap-3 font-light'
                  onClick={() => navigate(`read-more/${index + 1}`)}
                >
                  READ MORE
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default LatestNews