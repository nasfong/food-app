import { useQuery } from '@tanstack/react-query'
import BackgroundBlur from './components/BackgroundBlur'
import FoodCard from './components/FoodCard'
import RelateProduct from './components/RelateProduct'
import Reviewer from './components/Reviewer'
import { useParams } from 'react-router-dom'
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

const ShopDetail = () => {
  const { foodId, foodType } = useParams()
  const { addCard } = useGlobalData()
  const { data } = useQuery<FoodQuery>({
    queryKey: ['food'],
    queryFn: () =>
      axios.get('/food').then((res) => res.data),
  })
  const { data: dataComment, refetch } = useQuery<any[]>({
    queryKey: ['comment', { food: foodId }],
    queryFn: () =>
      axios.get('/comment', { params: { food: foodId } }).then((res) => res.data),
  })

  const handleAddCard = (data: any, quantity: number) => {
    addCard(data, quantity)
  }

  return (
    <div>
      <BackgroundBlur image={data?.data.find(item => item._id === foodId)?.image} />
      <FoodCard data={data?.data?.find(item => item._id === foodId)} handleAddCard={handleAddCard} />
      <RelateProduct
        data={data?.data.filter(item => item.foodType === foodType && item._id !== foodId)}
        handleAddCard={handleAddCard}
      />
      <Reviewer
        data={dataComment}
        dataFood={data?.data.find(item => item._id === foodId)}
        refetch={refetch}
      />

    </div>
  )
}

export default ShopDetail
