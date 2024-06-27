import { memo, useCallback, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { default_image } from "@/constant/constant"

type IDrink = {
  _id: string
  image: string
  name: string;
  drinks: {
    name: string
    price: number
  }
}


type Props = {
  initState: any
  formInput: any,
  setFormInput: any
  handleChange: any
  refetch: any
  imagePreview: any
  setImagePreview: any
}

const DrinkModal = memo(({
  initState,
  formInput,
  setFormInput,
  handleChange,
  refetch,
  imagePreview,
  setImagePreview
}: Props) => {
  const [requireImage, setRequireImage] = useState("")

  const onClose = () => {
    setFormInput(initState)
    setImagePreview('')
    mutation.reset()
    setRequireImage('');
    const modal = document.getElementById('drink_modal') as HTMLDialogElement
    modal.close()
  }

  const mutation = useMutation({
    mutationFn: (formData: IDrink) => {
      if (formData._id) {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        if (formData.image) {
          formDataToSend.append('image', formData.image)
        }
        formDataToSend.append('drinks', JSON.stringify(formData.drinks));
        formDataToSend.append('_method', 'PUT')
        return axios.put(`/drink/${formData._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(() => {
          refetch();
          onClose();
          setFormInput(initState);
        })
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('image', formData.image); // Access the first file in the FileList
        formDataToSend.append('drinks', JSON.stringify(formData.drinks));
        return axios.post('/drink', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(() => {
          refetch()
          onClose()
          setFormInput(initState)
        })
      }
    },
  })

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
  const addItem = useCallback(() => {
    const newItem = {
      name: '',
      price: ''
    }
    setFormInput(prev => ({ ...prev, drinks: [...prev.drinks, newItem] }))
  }, [setFormInput])

  const removeItem = useCallback((index) => {
    setFormInput(prev => ({
      ...prev,
      drinks: prev.drinks.filter((_, i) => i !== index)
    }));
  }, [setFormInput])

  const onSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(formInput);
  };

  return (
    <dialog id="drink_modal" className="modal font-sans">
      <form onSubmit={onSubmit}>
        <div className="modal-box">
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
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[50px]">
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
            <div className="flex gap-3">
              <h1 className="w-[50px]">Item: </h1>
              <div className="border p-3 rounded-lg flex flex-col items-end gap-1">
                {formInput.drinks.map((drink, index) => (
                  <div className="flex gap-3" key={index}>
                    {/* name */}
                    <div className='flex items-center gap-3'>
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[50px]">
                        Name
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="name"
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setFormInput(prevState => {
                            const updatedDrinks = [...prevState.drinks];
                            updatedDrinks[index] = { ...updatedDrinks[index], [name]: value };
                            return { ...prevState, drinks: updatedDrinks };
                          });
                        }}
                        value={drink.name}
                        placeholder="name"
                        required
                      />
                    </div>
                    {/* price */}
                    <div className='flex items-center gap-3'>
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[50px]">
                        Price
                      </label>
                      <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="price"
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setFormInput(prevState => {
                            const updatedDrinks = [...prevState.drinks];
                            updatedDrinks[index] = { ...updatedDrinks[index], [name]: value };
                            return { ...prevState, drinks: updatedDrinks };
                          });
                        }}
                        value={drink.price}
                        placeholder="price"
                        required
                      />
                    </div>
                    <button className="btn px-0 min-h-0 h-[30px] rounded-[50%] mt-1" onClick={() => removeItem(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                        <path d="M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button className="btn px-0 min-h-0 h-[30px] rounded-[50%] mt-1" onClick={addItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
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
      </form >
    </dialog>
  )
})

export default DrinkModal
