import React, { useState } from 'react';
import '../../../ramdomDish.css';

const cards = [
  {
    image: 'https://imgs.search.brave.com/MGRW7P0IM5skWhtyB5Zm-htpo2-zzgGIY2LX2vD9FWc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9sYXJnZS1ib3ds/LWZvb2Qtd2l0aC1m/aXNoLXZlZ2V0YWJs/ZXNfMTk3NDYzLTI0/MDUuanBnP3NpemU9/NjI2JmV4dD1qcGc',
    name: 'Roast Duck Breast',
    price: '14.50',
    detail: 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce'
  },
  {
    image: 'https://imgs.search.brave.com/m5uimNhN8PWgJ-xav3Qvom0MQJOuba3GLlWrhgWiehw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9ocmx0eDEy/cGw4aHEvMmYxUHEy/eThhcVVYV2dWU0No/MWNONC9kZmU1MWUy/MDRjYmVmOGZkZjA0/OWIzMWY4OWE2NWUw/NS9mb29kLWFuZC1k/cmluay1pbWFnZXMu/anBnP2ZpdD1maWxs/Jnc9NjAwJmg9NDAw',
    name: 'Chicken and Walnut Salad',
    price: '10.95',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing'
  },
  {
    image: 'https://imgs.search.brave.com/m5uimNhN8PWgJ-xav3Qvom0MQJOuba3GLlWrhgWiehw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9ocmx0eDEy/cGw4aHEvMmYxUHEy/eThhcVVYV2dWU0No/MWNONC9kZmU1MWUy/MDRjYmVmOGZkZjA0/OWIzMWY4OWE2NWUw/NS9mb29kLWFuZC1k/cmluay1pbWFnZXMu/anBnP2ZpdD1maWxs/Jnc9NjAwJmg9NDAw',
    name: 'Chicken and Walnut Salad',
    price: '10.95',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing'
  }
];

const FoodList = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div className="container my-12">
      <div className='mb-12 text-center'>
        <div className='form-to'>Random Dishes</div>
        <div className='title'>FROM OUR MENU</div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8'>
        {cards.map((item, index) => (
          <div key={index} className="relative flex">
            <img
              src={item.image}
              className='rounded-corner-img'
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            />
            <div className='ml-2'>
              <div className="flex justify-between font-bold text-[var(--color)]">
                <div>{item.name}</div>
                <div>${item.price}</div>
              </div>
              <div className="my-1 flex items-start">{item.detail}</div>
            </div>
            {hoveredIndex === index && (
              <div className="absolute top-[-230px] left-20 bg-white border-2 border-gray-300 rounded p-2 shadow z-10">
                <img src={item.image} alt="Popup Image" className="w-48 h-48 object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodList;
