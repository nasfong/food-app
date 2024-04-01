// import '../styles/our-menu.css'

import { default_image } from "@/constant/constant"

const Background = () => {
  return (
    <div className="relative">
      <img
        src="https://imgs.search.brave.com/yagSqtCQqVE4th1URc-vxYiLXireJRtweL_90frupR0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4y/LmF0bGFudGFtYWdh/emluZS5jb20vd3At/Y29udGVudC91cGxv/YWRzL3NpdGVzLzQv/MjAyMi8wMi8wMjIy/X251cmtpdGNoZW4w/Ml9td2lsbGlhbXNf/b25ldXNlb25seS5q/cGc"
        alt=""
        className="relative object-cover w-full brightness-75"
        style={{ height: '60vh' }}
        onError={(e) => {
          (e.target as any).src = default_image
        }}
      />
      <div className="inner-shadow"></div>
      <div className="absolute inset-0 flex justify-center items-center text-center text-white">
        <div className="text-4xl md:text-6xl font-bold">Contact Us</div>
      </div>
    </div>
  )
}

export default Background