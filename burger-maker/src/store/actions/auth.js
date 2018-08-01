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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
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
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: {path}
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    }else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const localId = localStorage.getItem('userId');
        dispatch(authSuccess({idToken:token, localId}));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
      } else {
        dispatch(logout());
      }
    }
  };
};
