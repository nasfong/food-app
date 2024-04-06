import { Box, Button, Modal } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { LoadingButton } from '@mui/lab'
import 'react-photo-view/dist/react-photo-view.css';
import { admin, default_image } from '@/constant/constant';
interface FormData {
  _id: string
  image: string
}

interface IGallery {
  _id: string
  image: string
}

const GalleryList = () => {
  const [ImagePreview, setImagePreview] = useState<any>('')
  const initState = {
    _id: '',
    image: '',
  }
  const [formInput, setFormInput] = useState<any>(initState)
  const { data, refetch } = useQuery<IGallery[]>({
    queryKey: ['gallery'],
    queryFn: () =>
      axios.get('/gallery').then((res) =>
        res.data,
      ),
  })
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setFormInput(initState)
    setImagePreview('')
    mutation.reset()
  }

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

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      if (formData._id) {
        const formDataToSend = new FormData();
        if (formData.image) {
          formDataToSend.append('image', formData.image)
        }
        formDataToSend.append('_method', 'PUT')
        return axios.put(`/gallery/${formData._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(() => {
          refetch();
          handleClose();
          setFormInput(initState)
        })
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append('image', formData.image); // Access the first file in the FileList
        return axios.post('/gallery', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(() => {
          refetch()
          handleClose()
          setFormInput(initState)
        })
      }

    },
  })

  const handleChangeImage = (e: any) => {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return

    const file = files[0]
    setFormInput({ ...formInput, image: file })
    const reader = new FileReader()
    reader.onloadend = function (e) {
      setImagePreview(e.target?.result)
    }
    reader.readAsDataURL(file)
  }

  const handleEdit = (data: any) => {
    setFormInput({ ...data })
    setImagePreview(data.image)
    handleOpen()
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(formInput);
  };
  return (
    <div className='container my-20'>
      {admin && (
        <div className='text-end mb-6'>
          <Button variant='contained' onClick={handleOpen}>Add Food</Button>
        </div>
      )}
      <PhotoProvider>
        <div className="flex flex-wrap justify-center gap-3">
          {data?.map((item, index) => (
            <div key={index} className=' w-full md:w-1/2 lg:w-1/3 xl:w-1/4  h-full md:h-1/2 lg:h-1/3 xl:h-1/4'>
              <PhotoView src={item.image}>
                <img
                  src={item.image}
                  alt=""
                  className='object-cover h-full max-w-full'
                  onError={(e) => {
                    (e.target as any).src = default_image
                  }}
                />
              </PhotoView>
              <div className='mt-3'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => handleEdit(item)}
                >Edit</Button> {' '}
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => handleDelete(item._id)}
                >Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </PhotoProvider>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={onSubmit}>
          <Box sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflowY: 'scroll',
            height: '50vh',
            display: 'block'
          }}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              name='image'
              onChange={handleChangeImage}
              accept="image/*"
            />
            {ImagePreview && (
              <img
                src={ImagePreview}
                className='h-[200px] w-full'
                alt=""
                onError={(e) => {
                  (e.target as any).src = default_image
                }}
              />
            )}
            <div className='text-red-700'>
              {mutation.isError && (mutation.error as any).response.data.message}
            </div>
            <div className='mt-10'>
              <LoadingButton
                loading={mutation.isPending}
                variant='contained'
                type='submit'
              >
                Create
              </LoadingButton>
            </div>
          </Box>
        </form>
      </Modal>
    </div>
  )
}

export default GalleryList