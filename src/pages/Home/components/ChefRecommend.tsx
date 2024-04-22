/* eslint-disable react-refresh/only-export-components */
import FoodCard from "@/components/FoodCard";
import { memo, useEffect, useState } from "react";

interface Food {
  _id: string;
  name: string;
  image: string;
  star: number;
  price: number;
  description: string;
  foodType: string;
  chef: boolean;
}

const ChefRecommend = ({ data, handleAddCard }: { data?: Food[]; handleAddCard: any }) => {
  const [cardStates, setCardStates] = useState<{ loading: boolean; checked: boolean; }[]>([]);

  useEffect(() => {
    if (data) {
      setCardStates(data.map(() => ({ loading: false, checked: false })));
    }
  }, [data]);

  const handleButtonClick = (index: number, item: Food) => {
    const newCardStates = [...cardStates];
    if (newCardStates[index]) {
      newCardStates[index].loading = true;
      setCardStates(newCardStates);
      setTimeout(() => {
        if (newCardStates[index]) {
          newCardStates[index].loading = false;
          newCardStates[index].checked = true;
          handleAddCard(item);
          setCardStates(newCardStates);
          setTimeout(() => {
            if (newCardStates[index]) {
              newCardStates[index].checked = false;
              setCardStates(newCardStates);
            }
          }, 3000);
        }
      }, 1500);
    }
  };

  return (
    <section className="my-20">
      <div className="text-center mb-6">
        <h2 className='form-to'>Should to Try</h2>
        <h3 className='title'>CHEF RECOMMENDS</h3>
      </div>
      <div className="flex flex-wrap justify-center">
        {data?.map((item: Food, index: number) => (
          <FoodCard key={index} item={item} index={index} handleButtonClick={handleButtonClick} cardStates={cardStates} />
        ))}
      </div>
    </section>
  );
};

export default memo(ChefRecommend);
