import { Box, Button, Modal } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import { useGlobalData } from '@/hook/useGlobalData';
import { Pagination } from '@/components/Pagination';
import { admin, default_image } from '@/constant/constant';
import Background from '@/components/Background';
import Swal from 'sweetalert2'
import FoodCard from '@/components/FoodCard';
import { LoadingButton } from '@mui/lab';
import { Rating } from '@material-tailwind/react';

interface Food {
  _id: string;
  name: string;
  image: string;
  star: number;
  price: number;
  description: string;
  foodType: string;
  chef: boolean;
  promotion: boolean
}

interface FoodQuery {
  data: Food[];
  totalPages: number;
  currentPage: number;
}

interface FormData {
  _id: string;
  name: string;
  image: File | string;
  star: number;
  price: number;
  description: string;
  foodType: string;
  chef: boolean;
  promotion: boolean
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
  height: '70vh',
  display: 'block'
};

const Body = () => {
  const { foodType } = useParams()
  const [ImagePreview, setImagePreview] = useState<any>('')
  const [currentPage, setCurrentPage] = useState(1)
  const initState = {
    _id: '',
    image: '',
    name: '',
    description: '',
    price: '',
    star: 0,
    foodType: '',
    chef: false,
    promotion: false,
  }
  const [formInput, setFormInput] = useState<any>(initState)
  const [requireImage, setRequireImage] = useState("")

  const { data: foodTypeList } = useQuery<Food[]>({
    queryKey: ['food-type'],
    queryFn: () =>
      axios.get('/food-type').then((res) =>
        res.data,
      ),
  })
  const { data, refetch, isLoading, error } = useQuery<FoodQuery>({
    queryKey: ['food', { foodType: foodType, pageSize: 6, page: currentPage }],
    queryFn: () =>
      axios.get('/food', { params: { foodType: foodType, pageSize: 6, page: currentPage } }).then((res) => res.data),
  })
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setFormInput(initState)
    setImagePreview('')
    setRequireImage('')
  }

  const handleChange = (e: any) => {
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
        formDataToSend.append('star', formData.star.toString());
        formDataToSend.append('price', formData.price.toString());
        formDataToSend.append('description', formData.description);
        formDataToSend.append('foodType', formData.foodType);
        formDataToSend.append('chef', formData.chef.toString());
        formDataToSend.append('promotion', formData.promotion.toString());
        formDataToSend.append('_method', 'PUT')
        return axios.put(`/food/${formData._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(() => {
          refetch();
          handleClose();
          setFormInput(initState);
        })
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('image', formData.image); // Access the first file in the FileList
        formDataToSend.append('star', formData.star.toString());
        formDataToSend.append('price', formData.price.toString());
        formDataToSend.append('description', formData.description);
        formDataToSend.append('foodType', formData.foodType);
        formDataToSend.append('chef', formData.chef.toString());
        formDataToSend.append('promotion', formData.promotion.toString());
        return axios.post('/food', formDataToSend, {
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


  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/food/${id}`).then(() => {
        refetch()
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
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

      }
    });
  }

  const handleEdit = (data: any) => {
    setFormInput({ ...data })
    setImagePreview(data.image)
    handleOpen()
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

  const handleChangeImage = (e: any) => {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return

    const file = files[0]

    const maxFileSize = 3 * 1024 * 1024; // 3MB in bytes
    if (file.size > maxFileSize) {
      setFormInput({ ...formInput, image: '' });
      setRequireImage("File size exceeds the maximum limit of 3MB");
      return;
    }
    
    setRequireImage("")
    setFormInput({ ...formInput, image: file })
    const reader = new FileReader()
    reader.onloadend = function (e) {
      setImagePreview(e.target?.result)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(formInput);
  };

  return (
    <>
      <Background data={foodTypeList?.find(item => item._id === foodType) || { image: 'https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg', title: 'Shop' }} />
      <div className='container text-center my-20'>
        <div className='mb-10 flex flex-wrap justify-start md:justify-center gap-3'>
          <NavLink
            to={`/shop`}
            onClick={() => setCurrentPage(1)}
            className={`
            uppercase mx-5 
            hover:border-b border-[#CB933D] 
            hover:text-[#CB933D]
            transition-colors duration-500 ease-in-out
            ${foodType === undefined ? 'text-[#CB933D] border-b border-[#CB933D]' : ''}
            `}
          >
            All
          </NavLink>
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
            ${item._id === foodType ? 'text-[#CB933D] border-b border-[#CB933D]' : ''}
            `}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className='text-end'>
          {admin && (
            <Button variant='contained' onClick={() => {
              handleOpen()
              setFormInput({ ...formInput, foodType: foodType })
            }}>Add Food</Button>
          )}
        </div>
        <div className="flex flex-wrap justify-center">
          {error ? (<div className='py-32'>Sorry something went wrong!</div>)
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
          className=''
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
                {requireImage}
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
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="description"
                  onChange={handleChange}
                  value={formInput.description}
                  required
                ></textarea>
              </div>
              <div className='mb-3'>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="price"
                  onChange={handleChange}
                  value={formInput.price}
                  placeholder="0"
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Food Type
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="foodType"
                  onChange={handleChange}
                  value={formInput.foodType}
                  required
                >
                  <option value=''>-- select type --</option>
                  {foodTypeList?.map((item) => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <Rating
                value={formInput.star}
                onChange={(val) => handleChange({ target: { name: 'star', value: val } })}
                placeholder={undefined} />

              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={handleChange}
                  checked={formInput.chef}
                  name='chef'
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Chef Recommend
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={handleChange}
                  checked={formInput.promotion}
                  name='promotion'
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Promotion
                </label>
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
      </div>
    </>
  )
}

export default Body
