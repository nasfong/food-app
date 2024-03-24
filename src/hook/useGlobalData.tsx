import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { Friend, addFriend, deleteFriend, getAllFriends } from "@/lib/indexedDb";

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

const DataContext = createContext<{ card: Friend[]; addCard: (friend: Friend, quantity: number) => void, removeCard: (id: number) => void } | null>(null);

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
      card: state.card,
      addCard,
      removeCard
    }}>
      {children}
    </DataContext.Provider>
  );
};
