import '../../../ramdomDish.css';
import { useNavigate } from 'react-router-dom';
import RandomCard from '@/components/RandomCard';

const RadomDish = ({ data }: any) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/our-menu')
  }

  return (
    <div className="container my-20">
      <div className='mb-12 text-center'>
        <div className='form-to'>Random Dishes</div>
        <div className='title'>FROM OUR MENU</div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8'>
        {data?.map((item: any, index: any) => (
          <RandomCard item={item} index={index} key={index} />
        ))}
      </div>
      <div className='text-center'>
        <button className='text-black button1 mt-10' onClick={handleClick}>View Full Menu</button>
      </div>
    </div>
  );
};

export default RadomDish;
