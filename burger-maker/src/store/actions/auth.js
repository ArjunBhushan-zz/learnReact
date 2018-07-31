import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {token: data.idToken, userId: data.localId}
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {error}
  };
};

export const logout = () => {
  return {
      type: actionTypes.AUTH_LOGOUT
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime*1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDQTEfINJAGUsqOJqpZ8zuCm2cvSNCW7EI'
    if (!isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDQTEfINJAGUsqOJqpZ8zuCm2cvSNCW7EI';
    }
    axios.post(url, {
      email,
      password,
      returnSecureToken: true
    })
      .then((res) => {
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error.message));
      });
  };
};
