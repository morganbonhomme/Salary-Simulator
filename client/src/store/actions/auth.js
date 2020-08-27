import * as actionType from './actionType';
import axios from 'axios';
import * as constant from '../../helpers/constants';

export const loginStart = () => {
  return {
    type: actionType.LOGIN_START,
  };
};

export const loginSuccess = (userID, token, role) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    userID: userID,
    token: token,
    role: role,
  };
};

export const loginFail = (error) => {
  return {
    type: actionType.LOGIN_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
  localStorage.removeItem('role');
  return {
    type: actionType.LOGOUT,
  }
}

export const login = (data) => {
  return dispatch => {
    dispatch(loginStart());

    axios.post(`${constant.apiURL}/user/login`, data)
      .then(res => {
        localStorage.setItem('token', res.data.body.token)
        localStorage.setItem('userID', data.email)
        localStorage.setItem('role', res.data.body.role)
        dispatch(loginSuccess(data.email, res.data.body.token, res.data.body.role))
      })
      .catch(error => {
        console.log(error.response.data.message)
        dispatch(loginFail(error.response.data.message))
      }
    )
  }
}

export const loginCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    const role = localStorage.getItem('role');
    if (token === null) {
      dispatch(logout())
      return false
    } else {
      dispatch(loginSuccess(userID, token, role))
      return true
    }
  }
}