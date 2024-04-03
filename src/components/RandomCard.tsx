import { default_image } from '@/constant/constant';
import { formatMoney, truncateDescription } from '@/lib/utils';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RandomCard = ({ item, index }: any) => {
  const navigate = useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  return (
    <div className="relative flex cursor-pointer" onClick={() => navigate(`/shop/${item._id}/${item.foodType}/detail`)}>
      <img
        src={item?.image}
        className='rounded-corner-img'
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(-1)}
        onError={(e) => {
          (e.target as any).src = default_image
        }}
      />
      <div className='ml-2 w-[100%]'>
        <div className="flex justify-between border-b-2 border-dashed">
          <div className='text-xl'>{item?.name}</div>
          <div className='text-lg text-[var(--color)]'>{formatMoney(item.price)}</div>
        </div>
        <div className="mt-1 flex items-start text-sm">{truncateDescription(item.description, 70)}</div>
      </div>
      {hoveredIndex === index && (
        <div className="absolute top-[-230px] left-20 bg-white border-2 border-gray-300 rounded p-2 shadow z-10">
          <img
            src={item?.image}
            alt="Popup Image"
            className="w-48 h-48 object-cover"
            onError={(e) => {
              (e.target as any).src = default_image
            }}
          />
        </div>
      )}
    </div>
  )
}

export default RandomCard
