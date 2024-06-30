import Background from '@/components/Background'
import Map from '../Home/components/Map'
import VisitUs from './components/VisitUs'
import SendEmail from './components/SendEmail'

const ContactUs = () => {
  return (
    <section>
      <Background data={{ image: '/image/contact-us.jpg', title: 'Contact us' }} />
      <div className='container'>
        <VisitUs />
        <SendEmail />
      </div>
      <Map />
    </section>
  )
}

export default ContactUs
