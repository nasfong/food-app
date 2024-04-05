import { useQuery } from "@tanstack/react-query"
import FoodList from "./components/FoodList"
import SlideWithCard from "./components/SlideWithCard"
import axios from "axios";
import Background from "@/components/Background";

const OurMenu = () => {
  const { data } = useQuery<any[]>({
    queryKey: ['/food/our-menu', { chef: true }],
    queryFn: () =>
      axios.get('/food/our-menu').then((res) => res.data),
  })

  return (
    <div>
      <Background data={{ image: 'https://wallpapers.com/images/hd/food-4k-1vrcb0mw76zcg4qf.jpg', title: 'Our Menu' }} />
      {data?.map((item: any, index: any) => (
        <div key={index}>
          <FoodList data={item.child} />
          <SlideWithCard data={item.parent} />
        </div>
      ))}
    </div>
  )
}

export default OurMenu