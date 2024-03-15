import Food from './components/Food'
import Promotion from './components/Promotion'
import RadomDish from './components/RadomDish'
import CallUs from './components/CallUs'
import FoodCard from './components/FoodCard'
import LatestNews from './components/LatestNews'
import Testimonials from './components/Testimonials'
import Map from './components/Map'
import Footer from './components/Footer'
import Slider from './components/Silider'

const Home = () => {
  return (
    <div>
      <Slider/>
      <Food />
      <Promotion />
      <RadomDish />
      <CallUs />
      <FoodCard />
      <LatestNews />
      <Testimonials />
      {/* <Map /> */}
      <Footer />
    </div>
  )
}

export default Home