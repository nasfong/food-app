import { useGlobalData } from '@/hook/useGlobalData';
import { formatMoney } from '@/lib/utils';
import { TableWithStripedRows } from '@/widgets/Table';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const navigate = useNavigate()
  const { card, removeCard } = useGlobalData()
  const handleDelete = async (id: number) => {
    await removeCard(id)
  }

  const sum = card.reduce((accumulator, currentValue) => accumulator + (Number(currentValue.price) * currentValue.quantity), 0);
  return (
    <div>
      <div className='h-[100px]'></div>
      <div className='bg-gray-100 p-8 mb-20 text-2xl'>
        CARD
      </div>
      <div className='container'>
        <TableWithStripedRows data={card.slice().reverse()} handleDelete={handleDelete} />
        {/* Card */}
        <hr className='my-3' />
        <div className='flex flex-row justify-end'>
          <div className='mb-6 w-96'>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className='text-4xl my-6'>
                Cart totals
              </div>
              <div className='flex gap-20  my-6'>
                <div className='text-xl'>
                  Subtotal
                </div>
                <div className='font-bold'>
                  {formatMoney(sum)}
                </div>
              </div>
              <button
                className="text-white bg-[#d1a054] 
              hover:bg-black focus:ring-4 focus:outline-none 
              focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
              text-center dark:bg-blue-600 dark:hover:bg-blue-700 
              dark:focus:ring-blue-800"
                onClick={() => navigate('/contact-us')}
              >
                Contact for order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store