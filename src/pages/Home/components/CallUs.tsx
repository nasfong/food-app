import { phone } from "@/constant/constant"

const CallUs = () => {
  return (
    <div className="py-[30px] md:py-[75px] bg-[#1B2024] text-white">
      <div className="text-center text-2xl">
        CallUs: {phone}
      </div>
    </div>
  )
}

export default CallUs