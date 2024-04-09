import Background from '@/components/Background'
import GalleryList from './components/GalleryList'

const Gallery = () => {
  return (
    <section>
      <Background data={{image: 'https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg', title: 'Gallery'}} />
      <GalleryList />
    </section>
  )
}

export default Gallery