import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './../../../promoition.css';
import { double_quote_icon } from '@/constant/data';
import { Autoplay } from 'swiper/modules';

const message = [
  {
    name: 'John Doe',
    feedback: 'Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
  },
  {
    name: 'Jane Ny',
    feedback: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
  },
]


// import required modules

const Testimonials = () => {
  const progressCircle = useRef<any>(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (_: any, time: any, progress: any) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    (progressContent.current as any).textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <section className='h-[350px] my-10'>
      <div className='text-center'>
        <div className='form-to'>What Our Clients Say</div>
        <div className='title'>TESTIMONIALS</div>
      </div>
      <div className='h-[300px] bg-gray'>
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
          modules={[Autoplay]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          {message.map((item, index) => (
            <SwiperSlide key={index}>
              <div className='px-8 flex flex-col justify-center items-center'>
                <div
                  className='icon-footer icon-hover cursor-pointer mb-6'
                  dangerouslySetInnerHTML={{ __html: double_quote_icon }}
                />
                <div className='text-sm mb-3'>{item.feedback} </div>
                <div className='text-[--color] font-thin'>{item.name}</div>
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
    </section>
  )
}

export default Testimonials