// import { Rating } from "@material-tailwind/react"
import { default_image } from "@/constant/constant"
import { formatMoney } from "@/lib/utils"
import { Rating } from "@material-tailwind/react"
import { Check } from "@mui/icons-material"
import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"

const FoodCard = ({ data, handleAddCard }: any) => {
  const [count, setCount] = useState(1)
  const [resetStar, setResetStar] = useState(false)
  const [cardStates, setCardStates] = useState<{ loading: boolean; checked: boolean; }>({
    loading: false,
    checked: false
  });

  const handleButtonClick = (item: any) => {
    setCardStates({ ...cardStates, loading: true })
    setTimeout(() => {
      setCardStates({ loading: false, checked: true })
      handleAddCard(item, 1);
      setTimeout(() => {
        setCardStates({ loading: false, checked: false })
      }, 3000);
    }, 1500);
  };

  useEffect(() => {
    setResetStar(false)
    setTimeout(() => {
      setResetStar(true)
    }, 10)
  }, [data])

  return (
    <div className='container flex justify-center'>
      {/* Card */}
      <div className="rounded mt-28 md:mt-[200px] relative bg-clip-border bg-white bg-opacity-50 text-gray-700 shadow-md w-full flex flex-col md:flex-row items-center">
        <div className="relative w-full md:w-1/2 m-0 overflow-hidden text-gray-700 bg-white bg-clip-border shrink-0">
          <img
            src={data?.image}
            alt="card-image"
            className="object-cover"
            onError={(e) => {
              (e.target as any).src = default_image
            }}
          />
        </div>
        <div className='absolute top-0 right-0 text-white bg-black p-4 bg-opacity-75 rounded-se'>
          {formatMoney(data?.price)}
        </div>
        <div className="p-6 md:p-16 relative w-full">
          {/* <div className='border-dashed border border-gray-300 absolute top-[5px] bottom-[5px] left-[5px] right-[5px]'></div> */}
          <h6
            className="block mb-4  
            text-base antialiased leading-relaxed 
            tracking-normal text-gray-700 uppercase
            min-h-5
            "
            >
            {resetStar && (
              <Rating value={data?.star} placeholder={undefined} readonly />
            )}
          </h6>
          <h4 className="block mb-2  text-[30px] antialiased leading-snug tracking-normal text-blue-gray-900">
            {data?.name}
          </h4>
          <p className="block mb-8  text-base antialiased font-normal leading-relaxed text-gray-700">
            {data?.description}
          </p>
          <div className="flex gap-3">
            <button
              className="text-white bg-[#d1a054]  hover:bg-black transition duration-500
               font-medium  text-sm px-5 py-2.5  
              text-center flex justify-center align-middle gap-3"
              onClick={() => handleButtonClick(data)}
            >
              <span>Add to cart</span>
              {cardStates?.loading && (
                <CircularProgress size="1rem" color='inherit' />
              )}
              {cardStates?.checked && <Check fontSize='small' />}
            </button>
            {/* count */}
            <div className="relative flex items-center max-w-[8rem]">
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-transparent
               border 
                border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 
                dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                onClick={() => (count > 1) && setCount(c => c - 1)}
              >
                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                </svg>
              </button>
              <input
                type="number"
                id="quantity-input"
                data-input-counter aria-describedby="helper-text-explanation"
                className="bg-gray-50 border-x-0 
                border-gray-300 h-11 text-center text-gray-900 text-sm 
                focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                no-spinners
                "
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                required
              />
              <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className="bg-transparent 
                border border-gray-300 rounded-e-lg p-3 h-11 
                focus:ring-gray-100 dark:focus:ring-gray-700 
                focus:ring-2 focus:outline-none"
                onClick={() => setCount(c => c + 1)}
              >
                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
