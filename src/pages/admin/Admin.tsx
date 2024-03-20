import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'

interface Food {
  id: number;
  name: string;
  image: string
  star: number
  price: number
  description: string
}
interface FormData {
  name: string;
  image: string
  star: number
  price: number
  description: string
  type: string
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
  const { data } = useQuery<Food[]>({
    queryKey: ['food'],
    queryFn: () =>
      fetch('http://localhost:5000/food').then((res) =>
        res.json(),
      ),
  })
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: (formData: any) => {
      return fetch('/api', formData)
    },
  })
  const onSubmit = (event: any) => {
    event.preventDefault()
    mutation.mutate(new FormData(event.target))
  }

  return (
    <div className='mt-52'>
      <Button variant='contained' onClick={handleOpen}>Add Food</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={style}>
            <TextField
              {...register('name', { required: true })}
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.name} // Show error if validation fails
              helperText={errors.name ? "First Name is required" : ""}
            />
            <TextField
              {...register('description')}
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('star')}
              label="Star"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('price')}
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('type')}
              label="Type"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            <Button variant='contained' type='submit'>Create</Button>
          </Box>
        </form>
      </Modal>
      <div className="flex flex-wrap justify-center">
        {data?.map((item, index) => (
          <div key={index} className="w-full max-w-sm border border-gray-200 bg-[#efefef] text-center rounded-xl relative my-5 mx-2">
            <Link to="/shop/salad/detail" className="w-full h-64 rounded overflow-hidden shadow-lg flex flex-col relative">
              <img className="w-full h-full object-cover" src={item.image} alt="Sunset in the mountains" />
              <div className='absolute top-0 right-0 text-white bg-black p-4 bg-opacity-75'>${item.price}</div>
            </Link>
            <div className="px-8 flex-grow py-8">
              <div className="font-bold text-xl mb-2">{item.description}</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet
              </p>
              <button className='button2 mt-5 p-2' style={{ boxShadow: "0 0.2rem #e6bb65" }}>Add To Card</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin