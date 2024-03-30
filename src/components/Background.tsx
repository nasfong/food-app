type Props = {
  // data: {
  //   image: string
  //   title: string
  // } | undefined
  data?: any
}

const Background = ({data}: Props) => {
  return (
    <div className="relative">
      <img
        src={data?.image}
        alt=""
        className="relative object-cover w-full brightness-75 bg-black"
        style={{ maxHeight: '80vh' }}
      />
      <div className="inner-shadow"></div>
      <div className="absolute inset-0 flex justify-center items-center text-center text-white">
        <div className="text-4xl md:text-6xl font-bold">{data?.title}</div>
      </div>
    </div>
  )
}

export default Background