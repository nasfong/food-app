import { FacebookOutlined, Telegram } from '@mui/icons-material';
import '../styles/footer.css'
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { address, facebook, holiday, phone, telegram, tiktok, weekday } from '@/constant/constant';
import { facebook_icon, telegram_icon, tiktok_icon } from '@/constant/data';

const Footer = () => {
  const navigate = useNavigate()
  function handleSocial(url: string) {
    navigate(url)
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 text-center bg-[#23262B] text-white p-12 relative">
        <div className="">
          <div className='text-2xl text-[#CB933D] mb-3'>Contact US</div>
          <div>{address}</div>
          <div>{phone}</div>
          <div>{weekday}</div>
          <div>{holiday}</div>
        </div>
      </div>
      <div className="md:w-1/2 text-center bg-[#1A2124] p-12 text-white relative">
        <div className="">
          <div className='text-2xl text-[#CB933D] mb-3'>Follow Us</div>
          <div>Join us on social networks</div>
          <IconButton size="large" onClick={() => handleSocial(facebook)}>
            <div
              className='icon-footer icon-hover'
              dangerouslySetInnerHTML={{ __html: facebook_icon }}
            />
          </IconButton>
          <IconButton size="large" onClick={() => handleSocial(telegram)}>
            <div
              className='icon-footer icon-hover'
              dangerouslySetInnerHTML={{ __html: telegram_icon }}
            />
          </IconButton>
          <IconButton size="large" onClick={() => handleSocial(tiktok)}>
            <div
              className='icon-footer icon-hover'
              dangerouslySetInnerHTML={{ __html: tiktok_icon }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Footer;
