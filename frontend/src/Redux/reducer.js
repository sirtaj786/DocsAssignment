import {
    LOGIN_REQUEST,
    SIGNUP_ERROR,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
  } from "./action.type";
  
  import { getItem, setItem,removeItem } from "../Utils/localstorage";
  
  const initState = {
    isAuth: getItem("token") ? true : false,
    token: getItem("token") || "",
    isLoading: false,
    isError: false,
    user:""
  };
  
  export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
      case SIGNUP_REQUEST: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case SIGNUP_SUCCESS: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case SIGNUP_ERROR: {
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      }
  
      case LOGIN_REQUEST: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case LOGIN_SUCCESS: {
        setItem("SECRET", payload.token);
        setItem("userDetails",JSON.stringify(payload))
        
					
        console.log("Reducer PAyload",payload)
        return {
          ...state,
          isLoading: false,
          isAuth: true,
          token: payload.token,
          user:payload.username
        };
      }
      case LOGIN_ERROR: {
        return {
          ...state,
          isLoading: false,
          isError: true,
          isAuth: false,
          token: "",
        };
      }
      default: {
        return state;
      }
    }
  };