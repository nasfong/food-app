import { useGlobalData } from '@/hook/useGlobalData';
import { TableWithStripedRows } from '@/widgets/Table';

const Store = () => {
  const { card, removeCard } = useGlobalData()
  const handleDelete = async (id: number) => {
    await removeCard(id)
  }
  return (
    <div>
      <div className='h-[122px]'></div>
      <div className='bg-gray-100 p-8 mb-20 text-2xl'>
        CARD
      </div>
      <div className='container'>
        <TableWithStripedRows data={card} handleDelete={handleDelete} />
      </div>
    </div>
  )
}

export default Store