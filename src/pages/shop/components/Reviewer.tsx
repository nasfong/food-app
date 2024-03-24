import { Rating } from '@material-tailwind/react'

const Reviewer = ({ data }: any) => {
  console.log(data)
  return (
    <div className='container'>
      <div className='text-4xl'>3 reviews for Cherry Pie</div>
      <div className=''>
        {data?.map((item: any, index: any) => (
          <div key={index} className='bg-[#F8F8F8] p-5 m-5 rounded-md'>
            <div className='flex justify-between'>
              <div className='flex gap-3'>
                <img
                  src="https://secure.gravatar.com/avatar/1fb2221f429981d3c12d69bb86d269a2?s=60&d=mm&r=g"
                  alt=""
                  className='rounded-full'
                />
                <div>
                  <div>{item.name}</div>
                  <div>{item.comment}</div>
                </div>
              </div>
              <Rating value={item.star} placeholder={undefined} readonly />
            </div>
          </div>
        ))}
      </div>

      <div className=''>
        <div className="w-full">
          <form className="bg-[#F8F8F8] shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>Add A Review</div>
            <Rating value={0} placeholder={undefined} />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Your review*
              </label>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."></textarea>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
              </div>
              <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reviewer