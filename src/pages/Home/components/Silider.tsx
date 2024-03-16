import { useState, useEffect } from 'react';
import './../../../slider.css'

type Props = {
  images: string[]
  interval: number
}

const Slider = ({ images, interval }: Props) => {
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
          <span key={idx} className=''>
            <img
              // key={idx}
              src={image}
              alt={`Slide ${idx}`}
              className={idx === index ? 'active' : 'inactive'}
            />
            <div className="inner-shadow"></div>

          </span>
        ))}
      </div>
    </>
  );
};

export default Slider;
