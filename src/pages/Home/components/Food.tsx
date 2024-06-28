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
import { Button } from '@mui/material';
interface FormData {
  _id: string
  name: string;
  image: string
  description: string
}

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
  const [imagePreview, setImagePreview] = useState<any>('')
  const [requireImage, setRequireImage] = useState("")

  const onClose = () => {
    setFormInput(initState)
    setImagePreview('')
    mutation.reset()
    setRequireImage('');
    const modal = document.getElementById('food_type_modal') as HTMLDialogElement
    modal.close()
  }
  const handleOpen = () => {
    const modal = document.getElementById('food_type_modal') as HTMLDialogElement
    modal.showModal()
  }

  const handleChangeImage = (e: any) => {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return

    const file = files[0]

    const maxFileSize = 3 * 1024 * 1024; // 3MB in bytes
    if (file.size > maxFileSize) {
      setFormInput(prev => ({ ...prev, image: '' }));
      setRequireImage("File size exceeds the maximum limit of 3MB");
      return;
    }

    setRequireImage("")
    setFormInput(prev => ({ ...prev, image: file }))
    const reader = new FileReader()
    reader.onloadend = function (e) {
      setImagePreview(e.target?.result)
    }
    reader.readAsDataURL(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormInput(prev => ({ ...prev, [name]: inputValue }));
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
          onClose()
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
          onClose()
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
        <h3 className='form-to'>From 11:00am to 10:30pm</h3>
        <h4 className='title'>ORDER ONLINE</h4>
      </div>
      {admin && (
        <div className='text-end my-3'>
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
                  {/* action */}
                  {admin && (
                    <span className='absolute left-2 top-2'>
                      <button className="btn px-0 min-h-0 h-[30px] rounded-[50%] mt-1" onClick={(e) => {
                        e.stopPropagation(); // This stops the event from bubbling up to SwiperSlide
                        handleEdit(item);
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                          <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </span>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
      <dialog id="food_type_modal" className="modal font-sans">
        <form onSubmit={onSubmit}>
          <div className="modal-box xs:w-100 sm:w-[500px] md:w-[1200px]">
            <div className="flex flex-col gap-3">
              {/* image */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  name='image'
                  onChange={handleChangeImage}
                  accept="image/*"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    className='h-[200px] w-full'
                    alt={imagePreview}
                    onError={(e) => {
                      (e.target as any).src = default_image
                    }}
                    loading="lazy"
                  />
                )}
                <div className='text-red-700'>
                  {requireImage}
                  {mutation.isError && (mutation.error as any).response.data.message}
                </div>
              </div>
              {/* name */}
              <div className='flex items-center gap-3'>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[120px]">
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
              {/* description */}
              <div className='flex items-center gap-3'>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[120px]">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="description"
                  onChange={handleChange}
                  value={formInput.description}
                  placeholder="description"
                  required
                />
              </div>

            </div>
            <div className="modal-action font-sans">
              <button className="btn" type="button" onClick={onClose}>Close</button>
              <button className="btn" type="submit">
                {!formInput?._id ? 'Create' : 'Update'}
                {mutation.isPending && (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </section>
  )
}

export default Food