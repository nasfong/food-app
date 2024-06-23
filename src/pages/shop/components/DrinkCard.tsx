import { admin, default_image } from '@/constant/constant'
import { formatMoney, truncateDescription } from '@/lib/utils'
import { Check } from '@mui/icons-material'
import { Button, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'

const DrinkCard = ({
  item,
}: any) => {

  return (
    <div>
      <img
        src={item.image}
        alt=""
        className="object-cover w-100 h-100"
      />
      {item.name}
    </div>
  )
}

export default DrinkCard
