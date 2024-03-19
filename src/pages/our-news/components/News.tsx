const news = [
  {
    name: 'Where can I get some?',
    image: 'https://ychef.files.bbci.co.uk/1280x720/p09wrjyz.jpg',
    date: 'April 3, 2018',
    comment: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly…'
  },
  {
    name: 'Where can I get some?',
    image: 'https://www.moonriverpearls.com/wp-content/uploads/2019/11/Beef-Steak-201910-001.jpg',
    date: 'April 3, 2018',
    comment: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly…'
  },
  {
    name: 'Where can I get some?',
    image: 'https://qph.cf2.quoracdn.net/main-qimg-8533e9f97a10ff91b5fbef304046e972-lq',
    date: 'April 3, 2018',
    comment: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly…'
  },

]

const News = () => {
  return (
    <div className="container">
      {news.map((item, index) => (
        <div
          key={index}
          className={`my-20 relative flex ${index % 2 && 'flex-row-reverse'}`}
        >
          <img src={item.image} alt="" className=" object-cover h-80 w-[600px] rounded-sm" />
          <div
            className={`absolute
            ${index % 2 ? 'top-1/2 right-1/2 translate-x-24' : 'top-1/2 left-1/2 '}
             transform -translate-x-24 -translate-y-1/2
            bg-[#EFEFEF] p-16 text-center
            `}
          >
            <div>{item.date}</div>
            <div>{item.name}</div>
            <div>{item.comment}</div>
          </div>
        </div>
      ))}

    </div>
  )
}

export default News