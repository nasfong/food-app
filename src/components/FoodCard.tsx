import { formatMoney, truncateDescription } from '@/lib/utils'
import { Check } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'

const FoodCard = ({ item, index, handleButtonClick, cardStates }: any) => {

  return (
    <div
      key={index}
      className="flex flex-col w-full max-w-sm border bg-[#efefef] text-center relative my-5 mx-2 hover:shadow-xl transition"
      style={{ minHeight: "300px" }} // Set a minimum height for each item
    >
      <Link to={`/shop/${item._id}/${item.foodType}/detail`}>
        <img className="w-full h-52 object-cover" src={item.image} alt="Food" />
        <div className='absolute top-0 right-0 text-white bg-black p-4 bg-opacity-75'>
          {formatMoney(item.price)}
        </div>
      </Link>
      <div className="relative flex-grow px-8 py-6 flex flex-col items-center justify-between">
        <div className='border-dashed border border-gray-400 absolute top-[10px] bottom-[10px] left-[10px] right-[10px]'></div>
        <div>
          <div className="font-bold text-xl mb-2">{item.name}</div>
          <p className="text-gray-700 text-base">
            {truncateDescription(item.description, 100)}
          </p>
        </div>
        <button
          className='button2 mt-5 p-2 relative z-10 flex justify-center align-middle gap-3'
          style={{ boxShadow: "0 0.2rem #e6bb65" }}
          onClick={() => handleButtonClick(index, item)}
        >
          <span>Add Card</span>
          {cardStates[index]?.loading && (
            <CircularProgress size="1rem" color='inherit' />
          )}
          {cardStates[index]?.checked && <Check fontSize='small' />}
        </button>
      </div>
    </div>
  )
}

export default FoodCard
