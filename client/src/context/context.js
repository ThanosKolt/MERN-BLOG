import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../reducer";
import { decodeJWT } from "../utils/decodeJWT";
import axios from "axios";

const MyContext = createContext();

const initialState = {
  currentUser: { friends: [] },
  input: "",
  posts: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCurrentUser = async () => {
    try {
      const { userId } = decodeJWT();
      const response = await axios.post(
        "http://localhost:5000/user/getCurrentUser",
        {
          userId,
        }
      );
      dispatch({
        type: "GET_CURRENT_USER",
        payload: response.data.currentUser,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  const setInput = (input) => {
    dispatch({ type: "SET_INPUT", payload: input });
  };
  const setPosts = (posts) => {
    dispatch({ type: "SET_POSTS", payload: posts });
  };

  return (
    <MyContext.Provider
      value={{ ...state, fetchCurrentUser, setInput, setPosts }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(MyContext);
};

export { AppProvider, MyContext };
