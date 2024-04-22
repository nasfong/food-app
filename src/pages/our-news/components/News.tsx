import { default_image } from "@/constant/constant";
import { readMore } from "@/constant/readmore";
import { truncateDescription } from "@/lib/utils";
// import { LoadingButton } from "@mui/lab";
import {
  // Box, 
  // Button, 
  // Modal, 
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { useState } from "react";

// interface FormData {
//   _id: string
//   name: string;
//   image: string
//   content: string
//   date: string
// }

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

const News = (
  // { data, refetch }: any
) => {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:768px)')
  // const initState = {
  //   _id: '',
  //   image: '',
  //   name: '',
  //   content: '',
  // }
  // const [formInput, setFormInput] = useState<any>(initState)
  // const [ImagePreview, setImagePreview] = useState<any>('')
  // const [open, setOpen] = useState(false)
  // const handleOpen = () => {
  //   setOpen(true)
  // }
  // const handleClose = () => {
  //   setOpen(false)
  //   setFormInput(initState)
  //   setImagePreview('')
  // }

  // const handleChangeImage = (e: any) => {
  //   let files = e.target.files || e.dataTransfer.files
  //   if (!files.length) return

  //   const file = files[0]
  //   setFormInput({ ...formInput, image: file })
  //   const reader = new FileReader()
  //   reader.onloadend = function (e) {
  //     setImagePreview(e.target?.result)
  //   }
  //   reader.readAsDataURL(file)
  // }
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  //   const { name, value, type } = e.target;
  //   const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
  //   setFormInput({ ...formInput, [name]: inputValue });
  // };

  // const mutation = useMutation({
  //   mutationFn: (formData: FormData) => {
  //     if (formData._id) {
  //       const formDataToSend = new FormData();
  //       formDataToSend.append('name', formData.name);
  //       if (formData.image) {
  //         formDataToSend.append('image', formData.image)
  //       }
  //       formDataToSend.append('content', formData.content);
  //       formDataToSend.append('date', formData.date);
  //       formDataToSend.append('_method', 'PUT')
  //       return axios.put(`/our-new/${formData._id}`, formDataToSend, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         }
  //       }).then(() => {
  //         refetch()
  //         handleClose()
  //         setFormInput(initState)
  //       })
  //     } else {
  //       const formDataToSend = new FormData();
  //       formDataToSend.append('name', formData.name);
  //       formDataToSend.append('image', formData.image); // Access the first file in the FileList
  //       formDataToSend.append('content', formData.content);
  //       formDataToSend.append('date', formData.date);
  //       return axios.post('/our-new', formDataToSend, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         }
  //       }).then(() => {
  //         refetch()
  //         handleClose()
  //         setFormInput(initState)
  //       })
  //     }
  //   },
  // })

  // const deleteMutation = useMutation({
  //   mutationFn: (id: string) => {
  //     return axios.delete(`/our-new/${id}`).then(() => {
  //       refetch()
  //     })
  //   },
  // })



  // const handleEdit = (data: any) => {
  //   setFormInput({ ...data })
  //   setImagePreview(data.image)
  //   handleOpen()
  // }
  // const handleDelete = (id: string) => {
  //   deleteMutation.mutate(id)
  // }
  // const onSubmit = (e: any) => {
  //   e.preventDefault();
  //   mutation.mutate(formInput);
  // }

  return (
    <div className="container">
      {/* {admin && (
        <div className='text-end mt-3'>
          <Button variant='contained' onClick={handleOpen}>Add Our-New</Button>
        </div>
      )} */}
      {readMore?.map((item, index: any) => (
        <div
          key={index}
          className={`my-20 relative flex ${index % 2 && 'flex-row-reverse'} ${matches ? '' : 'flex-col'}`}
        >
          <img
            src={item.image}
            alt={item.image}
            className="object-cover h-80 w-full md:w-[600px] rounded-sm"
            onError={(e) => {
              (e.target as any).src = default_image
            }}
          />
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
            <div>{truncateDescription(item.description, 200)}</div>
            <button
              className='button5 mt-5 p-2 font-light'
              onClick={() => navigate(`/read-more/${item.id}`)}
            >
              READ MORE
            </button>
            {/* {admin && (
              <>
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
              </>
            )} */}
          </div>
        </div>
      ))}
      {/* <Modal
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={onSubmit}>
          <Box sx={style}>
            <input type="file" name='image' onChange={handleChangeImage} />
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
                placeholder="John"
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Content
              </label>
              <textarea
                id="content"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                name='content'
                onChange={handleChange}
                value={formInput.content}
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
      </Modal> */}
    </div>
  )
}

export default News