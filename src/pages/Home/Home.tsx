import Food from './components/Food'
import Promotion from './components/Promotion'
import RadomDish from './components/RadomDish'
import CallUs from './components/CallUs'
import FoodCard from './components/FoodCard'
import LatestNews from './components/LatestNews'
import Testimonials from './components/Testimonials'
import Map from './components/Map'
import Slider from './components/Silider'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalData } from '@/hook/useGlobalData'
interface Food {
  _id: string;
  name: string;
  image: string
  star: number
  price: number
  description: string
  foodType: string
  chef: boolean
}
interface FoodQuery {
  data: Food[]
  totalPages: number
  currentPage: number
}

function getRandomSubarray(array: any[]) {
  const index = Math.floor(Math.random() * (array.length - 1)); // Random index to start the subarray
  return array?.slice(index, index + 2); // Get subarray of length 2 starting from the random index
}

const Home = () => {
  const { addCard } = useGlobalData()
  const { data } = useQuery<FoodQuery>({
    queryKey: ['food', { chef: true }],
    queryFn: () =>
      axios.get('/food', { params: { pageSize: 6 } }).then((res) => res.data),
  })

  const handleAddCard = (data: any) => {
    addCard(data, 1)
  }

  return (
    <div>
      <Slider />
      <Food />
      <Promotion />
      <RadomDish data={data?.data} />
      <CallUs />
      <FoodCard data={data?.data && getRandomSubarray(data.data.filter(item => item.chef)) } handleAddCard={handleAddCard} />
      <LatestNews />
      <Testimonials />
      <Map />
    </div>
  )
}

export default Home