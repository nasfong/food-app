const cards = [
  {
    image: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
    name: 'Roast Duck Breast',
    price: '14.50',
    detail: 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce'
  },
  {
    image: 'https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg',
    name: 'Chicken and Walnut Salad',
    price: '10.95',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing'
  },
  {
    image: 'https://media.post.rvohealth.io/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg',
    name: 'Chicken and Walnut Salad',
    price: '10.95',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing'
  },
]

const RelateProduct = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {cards.map((item, index) => (
          <div key={index} className="w-full max-w-sm border border-gray-200 bg-[#efefef] text-center rounded-xl relative my-5 mx-2">
            <div className="w-full h-64 rounded overflow-hidden shadow-lg flex flex-col relative">
              <img className="w-full h-full object-cover" src={item.image} alt="Sunset in the mountains" />
              <div className='absolute top-0 right-0 text-white bg-black p-4 bg-opacity-75'>${item.price}</div>
            </div>
            <div className="px-8 flex-grow py-8">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet
              </p>
              <button className='button2 mt-5 p-2'style={{boxShadow: "0 0.2rem #e6bb65"}}>Add To Card</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelateProduct
