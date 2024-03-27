import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, NavLink, useParams } from 'react-router-dom'
import BackgroundImage from './BackgroundImage';
import { useGlobalData } from '@/hook/useGlobalData';
import { Pagination } from '@/components/Pagination';
import { formatMoney, truncateDescription } from '@/lib/utils';
import { admin } from '@/constant/constant';

interface Food {
  _id: string;
  name: string;
  image: string
  star: number
  price: number
  description: string
  foodType: string
  chef: boolean
}
interface FoodQuery {
  data: Food[]
  totalPages: number
  currentPage: number
}
interface FormData {
  _id: string
  name: string;
  image: string
  star: number
  price: number
  description: string
  foodType: string
  chef: boolean
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

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { handleSubmit, register, formState: { errors }, reset, watch } = useForm<FormData>();
  const { data: foodTypeList } = useQuery<Food[]>({
    queryKey: ['food-type'],
    queryFn: () =>
      axios.get('/food-type').then((res) =>
        res.data,
      ),
  })
  const { foodType } = useParams()
  const { data, refetch, isLoading, error } = useQuery<FoodQuery>({
    queryKey: ['food', { foodType: foodType, pageSize: 3, page: currentPage }],
    queryFn: () =>
      axios.get('/food', { params: { foodType: foodType, pageSize: 3, page: currentPage } }).then((res) => res.data),
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
      formDataToSend.append('chef', formData.chef.toString());
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
      formDataToSend.append('chef', formData.chef.toString());
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
    if (data._id) updateMutation.mutate({ ...data, image }, data._id)
    else mutation.mutate(data)
  }
  const { addCard } = useGlobalData()

  const handleAddCard = async (data: any) => {
    await addCard(data, 1)
  }

  return (
    <>
      <BackgroundImage data={foodTypeList?.find(item => item._id === foodType)} />
      <div className='container text-center my-20'>
        <div className='mb-10 flex flex-wrap justify-start md:justify-center gap-3'>
          {foodTypeList?.map((item, index) => (
            <NavLink
              key={index}
              to={`/shop/${item._id}`}
              className={`
            uppercase mx-5 
            hover:border-b border-[#CB933D] 
            hover:text-[#CB933D]
            transition-colors duration-500 ease-in-out
            ${item._id === foodType ? 'text-[#CB933D] text-xl border-b border-[#CB933D]' : ''}
            `}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className='text-end'>
          {admin && (
            <Button variant='contained' onClick={handleOpen}>Add Food</Button>
          )}
        </div>
        <div className="flex flex-wrap justify-center">
          {error ? (<div className='py-32'>Something went wrong!</div>)
            : isLoading ? <div className='py-32'>Loading...</div>
              : !data?.data.length ? <div className='py-32'>No Food</div> :
                <>
                  {data?.data.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col w-full max-w-sm border bg-[#efefef] text-center relative my-5 mx-2 hover:shadow-xl transition"
                      style={{ minHeight: "300px" }} // Set a minimum height for each item
                    >
                      <Link
                        to={`/shop/${item._id}/${item.foodType}/detail`}
                        className=""
                      >
                        <img className="w-full h-52 object-cover" src={item.image} alt="Sunset in the mountains" />
                        <div className='absolute top-0 right-0 text-white bg-black p-4 bg-opacity-75'>
                          {formatMoney(item.price)}
                        </div>
                      </Link>
                      <div className='relative'>
                        <div className="flex-grow px-8 py-6 flex flex-col items-center justify-between">
                          <div className='border-dashed border border-gray-400 absolute top-[10px] bottom-[10px] left-[10px] right-[10px]'></div>
                          <div>
                            <div className="font-bold text-xl mb-2">{item.name}</div>
                            <p className="text-gray-700 text-base">
                              {truncateDescription(item.description, 100)}
                            </p>
                          </div>
                          <button
                            className='button2 mt-5 p-2 relative z-10'
                            style={{ boxShadow: "0 0.2rem #e6bb65" }}
                            onClick={() => handleAddCard(item)}
                          >
                            Add Card
                          </button>
                        </div>
                        {admin && (
                          <div className='mb-3'>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => handleEdit(item)}
                              size='small'
                            >Edit</Button> {' '}
                            <Button
                              variant='contained'
                              color='error'
                              onClick={() => handleDelete(item._id)}
                              size='small'
                            >Delete</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
          }
        </div>

        {data?.totalPages ? <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={data.totalPages} /> : null}

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
                type='number'
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
                type='number'
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price ? "First Name is required" : ""}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Food Type</InputLabel>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  {...register('foodType')} // Registering the input
                  value={watch('foodType') || ''}
                >
                  {foodTypeList?.map((item) => (
                    <MenuItem
                      key={item._id}
                      value={item._id}
                    >{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={<Checkbox checked={watch('chef')} />}
                {...register('chef')}
                label="Chef Recommend"
                sx={{ width: '100%' }}
              />

              <Button variant='contained' type='submit'>
                Create
              </Button>
            </Box>
          </form>
        </Modal>
      </div>
    </>
  )
}

export default Body
