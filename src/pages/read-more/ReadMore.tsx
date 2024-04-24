import Background from "@/components/Background"
import { arrowRight_icon } from "@/constant/data"
import { readMore } from "@/constant/readmore"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ReadMore = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = useState(null)
  useEffect(() => {
    setData(readMore.find(item => item.id === id))
  }, [id])
  return (
    <section>
      <Background data={{ image: data?.image, title: data?.name }} />
      <div className="container my-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-3/4">
          <div className="flex gap-3 text-gray-500 mb-6 text-sm">
            <div>{data?.date}</div>
            {/* <div>{1} Comment</div> */}
          </div>
          <div>
            {data?.description}
          </div>
        </div>
        <div className="bg-[#fafafa] p-[30px] shadow">
          <div className='mb-6'>RECENT POSTS</div>
          <div className='flex flex-col gap-3'>
            {readMore.map((item, index) => (
              <div key={index} className="">
                <div
                  className={`flex items-center gap-3 mb-2 hover:text-[--color] icon-hover cursor-pointer ${item.id === id ? 'text-[--color]' : ''}`}
                  onClick={() => navigate(`/read-more/${item.id}`)}
                >
                  <div
                    className={`icon-link cursor-pointer ${item.id === id ? 'active' : ''}`}
                    dangerouslySetInnerHTML={{ __html: arrowRight_icon }}
                  />
                  <div className=""> {item.name}</div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReadMore
