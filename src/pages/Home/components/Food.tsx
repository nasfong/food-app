import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

import './../../../food.css'
import { useNavigate } from 'react-router-dom';
import { admin, default_image } from '@/constant/constant';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Button, Modal } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface FormData {
  _id: string
  name: string;
  image: string
  description: string
}

const style = {
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
  height: '60vh',
  display: 'block'
};

const Food = ({ data, refetch, isLoading, error }: any) => {
  const navigate = useNavigate()
  const handleClick = (foodType: string) => {
    navigate(`shop/${foodType}`)
  }

  const initState = {
    _id: '',
    image: '',
    name: '',
    description: '',
  }
  const [formInput, setFormInput] = useState<any>(initState)
  const [ImagePreview, setImagePreview] = useState<any>('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setFormInput(initState)
    setImagePreview('')
  }

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormInput({ ...formInput, [name]: inputValue });
  };

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      if (formData._id) {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        if (formData.image) {
          formDataToSend.append('image', formData.image)
        }
        formDataToSend.append('description', formData.description);
        formDataToSend.append('_method', 'PUT')
        return axios.put(`/food-type/${formData._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(() => {
          refetch()
          handleClose()
          setFormInput(initState)
        })
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('image', formData.image)
        formDataToSend.append('description', formData.description);
        return axios.post('/food-type', formDataToSend, {
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

  // const deleteMutation = useMutation({
  //   mutationFn: (id: string) => {
  //     return axios.delete(`/food-type/${id}`).then(() => {
  //       refetch()
  //     })
  //   },
  // })

  const handleEdit = (data: any) => {
    setFormInput({ ...data })
    setImagePreview(data.image)
    handleOpen()
  }
  // const handleDelete = (id: string) => {
  //   deleteMutation.mutate(id)
  // }
  const onSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(formInput);
  }
  return (
    <section className="h-[400px] my-10 mb-40 bg-gray container mx-auto text-center">
      <div>
        <h3 className='form-to'>From 11:00am to 10:00pm</h3>
        <h4 className='title'>ORDER ONLINE</h4>
      </div>
      {admin && (
        <div className='text-end mt-3'>
          <Button variant='contained' onClick={handleOpen}>Add Food-Type</Button>
        </div>
      )}
      {error ? (<div className='py-32'>Sorry something went wrong!</div>)
        : isLoading ? <div className='py-32'>Loading...</div>
          : !data.length ? <div className='py-32'>No Food</div> : (
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              breakpoints={{
                380: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {data?.map((item, index) => (
                <SwiperSlide key={index} onClick={() => handleClick(item._id)}>
                  <img
                    src={item.image || default_image}
                    alt={item.image || default_image}
                    className='img rounded-lg'
                    onError={(e) => {
                      (e.target as any).src = default_image
                    }}
                    loading="lazy"
                  />
                  <div className=' border border-white absolute top-[10px] bottom-[10px] left-[5px] right-[5px]'></div>
                  <div className="inner-shadow-food"></div>
                  <div className='absolute bottom-16 text-white uppercase'>
                    {item.name}
                  </div>
                  <div className="inner-shadow-footer"></div>

                  <div className='absolute bottom-0'>
                    {/* <Button
                      variant='contained'
                      color='primary'
                      onClick={() => handleEdit(item)}
                    >Edit</Button> */}
                    {/* <Button
                      variant='contained'
                      color='error'
                      onClick={() => handleDelete(item._id)}
                    >Delete</Button> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

      <Modal
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={onSubmit}>
          <Box sx={style}>
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
                alt={ImagePreview}
                onError={(e) => {
                  (e.target as any).src = default_image
                }}
                loading="lazy"
              />
            )}
            <div className='text-red-700'>
              {mutation.isError && (mutation.error as any).response.data.message}
            </div>
            <div className='mb-3'>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="name"
                onChange={handleChange}
                value={formInput.name}
                placeholder="name"
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                id="content"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                name='description'
                onChange={handleChange}
                value={formInput.description}
                required
              ></textarea>
            </div>
            <LoadingButton
              loading={mutation.isPending}
              variant='contained'
              type='submit'
            >
              Create
            </LoadingButton>
          </Box>
        </form>
      </Modal>
    </section>
  )
}

export default Food