import axios from "axios";

const reducer = (state, action) => {
  if (action.type === "GET_CURRENT_USER") {
    return { ...state, currentUser: action.payload };
  }

  if (action.type === "SET_INPUT") {
    return { ...state, input: action.payload };
  }
  if (action.type === "SET_POSTS") {
    return { ...state, posts: action.payload };
  }
  throw Error("Uknown action: " + action.type);
};

export { reducer };
