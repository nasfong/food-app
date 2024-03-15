import '../../../ramdomDish.css'

const cards = [
  {
    image: 'https://zipchecklist.com/assets/images/collections/how-to-get-high-quality-food-in-your-diet-1652980366-3937-800-f839d60e8.webp',
    name: 'Roast Duck Breast',
    price: '14.50',
    detail: 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce'
  },
  {
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/10/31/61/a8/food-made-with-high-quality.jpg',
    name: 'Chicken and Walnut Salad',
    price: '10.95',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing'
  }
]

const RadomDish = () => {

  return (
    <div className="container text-center">
      <p>- Random Dishes -</p>
      <h1>FROM OUR MENU</h1>
      <div className='grid grid-cols-2 gap-4'>
        {cards.map((item, index) => (
          <div key={index} className="flex">
            <div className="circular-top-left-image">
              <img src={item.image} alt="Your Image" className='rounded-corner-img h-[95px] w-[95px]' />
            </div>
            <div>
              <div className="flex justify-between">
                <div>
                  {item.name}
                </div>
                <div>
                  {item.price}
                </div>
              </div>
              <div>
                {item.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button>View Full Menu</button>
    </div>
  )
}

export default RadomDish