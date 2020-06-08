import { LOGIN_USER } from "../types";
import { REGISTER_USER } from "../types";
import { LOGOUT_USER } from "../types";
import { ERROR } from "../types";
import { SUCCESS } from "../types";
import { GET_CURRENT_USER } from "../types";
import { IS_LOADING } from "../types";




const initiallState = {
  userData: {},
  isRegister: false,
  isLogined: false,
  error: "",
  success: "",
  currentUser:{},
  isLoading:false
};
export const authReducer = (state = initiallState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        userData: action.payload.data,
        isLogined: true,
        error: "",
        success: "",
        token: action.payload.data.secret,
      };
    }
    case REGISTER_USER: {
      return {
        ...state,
        isRegister: true,
        userData: action.payload.data,
        error: "",
        success: action.success,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isLogined: false,
        error: "",
        token: "",
        currentUser:{}
      };
    }
    case ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case SUCCESS: {
      return {
        ...state,
        success: action.success,
      };
    }
    case GET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }


  

    default:
      return state;
  }
};
