
const BackgroundBlur = ({ image }: any) => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 object-cover w-full h-full blur-xl opacity-80 brightness-50"
        style={{ height: '60vh' }}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default BackgroundBlur;
