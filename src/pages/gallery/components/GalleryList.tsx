import { Box, Button, Modal } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
interface FormData {
  _id: string
  image: string
}

interface IGallery {
  _id: string
  image: string
}

const GalleryList = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<FormData>();
  const { data, refetch } = useQuery<IGallery[]>({
    queryKey: ['gallery'],
    queryFn: () =>
      axios.get('/gallery').then((res) =>
        res.data,
      ),
  })
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    reset({})
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    reset({})
  }

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.image[0]); // Access the first file in the FileList
      return axios.post('/gallery', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then(() => {
        refetch()
        handleClose()
        reset()
      })
    },
  })


  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/gallery/${id}`).then(() => {
        refetch()
      })
    },
  })
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) => {
      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.image[0]); // Access the first file in the FileList
      formDataToSend.append('_method', 'PUT')
      return axios.put(`/gallery/${formData._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then(() => {
        refetch();
        handleClose();
        reset();
      })
    },
  })
  const handleEdit = (data: any) => {
    reset({ ...data })
    handleOpen()
  }

  const onSubmit = (data: any) => {
    const image = data.image[0] ? data.image : null
    console.log(image)
    if (data._id) updateMutation.mutate({ ...data, image }, data._id)
    else mutation.mutate(data)
  }
  return (
    <div className='container my-20'>
      <div className='text-end'>
        <Button variant='contained' onClick={handleOpen}>Add Food</Button>
      </div>
      <PhotoProvider>
        <div className=" flex flex-wrap">
          {data?.map((item, index) => (
            <div key={index}>
              <PhotoView src={item.image}>
                <img
                  src={item.image}
                  alt=""
                  className='object-cover h-48 w-96 m-6'
                />
              </PhotoView>
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleEdit(item)}
              >Edit</Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => handleDelete(item._id)}
              >Delete</Button>
            </div>
          ))}
        </div>
      </PhotoProvider>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <input type="file" {...register('image')} />
            <Button variant='contained' type='submit'>
              Create
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  )
}

export default GalleryList