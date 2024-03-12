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
  }
]

const FoodCard = () => {
  return (
    <div>
      <div className="text-center">
        <p>- Should to Try -</p>
        <h1>CHEF RECOMMENDS</h1>
      </div>
      <div className="flex flex-wrap justify-center space-x-5">
        {cards.map((item, index) => (
          <div key={index} className="w-full max-w-sm border border-gray-200 bg-[#efefef]">
            <div className="w-full h-64 rounded overflow-hidden shadow-lg">
              <img className="w-full h-full object-cover" src={item.image} alt="Sunset in the mountains" />
            </div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add Card
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default FoodCard
