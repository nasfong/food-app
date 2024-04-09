import { useState, useEffect } from 'react';
import './../../../slider.css'
import { address, default_image, restaurant_name } from '@/constant/constant';

const images =
  [
    "https://drurybuildings.com/wp-content/uploads/2023/02/DRURY-BUILDINGS-20-1450x750.jpg",
    "https://images.communicatorcloud.com/cloud/imagecontainer/f6954784-b534-4604-b458-98d6856a5878.jpg?maxWidth=1280&format=jpg&quality=90",
    "https://glamadelaide.com.au/wp-content/uploads/2023/10/trak-5.jpg"
  ]
const interval = 7000

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [images, interval]);

  const [shadowOffsetX, setShadowOffsetX] = useState(0);
  const [shadowOffsetY, setShadowOffsetY] = useState(0);
  const [shadowBlur, setShadowBlur] = useState(0);

  const handleMouseMove = (e) => {
    const textRect = e.target.getBoundingClientRect();
    const textCenterX = textRect.left + textRect.width / 2;
    const textCenterY = textRect.top + textRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const offsetX = (mouseX - textCenterX) / textRect.width * (-40); // Adjust this value for the distance of the shadow effect
    const offsetY = (mouseY - textCenterY) / textRect.height * (-40); // Adjust this value for the distance of the shadow effect

    const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2); // Euclidean distance from center

    const maxDistance = 20; // Maximum distance for full blur
    const blurRatio = Math.min(distance / maxDistance, 1); // Ratio of current distance to maximum distance (clamped between 0 and 1)
    const maxBlur = 20; // Maximum blur radius
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
    <article>
      <div className="slider w-[100%] h-[50vh] md:h-[100vh] ">
        {images.map((image, idx) => (
          <span
            key={idx} className=''
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.25) 60%,rgba(0,0,0,1) 100%), url(${image})`
            }}
          >
            <img
              key={idx}
              src={image}
              alt={`Slide ${idx}`}
              className={(idx === index ? 'active' : 'inactive') + ''}
              loading='lazy'
              onError={(e) => {
                (e.target as any).src = default_image
              }}

            />
            <div className="gradient-overlay" />
            <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white'>
              <div
                id="animated-text"
                style={{ textShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px rgba(0, 0, 0, 0.9)` }}
              >
                <h1 className='text-4xl md:text-8xl mb-3 uppercase'>{restaurant_name}</h1>
                <h2 className='text-[14px] md:text-[14px] font-mono'>{address}</h2>
              </div>
            </div>
          </span>
        ))}
      </div>
    </article>
  );
};

export default Slider;
