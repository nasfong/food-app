import Navbar from "./components/Navbar"
import { GlobalStateProvider } from "./hook/useGlobalData"
import Home from "./pages/Home/Home"

function App() {

  return (
    <GlobalStateProvider>
      <Navbar>
        <Home />
      </Navbar>
    </GlobalStateProvider>
  )
}

export default App
