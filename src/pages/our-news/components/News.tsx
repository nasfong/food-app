import { Box, Button, Modal, TextField, useMediaQuery } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  _id: string
  name: string;
  image: string
  content: string
  date: string
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

const News = ({ data, refetch }: any) => {
  const matches = useMediaQuery('(min-width:768px)')
  const { handleSubmit, register, formState: { errors }, reset } = useForm<FormData>();
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
      formDataToSend.append('content', formData.content);
      formDataToSend.append('date', formData.date);
      return axios.post('/our-new', formDataToSend, {
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
      return axios.delete(`/our-new/${id}`).then(() => {
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
      formDataToSend.append('content', formData.content);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('_method', 'PUT')
      return axios.put(`/our-new/${formData._id}`, formDataToSend, {
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
    if (data._id) updateMutation.mutate({ ...data, image }, data._id)
    else mutation.mutate(data)
  }
  console.log(matches)
  return (
    <div className="container">
      <div className='text-end mt-3'>
        <Button variant='contained' onClick={handleOpen}>Add Our-New</Button>
      </div>
      {data?.map((item: any, index: any) => (
        <div
          key={index}
          className={`my-20 relative flex ${index % 2 && 'flex-row-reverse'} ${matches ? '' : 'flex-col'}`}
        >
          <img src={item.image} alt="" className="object-cover h-80 w-full md:w-[600px] rounded-sm" />
          <div
            className={`
            ${matches ? `absolute ${index % 2 ? 'top-1/2 right-1/2 translate-x-24' : 'top-1/2 left-1/2 '}
            transform -translate-x-24 -translate-y-1/2` : ``}       
            bg-[#EFEFEF] py-10 px-8 text-center
            shadow-xl
            `}
          >
            <div>{item.date}</div>
            <div className='font-bold text-2xl'>{item.name}</div>
            <div>{item.content}</div>
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
        </div>
      ))}
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
              {...register('content', { required: true })}
              label="Content"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.content}
              helperText={errors.content ? "First Name is required" : ""}
            />
            <TextField
              {...register('date', { required: true })}
              label="Date"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.date}
              helperText={errors.date ? "First Name is required" : ""}
            />
            <Button variant='contained' type='submit'>
              Create
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  )
}

export default News