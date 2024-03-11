import '../../../ramdomDish.css'

const cards = [
  {
    image: 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-4-105x105.jpg',
    name: 'Roast Duck Breast',
    price: '14.50',
    detail: 'Roasted duck breast (served pink) with gratin potato and a griottine cherry sauce'
  },
  {
    image: 'https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-2-105x105.jpg',
    name: 'Chicken and Walnut Salad',
    price: '10.95',
    detail: 'Chargrilled chicken with avocado, baby gem lettuce, baby spinach, shallots, French beans, walnuts, croutons and a mustard dressing'
  }
]

const RadomDish = () => {

  return (
    <div className="text-center">
      <p>- Random Dishes -</p>
      <h1>FROM OUR MENU</h1>
      <div>
        {cards.map((item, index) => (
          <div key={index} className="flex">
            <div className="circular-top-left-image">
              <img src={item.image} alt="Your Image" className='rounded-corner-img' />
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