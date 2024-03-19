import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css';

const gallery = [
  "https://c.ndtvimg.com/2023-11/c4bp49g_restaurant-generic_625x300_21_November_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Barbieri_-_ViaSophia25668.jpg/1200px-Barbieri_-_ViaSophia25668.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/30/54/b2/bidri-ambience.jpg?w=1200&h=-1&s=1",
  "https://imageio.forbes.com/specials-images/imageserve/64988257f32c36acdf8daaa0/The-ceilings-at-Ajitama-restaurant-in-Lisbon-are-made-of-carvings-that-look-like/960x0.jpg?format=jpg&width=960",
  "https://6amcity.brightspotcdn.com/dims4/default/26f5f53/2147483647/strip/true/crop/1332x750+0+69/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk1-prod-sixam-city.s3.us-east-2.amazonaws.com%2Fbrightspot%2F0d%2F84%2F7c175b5e443092d969b6c19af3f5%2F393170483-18307701454185066-3288527068679201488-n.jpg",
  "https://www.timeoutdubai.com/cloud/timeoutdubai/2023/06/06/HTPbhCYv-Sushisamba-1200x897.jpg"
]

const GalleryList = () => {
  return (
    <div className='container my-20'>
      <PhotoProvider>
        <div className=" flex flex-wrap">
          {gallery.map((item, index) => (
            <PhotoView key={index} src={item}>
              <img
                src={item}
                alt=""
                className='object-cover h-48 w-96 m-6'
              />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </div>
  )
}

export default GalleryList