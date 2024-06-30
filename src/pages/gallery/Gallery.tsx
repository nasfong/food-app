import Background from '@/components/Background'
import GalleryList from './components/GalleryList'

const Gallery = () => {
  return (
    <section>
      <Background data={{ image: '/image/gallery.jpg', title: 'Gallery' }} />
      <GalleryList />
    </section>
  )
}

export default Gallery