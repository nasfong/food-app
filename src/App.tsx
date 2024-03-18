import Navbar from "./components/Navbar"
import { GlobalStateProvider } from "./hook/useGlobalData"
import Home from "./pages/Home/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import OurMenu from "./pages/our-menu/OurMenu"

function App() {

  return (
    <div style={{ fontFamily: "'Gideon Roman', serif" }}>
      <GlobalStateProvider>
        <BrowserRouter>
          <Routes >
            <Route path="" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="our-menu" element={<OurMenu />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalStateProvider>
    </div>
  )
}

export default App
