
const BackgroundImage = () => {
  return (
    <div className="relative">
      <img
        src="https://www.cnet.com/a/img/resize/69256d2623afcbaa911f08edc45fb2d3f6a8e172/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=675&width=1200"
        alt=""
        className="relative object-cover w-full"
        style={{ height: '60vh' }}
      />
      <div className="inner-shadow"></div>
      <div className="absolute inset-0 flex justify-center items-center text-center text-white">
        <div className="text-2xl md:text-6xl">Shop</div>
      </div>
    </div>
  )
}

export default BackgroundImage