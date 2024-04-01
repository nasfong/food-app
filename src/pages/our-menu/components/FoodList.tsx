import '../../../ramdomDish.css';
import RandomCard from '@/components/RandomCard';

const FoodList = ({ data }: any) => {
  return (
    <div className="container my-12">
      <div className='mb-12 text-center'>
        <div className='form-to'>Don't Miss</div>
        <div className='title'>TODAY'S OFFER</div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8'>
        {data?.map((item: any, index: any) => (
          <RandomCard item={item} index={index} key={index}  />
        ))}
      </div>
    </div>
  );
};

export default FoodList;
