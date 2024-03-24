import Navbar from "./components/Navbar"
import { GlobalStateProvider } from "./hook/useGlobalData"
import Home from "./pages/Home/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import OurMenu from "./pages/our-menu/OurMenu"
import Shop from "./pages/shop/Shop"
import ShopDetail from "./pages/shop/ShopDetail"
import Gallery from "./pages/gallery/Gallery"
import OurNews from "./pages/our-news/OurNews"
import Admin from "./pages/admin/Admin"
import Store from "./pages/store/Store"

function App() {

  return (
    <div style={{ fontFamily: "'Gideon Roman', serif" }}>
      <GlobalStateProvider>
        <BrowserRouter>
          <Routes >
            <Route path="" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="our-menu" element={<OurMenu />} />
              <Route path="shop" >
                <Route index element={<Shop />} />
                <Route path=":foodType" element={<Shop />} />
                <Route path=":foodId/:foodType/detail" element={<ShopDetail />} />
              </Route>
              <Route path="gallery" element={<Gallery />} />
              <Route path="our-news" element={<OurNews />} />
              <Route path="admin" element={<Admin />} />
              <Route path="store" element={<Store />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalStateProvider>
    </div>
  )
}

export default App
