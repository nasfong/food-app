import { Button } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import { useGlobalData } from '@/hook/useGlobalData';
import { Pagination } from '@/components/Pagination';
import { admin } from '@/constant/constant';
import Background from '@/components/Background';
import Swal from 'sweetalert2'
import FoodCard from '@/components/FoodCard';
import DrinkCard from './DrinkCard';
import DrinkModal from './DrinkModal';
import FoodModal from './FoodModal';

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

const drinkId = import.meta.env.VITE_DRINK_ID

const Body = () => {
  const { foodType } = useParams()
  const [imagePreview, setImagePreview] = useState<any>('')
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
  const initStateDrink = {
    image: '',
    name: '',
    drinks: [
      { name: '', price: '' }
    ]
  }
  const [formInput, setFormInput] = useState<any>(initState)

  // drink
  const [formInputDrink, setFormInputDrink] = useState(initStateDrink)

  const isDrink = drinkId === foodType

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
    enabled: !isDrink
  })

  const {
    data: drinkData,
    isLoading: drinkLoading,
    error: drinkError,
    refetch: drinkRefetch
  } = useQuery<any[]>({
    queryKey: ['drink',],
    queryFn: () =>
      axios.get('/drink').then((res) => res.data),
    enabled: isDrink
  })

  const handleOpen = () => {
    const modal = document.getElementById('food_modal') as HTMLDialogElement
    modal.showModal()
  }

  const onOpenDrinkModal = () => {
    const modal = document.getElementById('drink_modal') as HTMLDialogElement
    modal.showModal()
  }

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormInput(prev => ({ ...prev, [name]: inputValue }));
  };

  const handleChangeDrink = useCallback((e: any) => {
    const { name, value, type } = e.target;
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormInputDrink(prev => ({ ...prev, [name]: inputValue }));
  }, [setFormInputDrink]);

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

  const deleteDrinkMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/drink/${id}`).then(() => {
        drinkRefetch()
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
        if (!isDrink) deleteMutation.mutate(id)
        else deleteDrinkMutation.mutate(id)
      }
    });
  }

  const handleEdit = (data: any) => {
    setFormInput({ ...data })
    setImagePreview(data.image)
    handleOpen()
  }

  const handleEditDrink = (data: any) => {
    setFormInputDrink({ ...data })
    setImagePreview(data.image)
    onOpenDrinkModal()
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
    if (drinkData) {
      const result = drinkData.reduce((acc, curr) => {
        return acc.concat(curr.drinks);
      }, []);
      setCardStates(result?.map(() => ({ loading: false, checked: false })));
    }
  }, [data, drinkData]);

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

  let indexCounter = 0;
  const drinkDataAddIndex = drinkData?.map((item) => ({
    ...item,
    drinks: item.drinks.map((drink) => ({
      ...drink,
      index: indexCounter++,
    }))
  }))
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
        {/* Add  */}
        <div className='text-end'>
          {admin && (
            <Button variant='contained' onClick={() => {
              if (!isDrink) {
                handleOpen()
                setFormInput({ ...formInput, foodType: foodType })
              } else {
                onOpenDrinkModal()
              }
            }}>Add {!isDrink ? 'Food' : 'Drink'}</Button>
          )}
        </div>
        {!isDrink ? (
          <div>
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
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5">
            {drinkError ? (<div className='py-32'>Sorry something went wrong!</div>)
              : drinkLoading ? <div className='py-32'>Loading...</div>
                : !drinkData?.length ? <div className='py-32'>No Food</div> :
                  <>
                    {drinkDataAddIndex?.map((item, index) => (
                      <DrinkCard
                        key={index}
                        item={item}
                        handleButtonClick={handleButtonClick}
                        cardStates={cardStates}
                        handleEdit={handleEditDrink}
                        handleDelete={handleDelete}
                        data={drinkData}
                      />
                    ))}
                  </>
            }
          </div>
        )}
      </div>
      {/* food modal */}
      <FoodModal
        initState={initState}
        formInput={formInput}
        setFormInput={setFormInput}
        handleChange={handleChange}
        refetch={refetch}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
      />

      {/* drink modal */}
      <DrinkModal
        initState={initStateDrink}
        formInput={formInputDrink}
        setFormInput={setFormInputDrink}
        handleChange={handleChangeDrink}
        refetch={drinkRefetch}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
      />
    </>
  )
}

export default Body
