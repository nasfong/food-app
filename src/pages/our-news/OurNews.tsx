// import { useQuery } from "@tanstack/react-query"
import News from "./components/News"
// import axios from "axios"
import Background from "@/components/Background"

const OurNews = () => {
  // const { data, refetch } = useQuery<any[]>({
  //   queryKey: ['our-new'],
  //   queryFn: () =>
  //     axios.get('/our-new').then((res) => res.data),
  // })
  return (
    <section>
      <Background data={{ image: 'https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg', title: 'Our News' }} />
      <News
      // data={data}
      // refetch={refetch} 
      />
    </section>
  )
}

export default OurNews