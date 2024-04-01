import Food from './components/Food'
import Promotion from './components/Promotion'
import RadomDish from './components/RadomDish'
import CallUs from './components/CallUs'
import ChefRecommend from './components/ChefRecommend'
import LatestNews from './components/LatestNews'
import Testimonials from './components/Testimonials'
import Map from './components/Map'
import Slider from './components/Silider'
import { useQuery, } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalData } from '@/hook/useGlobalData'
import { useCallback } from 'react'
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

// function getRandomSubarray(array: any[]) {
//   const index = Math.floor(Math.random() * (array.length - 1)); // Random index to start the subarray
//   return array?.slice(index, index + 2); // Get subarray of length 2 starting from the random index
// }

const Home = () => {
  const { addCard } = useGlobalData()
  const { data } = useQuery<FoodQuery>({
    queryKey: ['food', { pageSize: 6, chef: true }],
    queryFn: () =>
      axios.get('/food', { params: { pageSize: 6, chef: true } }).then((res) => res.data),
  })
  const { data: dataRandom } = useQuery<FoodQuery>({
    queryKey: ['/food/random/6'],
    queryFn: () =>
      axios.get('/food/random/6').then((res) => res.data),
  })
  const { data: dataFoodType } = useQuery<any[]>({
    queryKey: ['food-type'],
    queryFn: () =>
      axios.get('/food-type').then((res) =>
        res.data,
      ),
  })

  const handleAddCard = useCallback((item: any) => {
    addCard(item, 1)
  }, [addCard])

  return (
    <div>
      <Slider />
      <Food data={dataFoodType} />
      <Promotion />
      <RadomDish data={dataRandom} />
      <CallUs />
      <ChefRecommend data={data?.data} handleAddCard={handleAddCard} />
      <LatestNews />
      <Testimonials />
      <Map />
    </div>
  )
}

export default Home