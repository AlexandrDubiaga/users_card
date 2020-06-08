export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export const IS_LOADING = "IS_LOADING";


import axios from "axios";

export const setError = (error) => {
  return async (dispatch) => {
    dispatch({
      type: ERROR,
      error: error,
    });
  };
};
export const setLoadIcon = (isLoading) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
      isLoading,
    });
  };
};
export const setSuccess = (success) => {
  return async (dispatch) => {
    dispatch({
      type: success,
      success,
    });
  };
};

export const login = (userData) => {
  let formData = new FormData();
  formData.append("email", userData.email);
  formData.append("password", userData.password);

  return async (dispatch) => {
    try {
      dispatch(setLoadIcon(true));
      const responce = await axios.post(
        "https://dev.addictivelearning.io/api/v1/login",
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      dispatch({
        type: LOGIN_USER,
        payload: responce.data,
      });
      dispatch(setLoadIcon(false));
    } catch (err) {
      dispatch(setLoadIcon(false));
      dispatch(setError("Нету такого пользователя!"));
    }
  };
};

export const registration = (userData) => {
  let formData = new FormData();
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("password_confirmation", userData.password_confirmation);
  return async (dispatch) => {
    try {
      dispatch(setLoadIcon(true));
      const responce = await axios.post(
        `https://dev.addictivelearning.io/api/v1/register`,
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      dispatch({
        type: REGISTER_USER,
        payload: responce.data,
        success: "Успешная регистрация!",
      });
      dispatch(setLoadIcon(false));
    } catch (err) {
      dispatch(setLoadIcon(false));
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    try {
      let responce = await axios.post(
        `https://dev.addictivelearning.io/api/v1/logout`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      dispatch({
        type: LOGOUT_USER,
      });
    } catch (err) {}
  };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      let responce = await axios.get(
        `https://dev.addictivelearning.io/api/v1/current`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      dispatch({
        type: GET_CURRENT_USER,
        payload: responce.data,
      });
    } catch (err) {
    
    }
  };
};
