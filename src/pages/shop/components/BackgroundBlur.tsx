import { default_image } from "@/constant/constant";

const BackgroundBlur = ({ image }: any) => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 object-cover w-full h-full blur-xl opacity-80 brightness-50"
        style={{ height: '60vh' }}
        onError={(e) => {
          (e.target as any).src = default_image
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default BackgroundBlur;
