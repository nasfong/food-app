import { useState } from 'react';
import '../../../ramdomDish.css';
import { truncateDescription } from '@/lib/utils';

const RadomDish = ({ data }: any) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div className="container my-20">
      <div className='mb-12 text-center'>
        <div className='form-to'>Random Dishes</div>
        <div className='title'>FROM OUR MENU</div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8'>
        {data?.map((item: any, index: any) => (
          <div key={index} className="relative flex">
            <img
              src={item?.image}
              className='rounded-corner-img'
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            />
            <div className='ml-2 w-[100%]'>
              <div className="flex justify-between font-bold text-[var(--color)]">
                <div>{item?.name}</div>
                <div>${item?.price}</div>
              </div>
              <div className="mt-1 flex items-start text-sm">{truncateDescription(item.description, 70)}</div>
            </div>
            {hoveredIndex === index && (
              <div className="absolute top-[-230px] left-20 bg-white border-2 border-gray-300 rounded p-2 shadow z-10">
                <img src={item?.image} alt="Popup Image" className="w-48 h-48 object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='text-center'>
        <button className='text-black button1 mt-10'>View Full Menu</button>
      </div>
    </div>
  );
};

export default RadomDish;
