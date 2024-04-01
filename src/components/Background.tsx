import { useEffect, useState } from "react";
import '../assets/styles/image-animation.css'
import { default_image } from "@/constant/constant";

type Props = {
  // data: {
  //   image: string
  //   title: string
  // } | undefined
  data?: any
}

const Background = ({ data }: Props) => {

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false); // Reset the state when data.image changes
  }, [data.image]);

  const handleImageLoad = () => {
    setImageLoaded(true); // Set the state to true when the image has loaded
  };
  return (
    <div className="relative">
      <img
        src={data?.image}
        alt=""
        className={`
        relative object-cover w-full 
        h-auto md:h-[80vh]
        brightness-75 bg-black ${imageLoaded ? 'fadeIn' : ''}
        `}
        onLoad={handleImageLoad}
        onError={(e) => {
          (e.target as any).src = default_image
        }}
      />
      <div className="inner-shadow"></div>
      <div className="absolute inset-0 flex justify-center items-center text-center text-white">
        <div className="text-4xl md:text-6xl font-bold">{data?.title || data?.name}</div>
      </div>
    </div>
  )
}

export default Background