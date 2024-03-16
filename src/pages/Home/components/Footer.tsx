import '../styles/footer.css'
const Footer = () => {
  return (
    <div className="flex">
      <div className="w-1/2 text-center bg-[#23262B] text-white p-12 relative">
        <div className="">
          <div>Contact US</div>
          <div>123 Main Street, Uni 21, New York City</div>
          <div>+38 (012) 34 56 789</div>
          <div>Mon - Fri: 08:00 - 22:00</div>
          <div>Sat - Sun: 10:00 - 23:00</div>
        </div>
      </div>
      <div className="w-1/2 text-center bg-[#1A2124] p-12 text-white relative">
        <div className="">
          <div>Follow Us</div>
          <div>Join us on social networks</div>
          <button>Facebook</button>
          <button>Instagram</button>
          <button>Telegram</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
