import { default_image } from '@/constant/constant'
import '../styles/our-menu.css'

const Background = () => {
  return (
    <div className="relative">
      <img
        src="https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg"
        alt="https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg"
        className="relative object-cover w-full brightness-75"
        style={{ maxHeight: '80vh' }}
        onError={(e) => {
          (e.target as any).src = default_image
        }}
        loading="lazy"
      />
      <div className="inner-shadow"></div>
      <div className="absolute inset-0 flex justify-center items-center text-center text-white">
        <div className="text-4xl md:text-6xl font-bold">Our Menu</div>
      </div>
    </div>
  )
}

export default Background