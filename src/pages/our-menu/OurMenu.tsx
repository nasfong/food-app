import { useQuery } from "@tanstack/react-query"
import FoodList from "./components/FoodList"
import SlideWithCard from "./components/SlideWithCard"
import axios from "axios";
import Background from "@/components/Background";

const OurMenu = () => {
  const { data, error, isLoading } = useQuery<any[]>({
    queryKey: ['/food/our-menu', { chef: true }],
    queryFn: () =>
      axios.get('/food/our-menu').then((res) => res.data),
  })

  return (
    <section>
      <Background data={{ image: '/image/our-menu.jpg', title: 'Our Menu' }} />
      {error ? (<div className='py-32'>Sorry something went wrong!</div>)
        : isLoading ? <div className='py-32 text-center'>Loading...</div>
          : !data.length ? <div className='py-32 text-center'>No Food</div> :
            <>
              {data?.map((item: any, index: any) => (
                <div key={index}>
                  <FoodList data={item.child} />
                  <SlideWithCard data={item.parent} />
                </div>
              ))}
            </>
      }

    </section>
  )
}

export default OurMenu