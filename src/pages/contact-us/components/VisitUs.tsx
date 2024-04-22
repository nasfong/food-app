import { address, holiday, phone, weekday } from "@/constant/constant"

const VisitUs = () => {
  return (
    <div className='my-20'>
      <div className="text-center mb-6">
        <div className='form-to'>Visit us</div>
        <div className='title'>OUR LOCATION</div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="bg-[#f5f5f5] py-16 px-6 relative text-center">
          <div className='text-xl mb-2 font-bold'>PHONE</div>
          <a href={`tel:${phone}`} className="relative z-10">
            {phone}
          </a>
          <div className="h-14 w-14 bg-[var(--color)] absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-full z-10">
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4">
              <img src="/svg/map.svg" alt="svg1" style={{ height: 15 }} />
            </div>
          </div>
          <div className='border-dashed border border-gray-400 absolute top-[10px] bottom-[10px] left-[10px] right-[10px]'></div>
        </div>
        <div className="bg-[#f5f5f5] py-16 px-6 relative text-center">
          <div className='text-xl mb-2 font-bold'>Address</div>
          <div className="relative z-10">
            {address}
          </div>
          <div className="h-14 w-14 bg-[var(--color)] absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-full z-10">
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4">
              <img src="/svg/map.svg" alt="svg2" style={{ height: 15 }} />
            </div>
          </div>
          <div className='border-dashed border border-gray-400 absolute top-[10px] bottom-[10px] left-[10px] right-[10px]'></div>
        </div>
        <div className="bg-[#f5f5f5] py-16 px-6 relative text-center">
          <div className='text-xl mb-2 font-bold'>Working Hours</div>
          <div>
            {weekday}
          </div>
          <div>
            {holiday}
          </div>
          <div className="h-14 w-14 bg-[var(--color)] absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-full z-10">
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4">
              <img src="/svg/map.svg" alt="svg3" style={{ height: 15 }} />
            </div>
          </div>
          <div className='border-dashed border border-gray-400 absolute top-[10px] bottom-[10px] left-[10px] right-[10px]'></div>
        </div>
      </div>
    </div>
  )
}

export default VisitUs
