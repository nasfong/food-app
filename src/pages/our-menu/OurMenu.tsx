import { useQuery } from "@tanstack/react-query"
import FoodList from "./components/FoodList"
import SlideWithCard from "./components/SlideWithCard"
import axios from "axios";
import Background from "@/components/Background";

const ourMenu_slide = {
  desserts: {
    image: 'https://s3.amazonaws.com/gmi-digital-library/91a0bf35-9faf-438a-a895-e66ca89b5853.jpg',
    title: 'DESSERTS',
    description: 'LOREM IPSUM HAS BEEN THE INDUSTRY’S STANDARD DUMMY TEXT EVER SINCE THE 1500S, WHEN AN UNKNOWN PRINTER TOOK A GALLEY OF TYPE AND SCRAMBLED IT TO MAKE A TYPE SPECIMEN BOOK.'
  },
  pizzas: {
    image: 'https://imgs.search.brave.com/oiEqgwJQYE06WHRyr5yXE9L0HjuGoJexVYemQRFK_7Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NjcwMDM5MDk1ODUt/MmY4YTcyNzAwMjg4/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVEI4Zkh4bGJu/d3dmSHg4Zkh3PQ',
    title: 'PIZZA',
    description: 'LOREM IPSUM HAS BEEN THE INDUSTRY’S STANDARD DUMMY TEXT EVER SINCE THE 1500S, WHEN AN UNKNOWN PRINTER TOOK A GALLEY OF TYPE AND SCRAMBLED IT TO MAKE A TYPE SPECIMEN BOOK.'
  },
  salads: {
    image: 'https://imgs.search.brave.com/oiEqgwJQYE06WHRyr5yXE9L0HjuGoJexVYemQRFK_7Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NjcwMDM5MDk1ODUt/MmY4YTcyNzAwMjg4/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVEI4Zkh4bGJu/d3dmSHg4Zkh3PQ',
    title: 'SALADS',
    description: 'LOREM IPSUM HAS BEEN THE INDUSTRY’S STANDARD DUMMY TEXT EVER SINCE THE 1500S, WHEN AN UNKNOWN PRINTER TOOK A GALLEY OF TYPE AND SCRAMBLED IT TO MAKE A TYPE SPECIMEN BOOK.'
  },
  soups: {
    image: 'https://imgs.search.brave.com/oiEqgwJQYE06WHRyr5yXE9L0HjuGoJexVYemQRFK_7Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NjcwMDM5MDk1ODUt/MmY4YTcyNzAwMjg4/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVEI4Zkh4bGJu/d3dmSHg4Zkh3PQ',
    title: 'SOUPS',
    description: 'LOREM IPSUM HAS BEEN THE INDUSTRY’S STANDARD DUMMY TEXT EVER SINCE THE 1500S, WHEN AN UNKNOWN PRINTER TOOK A GALLEY OF TYPE AND SCRAMBLED IT TO MAKE A TYPE SPECIMEN BOOK.'
  },
  drinks: {
    image: 'https://imgs.search.brave.com/oiEqgwJQYE06WHRyr5yXE9L0HjuGoJexVYemQRFK_7Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/NjcwMDM5MDk1ODUt/MmY4YTcyNzAwMjg4/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnNiM0psTFdabFpX/UjhNVEI4Zkh4bGJu/d3dmSHg4Zkh3PQ',
    title: 'DRINKS',
    description: 'LOREM IPSUM HAS BEEN THE INDUSTRY’S STANDARD DUMMY TEXT EVER SINCE THE 1500S, WHEN AN UNKNOWN PRINTER TOOK A GALLEY OF TYPE AND SCRAMBLED IT TO MAKE A TYPE SPECIMEN BOOK.'
  }
}
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

const OurMenu = () => {
  const { data } = useQuery<FoodQuery>({
    queryKey: ['food', { chef: true }],
    queryFn: () =>
      axios.get('/food').then((res) => res.data),
  })
  console.log(data)
  return (
    <div>
      <Background data={{image: 'https://wallpapers.com/images/hd/food-4k-1pf6px6ryqfjtnyr.jpg', title: 'Our Menu'}} />
      <FoodList data={data?.data.filter(item => item.foodType === '65faeed05960607a1d29e8f1')} />
      <SlideWithCard data={ourMenu_slide.salads} />
      <FoodList data={data?.data.filter(item => item.foodType === '65faeed55960607a1d29e8f3')} />
      <SlideWithCard data={ourMenu_slide.pizzas} />
      <FoodList data={data?.data.filter(item => item.foodType === '65faeee05960607a1d29e8f5')} />
      <SlideWithCard data={ourMenu_slide.soups} />
      <FoodList data={data?.data.filter(item => item.foodType === '65faeee75960607a1d29e8f7')} />
      <SlideWithCard data={ourMenu_slide.desserts} />
      <FoodList data={data?.data.filter(item => item.foodType === '65faeeee5960607a1d29e8f9')} />
      <SlideWithCard data={ourMenu_slide.drinks} />
    </div>
  )
}

export default OurMenu