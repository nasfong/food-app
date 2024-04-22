
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './../../../promoition.css';
import { default_image } from '@/constant/constant';
type Props = {
  data: { image: string, name: string, description: string }
}

const SlideWithCard = ({ data }: Props) => {

  return (
    <div className='relative h-[500px] my-10 bg-gray flex justify-center items-center'>
      <img
        src={data.image}
        alt={data.image}
        className='w-full h-full object-cover absolute'
        onError={(e) => {
          (e.target as any).src = default_image
        }}
      />
      <div className='absolute bg-white bg-opacity-90 p-10 text-center max-w-[800px]'>
        <div className='title'>{data.name}</div>
        <div className='mt-5'>
          {data.description}
        </div>
      </div>
    </div>
  )
}

export default SlideWithCard