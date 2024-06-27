import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { Friend, addFriend, deleteFriend, getAllFriends } from "@/lib/indexedDb";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type FoodType = {
  _id: string
  name: string
  
}

type State = {
  card: Friend[]; // Adjusted the type to use Friend
};

type Action = {
  type: "ADD_CARD"; // Adjusted action types to match casing convention
  payload: Friend;
} | {
  type: "REMOVE_CARD",
  payload: { id: number }
} | {
  type: "LIST_CARD",
  payload: Friend[]
}


const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case "LIST_CARD":
      return { ...state, card: payload };
    case "ADD_CARD":
      return { ...state, card: [...state.card, payload] }; // Updated to append payload to card array
    case "REMOVE_CARD":
      return { ...state, card: state.card.filter(friend => friend.id !== payload.id) }
    default:
      return state;
  }
};

const DataContext = createContext<{ foodType: FoodType[], card: Friend[]; addCard: (friend: Friend, quantity: number) => void, removeCard: (id: number) => void } | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useGlobalData must be used within a GlobalStateProvider");
  }
  return context;
};

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const initialState: State = {
    card: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { data } = useQuery<any[]>({
    queryKey: ['food-type'],
    queryFn: () =>
      axios.get('/food-type').then((res) =>
        res.data,
      ),
  })

  // Function to add a card
  const removeCard = async (id: number) => {
    try {
      await deleteFriend(id);
      dispatch({ type: "REMOVE_CARD", payload: { id } });
    } catch (error) {
      console.error("Error while removing friend:", error);
      // Handle errors if needed
    }
  };

  const addCard = async (friend: Friend, quantity: number) => {
    try {
      await addFriend({ ...friend, quantity }).then((id) => {
        dispatch({ type: "ADD_CARD", payload: { ...friend, id, quantity } });
      });

    } catch (error) {
      console.error("Error while adding friend:", error);
      // Handle errors if needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const friends = await getAllFriends();
        dispatch({ type: "LIST_CARD", payload: friends });
      } catch (error) {
        console.error("Error while fetching friends:", error);
        // Handle errors if needed
      }
    };

    fetchData();
  }, []);
  return (
    <DataContext.Provider value={{
      foodType: data,
      card: state.card,
      addCard,
      removeCard,
    }}>
      {children}
    </DataContext.Provider>
  );
};
