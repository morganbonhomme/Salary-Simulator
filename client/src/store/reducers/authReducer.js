import * as actionType from '../actions/actionType';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userID: null,
  role: null,
  loading: false,
  error: null,
}

const loginStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
}

const loginSuccess = (state, action) => {
  return updateObject(state, { token: action.token, userID: action.userID, error: null, loading: false, role: action.role });
}

const loginFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
}

const logout = (state, action) => {
  return updateObject(state, { userID: null, token: null, role: null })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_START: return loginStart(state, action);
    case actionType.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionType.LOGIN_FAIL: return loginFail(state, action);
    case actionType.LOGOUT: return logout(state, action);
    default:
      return state
  }
};

export default reducer;