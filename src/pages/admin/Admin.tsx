import { Box, Button, Modal, TextField } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { default_image } from '@/constant/constant';

interface Food {
  _id: string;
  name: string;
  image: string
  star: number
  price: number
  description: string
}
interface FormData {
  _id: string
  name: string;
  image: string
  star: number
  price: number
  description: string
  foodType: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Admin = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<FormData>();
  const { data, refetch } = useQuery<Food[]>({
    queryKey: ['food'],
    queryFn: () =>
      axios.get('/food').then((res) =>
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
      formDataToSend.append('name', formData.name);
      formDataToSend.append('image', formData.image[0]); // Access the first file in the FileList
      formDataToSend.append('star', formData.star.toString());
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('description', formData.description);
      formDataToSend.append('foodType', formData.foodType);
      return axios.post('/food', formDataToSend, {
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
      return axios.delete(`/food/${id}`).then(() => {
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
      formDataToSend.append('name', formData.name);
      formDataToSend.append('image', formData.image[0]); // Access the first file in the FileList
      formDataToSend.append('star', formData.star.toString());
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('description', formData.description);
      formDataToSend.append('foodType', formData.foodType);
      formDataToSend.append('_method', 'PUT')
      return axios.put(`/food/${formData._id}`, formDataToSend, {
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
    <section className='mt-52'>
      <div className='container'>
        <div className='text-end'>
          <Button variant='contained' onClick={handleOpen}>Add Food</Button>
        </div>
        <div className="flex flex-wrap">
          {data?.map((item, index) => (
            <div key={index} className="w-[250px] border border-gray-200 bg-[#efefef] text-center rounded-xl relative my-5 mx-2">
              <Link to="/shop/salad/detail" className="w-full h-64 rounded overflow-hidden shadow-lg flex flex-col relative">
                <img
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt="Sunset in the mountains"
                  onError={(e) => {
                    (e.target as any).src = default_image
                  }}
                />
                <div className='absolute top-0 right-0 text-white bg-black p-4 bg-opacity-75'>${item.price}</div>
              </Link>
              <div className="px-8 flex-grow py-2">
                <div className="font-bold text-xl mb-2">{item.description}</div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
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
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={style}>
            <input type="file" {...register('image')} />
            <TextField
              {...register('name', { required: true })}
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name ? "First Name is required" : ""}
            />
            <TextField
              {...register('description', { required: true })}
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description ? "First Name is required" : ""}
            />
            <TextField
              {...register('star', { required: true })}
              label="Star"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.star}
              helperText={errors.star ? "First Name is required" : ""}
            />
            <TextField
              {...register('price', { required: true })}
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price ? "First Name is required" : ""}
            />
            <TextField
              {...register('foodType', { required: true })}
              label="Type"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.foodType}
              helperText={errors.foodType ? "First Name is required" : ""}
            />

            <Button variant='contained' type='submit'>
              Create
            </Button>
          </Box>
        </form>
      </Modal>
    </section>
  )
}

export default Admin