import Background from '@/components/Background'
import Map from '../Home/components/Map'
import VisitUs from './components/VisitUs'
import SendEmail from './components/SendEmail'

const ContactUs = () => {
  return (
    <section>
      <Background data={{ image: 'https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg', title: 'Contact us' }} />
      <div className='container'>
        <VisitUs />
        <SendEmail />
      </div>
      <Map />
    </section>
  )
}

export default ContactUs
