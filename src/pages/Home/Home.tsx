import Slider from '@/pages/Home/components/Silider'
import Food from './components/Food'
import Promotion from './components/Promotion'
import RadomDish from './components/RadomDish'
import CallUs from './components/CallUs'

const Home = () => {
  return (
    <div>
      {/* <Slider images={[
        "https://drurybuildings.com/wp-content/uploads/2023/02/DRURY-BUILDINGS-20-1450x750.jpg",
        "https://images.communicatorcloud.com/cloud/imagecontainer/f6954784-b534-4604-b458-98d6856a5878.jpg?maxWidth=1280&format=jpg&quality=90",
        "https://glamadelaide.com.au/wp-content/uploads/2023/10/trak-5.jpg"
      ]}
        interval={5000}
      /> */}

      <Food />
      <Promotion />
      <RadomDish />
      <CallUs />
    </div>
  )
}

export default Home