import { useState, useEffect } from 'react';
import './../../../slider.css'

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

  return (
    <>
      <div className="slider w-[100%] h-[50vh] md:h-[100vh] ">
        {images.map((image, idx) => (
          <span key={idx} className=''>
            <img
              key={idx}
              src={image}
              alt={`Slide ${idx}`}
<<<<<<< HEAD
              className={(idx === index ? 'active' : 'inactive') + ''}
              loading='lazy'
=======
              className={idx === index ? 'active' : 'inactive' + 'bg-black'}
>>>>>>> e783d98fa4aee8cebff199ef489958bd5a276c23
            />
            <div className="inner-shadow"></div>
            <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white'>
              <div className='text-4xl md:text-6xl'>Meom Restaurant</div>
              <div className='text-[14px] md:text-xl'>123 Main Street, Uni 21, New York City</div>
            </div>
          </span>
        ))}
      </div>
    </>
  );
};

export default Slider;
