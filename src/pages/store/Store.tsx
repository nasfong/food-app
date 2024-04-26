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
    <section>
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
            <div className="max-w-sm p-">
              <div className='text-4xl my-6 uppercase'>
                Cart totals
              </div>
              <hr className='' />
              <div className='flex gap-20  my-6'>
                <div className='text-xl uppercase'>
                  TOTAL
                </div>
                <div className='font-bold'>
                  {formatMoney(sum)}
                </div>
              </div>
              <hr className='mt-3 mb-8' />
              <button
                className="text-white bg-[#d1a054] 
              hover:bg-black focus:ring-4 focus:outline-none 
              focus:ring-blue-300 font-medium text-sm px-5 py-2.5 
              text-center dark:bg-blue-600 dark:hover:bg-blue-700 
              dark:focus:ring-blue-800"
                onClick={() => navigate('/contact-us')}
              >
                CONTACT FOR ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Store