import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useParams } from 'react-router-dom'
import { useGlobalData } from '@/hook/useGlobalData';
import { Pagination } from '@/components/Pagination';
import { admin } from '@/constant/constant';
import Background from '@/components/Background';
import Swal from 'sweetalert2'
import FoodCard from '@/components/FoodCard';

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
  const handleDelete = async (id: string) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
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

  const [cardStates, setCardStates] = useState<{ loading: boolean; checked: boolean; }[]>([]);

  useEffect(() => {
    if (data) {
      setCardStates(data?.data.map(() => ({ loading: false, checked: false })));
    }
  }, [data]);

  const handleButtonClick = (index: number, item: Food) => {
    const newCardStates = [...cardStates];
    if (newCardStates[index]) {
      newCardStates[index].loading = true;
      setCardStates(newCardStates);
      setTimeout(() => {
        if (newCardStates[index]) {
          newCardStates[index].loading = false;
          newCardStates[index].checked = true;
          handleAddCard(item);
          setCardStates(newCardStates);
          setTimeout(() => {
            if (newCardStates[index]) {
              newCardStates[index].checked = false;
              setCardStates(newCardStates);
            }
          }, 3000);
        }
      }, 1500);
    }
  };

  return (
    <>
      <Background data={foodTypeList?.find(item => item._id === foodType) || { image: 'https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg', title: 'Shop' }} />
      <div className='container text-center my-20'>
        <div className='mb-10 flex flex-wrap justify-start md:justify-center gap-3'>
          {foodTypeList?.map((item, index) => (
            <NavLink
              key={index}
              to={`/shop/${item._id}`}
              onClick={() => setCurrentPage(1)}
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
                    <FoodCard
                      key={index}
                      item={item}
                      index={index}
                      handleButtonClick={handleButtonClick}
                      cardStates={cardStates}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
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
                  value={watch('foodType') || '' || foodType}
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
