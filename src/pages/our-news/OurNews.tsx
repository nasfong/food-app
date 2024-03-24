import { useQuery } from "@tanstack/react-query"
import BackgroundImage from "./components/BackgroundImage"
import News from "./components/News"
import axios from "axios"

const OurNews = () => {
  const { data, refetch } = useQuery<any[]>({
    queryKey: ['our-new'],
    queryFn: () =>
      axios.get('/our-new').then((res) => res.data),
  })
  return (
    <div>
      <BackgroundImage />
      <News data={data} refetch={refetch} />
    </div>
  )
}

export default OurNews