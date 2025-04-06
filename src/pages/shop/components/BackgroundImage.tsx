import { default_image } from "@/constant/constant"
import { replaceImage } from "@/lib/utils"

const defaults = "https://www.cnet.com/a/img/resize/69256d2623afcbaa911f08edc45fb2d3f6a8e172/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=675&width=1200"

const BackgroundImage = ({ data }: any) => {

  return (
    <div className="relative">
      <img
        src={replaceImage(data?.image) || defaults}
        alt={replaceImage(data?.image) || defaults}
        className="relative object-cover w-full transition-opacity duration-1000 ease-in-out bg-black brightness-75"
        style={{ height: '60vh' }}
        loading='lazy'
        onError={(e) => {
          (e.target as any).src = default_image
        }}
      />
      <div className="inner-shadow"></div>
      <div className="absolute inset-0 flex justify-center items-center text-center text-white">
        <div className="text-2xl md:text-6xl">{data?.name || 'Shop'}</div>
      </div>
    </div>
  )
}

export default BackgroundImage