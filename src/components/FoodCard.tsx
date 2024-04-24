import { admin, default_image } from '@/constant/constant'
import { formatMoney, truncateDescription } from '@/lib/utils'
import { Check } from '@mui/icons-material'
import { Button, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'

const FoodCard = ({ item, index, handleButtonClick, cardStates, handleEdit, handleDelete }: any) => {

  return (
    <div
      key={index}
      className="flex flex-col w-full max-w-sm border bg-[#efefef] text-center relative my-5 mx-2 hover:shadow-xl transition"
      style={{ minHeight: "300px" }} // Set a minimum height for each item
    >
      <Link to={`/shop/${item._id}/${item.foodType}/detail`}>
        <img
          className="w-full h-52 object-cover"
          src={item.image}
          alt={item.image}
          onError={(e) => {
            (e.target as any).src = default_image
          }}
          loading="lazy"
          />
        <div className='absolute top-0 right-0 text-white bg-black p-4 bg-opacity-75'>
          {formatMoney(item.price)}
        </div>
      </Link>
      <div className="relative flex-grow px-8 py-6 flex flex-col items-center justify-between">
        <div className='border-dashed border border-gray-300 absolute top-[5px] bottom-[5px] left-[5px] right-[5px]'></div>
        <div>
          <div className="font-bold text-xl mb-2">{item.name}</div>
          <p className="text-gray-700 text-base">
            {truncateDescription(item.description, 100)}
          </p>
        </div>
        <button
          className='button2 mt-5 py-2  relative z-10 flex justify-center align-middle gap-3'
          onClick={() => handleButtonClick(index, item)}
        >
          <span className='uppercase'>Add To Cart</span>
          {cardStates[index]?.loading && (
            <CircularProgress size="1rem" color='inherit' />
          )}
          {cardStates[index]?.checked && <Check fontSize='small' />}
        </button>
      </div>
      {admin && (
        <div className='mb-3'>
          {handleEdit && (
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleEdit(item)}
              size='small'
            >Edit</Button>
          )} {' '}
          {handleDelete && (
            <Button
              variant='contained'
              color='error'
              onClick={() => handleDelete(item._id)}
              size='small'
            >Delete</Button>
          )}
        </div>
      )}
    </div>
  )
}

export default FoodCard
