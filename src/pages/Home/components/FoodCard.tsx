import { formatMoney, truncateDescription } from "@/lib/utils"
import { Link } from "react-router-dom"



const FoodCard = ({ data, handleAddCard }: any) => {
  return (
    <div className="my-20">
      <div className="text-center mb-6">
        <div className='form-to'>Should to Try</div>
        <div className='title'>CHEF RECOMMENDS</div>
      </div>
      <div className="flex flex-wrap justify-center">
        {data?.map((item: any, index: any) => (
          <div
            key={index}
            className="flex flex-col w-full max-w-sm border bg-[#efefef] text-center relative my-5 mx-2 hover:shadow-xl transition"
            style={{ minHeight: "300px" }} // Set a minimum height for each item
          >
            <Link
              to={`/shop/${item._id}/${item.foodType}/detail`}
              className=""
            >
              <img className="w-full h-52 object-cover" src={item.image} alt="Sunset in the mountains" />
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
                className='button2 mt-5 p-2 relative z-10'
                style={{ boxShadow: "0 0.2rem #e6bb65" }}
                onClick={() => handleAddCard(item)}
              >
                Add Card
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default FoodCard
