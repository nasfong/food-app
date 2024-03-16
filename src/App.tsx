import Navbar from "./components/Navbar"
import { GlobalStateProvider } from "./hook/useGlobalData"
import Home from "./pages/Home/Home"

function App() {

  return (
    <div style={{ fontFamily: "'Gideon Roman', serif" }}>
      <GlobalStateProvider>
        <Navbar>
          <Home />
        </Navbar>
      </GlobalStateProvider>
    </div>
  )
}

export default App
