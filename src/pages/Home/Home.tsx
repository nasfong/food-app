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

const Home = () => {
  const { addCard } = useGlobalData()
  const { data } = useQuery<any>({
    queryKey: ['food', { chef: true }],
    queryFn: () =>
      axios.get('/food', { params: { chef: true, pageSize:3 } }).then((res) => res.data),
  })

  const handleAddCard = (data: any) => {
    addCard(data, 1)
  }
  
  return (
    <div>
      <Slider />
      <Food />
      <Promotion />
      <RadomDish />
      <CallUs />
      <FoodCard data={data?.data} handleAddCard={handleAddCard} />
      <LatestNews />
      <Testimonials />
      <Map />
    </div>
  )
}

export default Home