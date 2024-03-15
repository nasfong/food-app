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
      <div className="slider">
        {images.map((image, idx) => (
          <div key={idx} className='image-shadow'>
            <img
              key={idx}
              src={image}
              alt={`Slide ${idx}`}
              className={idx === index ? 'active' : 'inactive'}
            />
          </div>
        ))}
        <div
          className='absolute text-white  
          top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          text-6xl text-center'
        >
          Cristiano Restaurant
        </div>
      </div>
    </>
  );
};

export default Slider;
