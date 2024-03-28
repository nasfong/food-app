import FoodCard from "@/components/FoodCard"
import { useEffect, useState } from "react";

const RelateProduct = ({ data,handleAddCard }: any) => {
  const [cardStates, setCardStates] = useState<{ loading: boolean; checked: boolean; }[]>([]);

  useEffect(() => {
    if (data) {
      setCardStates(data.map(() => ({ loading: false, checked: false })));
    }
  }, [data]);

  const handleButtonClick = (index: number, item: any) => {
    const newCardStates = [...cardStates];
    if (newCardStates[index]) {
      newCardStates[index].loading = true;
      setCardStates(newCardStates);
      setTimeout(() => {
        if (newCardStates[index]) {
          newCardStates[index].loading = false;
          newCardStates[index].checked = true;
          handleAddCard(item, 1);
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
    <div className="text-center mt-20">
      <div className="title">
        RELATED PRODUCTS
      </div>
      <div className="flex flex-wrap justify-center mt-10">
        {data?.map((item: any, index: any) => (
          <FoodCard
            key={index}
            index={index}
            item={item}
            handleButtonClick={handleButtonClick}
            cardStates={cardStates}
          />
        ))}
      </div>
    </div>
  )
}

export default RelateProduct
