// import { Rating } from "@material-tailwind/react"
import { useState } from "react"

const FoodCard = ({ data, handleAddCard }: any) => {
  const [count, setCount] = useState(1)
  return (
    <div className='container flex justify-center'>
      {/* Card */}
      <div className="mt-[200px] relative flex bg-clip-border font-bold bg-white text-gray-700 shadow-md w-full  flex-row">
        <div className='absolute top-0 right-0 text-white bg-black p-4 bg-opacity-75'>${data?.price}</div>
        <div
          className="relative w-3/5 m-0 overflow-hidden text-gray-700 bg-white bg-clip-border shrink-0">
          <img
            src={data?.image}
            alt="card-image"
            className="object-cover w-full h-[400px]"
          />
        </div>
        <div className="p-6">
          <h6
            className="block mb-4  text-base antialiased leading-relaxed tracking-normal text-gray-700 uppercase">
            {/* <Rating value={5} placeholder={undefined} /> */}
          </h6>
          <h4 className="block mb-2  text-[30px] antialiased leading-snug tracking-normal text-blue-gray-900">
            {data?.name}
          </h4>
          <p className="block mb-8  text-base antialiased font-normal leading-relaxed text-gray-700">
            {data?.description}
          </p>
          <div className="flex gap-3">
            <button
              className="text-white bg-[#d1a054] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleAddCard(data, count)}
            >
              Add to cart
            </button>
            {/* count */}
            <div className="relative flex items-center max-w-[8rem]">
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                onClick={() => setCount(c => c - 1)}
                disabled={count <= 1}
              >
                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                </svg>
              </button>
              <input
                type="number"
                id="quantity-input"
                data-input-counter aria-describedby="helper-text-explanation"
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                required
              />
              <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
