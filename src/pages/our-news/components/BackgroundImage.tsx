
const BackgroundImage = () => {
  return (
    <div className="relative">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Barbieri_-_ViaSophia25668.jpg/1200px-Barbieri_-_ViaSophia25668.jpg"
        alt=""
        className="relative object-cover w-full"
        style={{ height: '60vh' }}
      />
      <div className="inner-shadow"></div>
      <div className="absolute inset-0 flex justify-center items-center text-center text-white">
        <div className="text-2xl md:text-6xl">Gallery</div>
      </div>
    </div>
  )
}

export default BackgroundImage