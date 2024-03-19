
const BackgroundBlur = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src="https://www.cnet.com/a/img/resize/69256d2623afcbaa911f08edc45fb2d3f6a8e172/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=675&width=1200"
        alt=""
        className="absolute inset-0 object-cover w-full h-full blur-xl opacity-80 brightness-50"
        style={{ height: '80vh' }}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default BackgroundBlur;
