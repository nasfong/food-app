import { FacebookOutlined, Telegram } from '@mui/icons-material';
import '../styles/footer.css'
import { IconButton } from '@mui/material';

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 text-center bg-[#23262B] text-white p-12 relative">
        <div className="">
          <div className='text-2xl text-[#CB933D] mb-3'>Contact US</div>
          <div>123 Main Street, Uni 21, New York City</div>
          <div>+38 (012) 34 56 789</div>
          <div>Mon - Fri: 08:00 - 22:00</div>
          <div>Sat - Sun: 10:00 - 23:00</div>
        </div>
      </div>
      <div className="md:w-1/2 text-center bg-[#1A2124] p-12 text-white relative">
        <div className="">
          <div className='text-2xl text-[#CB933D] mb-3'>Follow Us</div>
          <div>Join us on social networks</div>
          <IconButton size="large">
            <FacebookOutlined sx={{ color: '#fff' }} fontSize='large' />
          </IconButton>
          <IconButton size="large">
            <Telegram sx={{ color: '#fff' }} fontSize='large' />
          </IconButton>
          <IconButton size="large">
            <img src="/svg/tiktok.svg" alt="" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Footer;
