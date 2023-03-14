import {
    SIGNUP_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_REQUEST,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
   
  } from "./action.type";
  import axios from "axios";
  import { removeItem } from "../Utils/localstorage";
  
  export const registerUser = (payload) => (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    return axios
      .post(`/register`, payload)
      .then((r) => {
        dispatch({ type: SIGNUP_SUCCESS, payload: r.data });
        return SIGNUP_SUCCESS;
      })
  
      .catch((err) => {
        dispatch({ type: SIGNUP_ERROR, payload: err });
        return SIGNUP_ERROR;
      });
  };
  
  export const loginUser = (detail) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return axios
      .post(`/login`, detail)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        return res;
      })
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR, payload: err });
        return LOGIN_ERROR;
      });
  };
  
  