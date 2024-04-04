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

  const [shadowOffsetX, setShadowOffsetX] = useState(0);
  const [shadowOffsetY, setShadowOffsetY] = useState(0);
  const [shadowBlur, setShadowBlur] = useState(0);
  const handleMouseMove = (e) => {
    const textRect = e.target.getBoundingClientRect();
    const textCenterX = textRect.left + textRect.width / 2;
    const textCenterY = textRect.top + textRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const offsetX = (mouseX - textCenterX) / textRect.width * (-20); // Adjust this value for the distance of the shadow effect
    const offsetY = (mouseY - textCenterY) / textRect.height * (-20); // Adjust this value for the distance of the shadow effect

    const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2); // Euclidean distance from center

    const maxDistance = 20; // Maximum distance for full blur
    const blurRatio = Math.min(distance / maxDistance, 1); // Ratio of current distance to maximum distance (clamped between 0 and 1)
    const maxBlur = 10; // Maximum blur radius
    const blur = Math.round(blurRatio * maxBlur); // Apply blur ratio to maximum blur

    setShadowOffsetX(offsetX);
    setShadowOffsetY(offsetY);
    setShadowBlur(blur);
  };

  const handleMouseLeave = () => {
    setShadowOffsetX(0);
    setShadowOffsetY(0);
    setShadowBlur(0);
  };
  return (
    <div
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
        <h1
          id="animated-text"
          style={{ textShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px rgba(0, 0, 0, 0.9)` }}
        >
          <div className="text-4xl md:text-6xl font-bold">{data?.title || data?.name}</div>
        </h1>
      </div>
    </div>
  )
}

export default Background