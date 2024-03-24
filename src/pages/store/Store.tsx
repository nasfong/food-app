import { useGlobalData } from '@/hook/useGlobalData';
import { TableWithStripedRows } from '@/widgets/Table';

const Store = () => {
  const { card, removeCard } = useGlobalData()
  const handleDelete = async (id: number) => {
    await removeCard(id)
  }
  console.log(card)
  return (
    <div>
      <div className='h-[300px]'></div>
      <div className='bg-gray-100'>Card</div>
      <div className='container'>
        <TableWithStripedRows data={card} handleDelete={handleDelete} />
      </div>
    </div>
  )
}

export default Store