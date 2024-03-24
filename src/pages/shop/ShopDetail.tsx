import { useQuery } from '@tanstack/react-query'
import BackgroundBlur from './components/BackgroundBlur'
import FoodCard from './components/FoodCard'
import RelateProduct from './components/RelateProduct'
import Reviewer from './components/Reviewer'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useGlobalData } from '@/hook/useGlobalData'

const ShopDetail = () => {
  const { foodId, foodType } = useParams()
  const { addCard } = useGlobalData()
  const { data } = useQuery<any[]>({
    queryKey: ['food'],
    queryFn: () =>
      axios.get('/food').then((res) => res.data),
  })
  const { data: dataComment } = useQuery<any[]>({
    queryKey: ['comment'],
    queryFn: () =>
      axios.get('/comment').then((res) => res.data),
  })

  const handleAddCard = async (data: any, quantity: number) => {
    await addCard(data, quantity)
  }

  return (
    <div>
      <BackgroundBlur image={data?.find(item => item._id === foodId).image} />
      <FoodCard data={data?.find(item => item._id === foodId)} handleAddCard={handleAddCard} />
      <RelateProduct data={data?.filter(item => item.foodType === foodType && item._id !== foodId)} />
      <Reviewer data={dataComment} />

    </div>
  )
}

export default ShopDetail
