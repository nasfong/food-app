import { createContext, useContext, useReducer } from "react";

type State = {
  card: string[]
}
type Action = {
  type: "CARD",
  payload: string[]
}

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case "CARD":
      return { ...state, card: payload }
    default:
      return state
  }
}

const DataContext = createContext<any>(null)

export const useGlobalData = () => {
  return useContext(DataContext)
}

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = {
    card: []
  }
  const [{ card }, dispatch] = useReducer(reducer, initialState)

  return (
    <DataContext.Provider value={{ card, dispatch }}>
      {children}
    </DataContext.Provider>
  )
}






