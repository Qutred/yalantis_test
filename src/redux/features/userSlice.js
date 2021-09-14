import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getFromLocalStorage } from '../../utils/localStorageAPI';

const IDLE = 'IDLE';
const LOADING = 'LOADING';
const baseUrl = `https://yalantis-react-school-api.yalantis.com/api/`;

const dataFromStorage = getFromLocalStorage();
let initialState = {};
if (dataFromStorage) {
  initialState = dataFromStorage.userSlice;
} else {
  initialState = {
    users: [],
    activeUsersIds: [],
    isLoading: IDLE,
  };
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUsersLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setActiveUser: (state, action) => {
      state.activeUsersIds.push(action.payload);
    },
    removeActiveUser: (state, action) => {
      state.activeUsersIds = state.activeUsersIds.filter(
        (userId) => userId !== action.payload
      );
    },
  },
});

export const { setUsers, setUsersLoading, setActiveUser, removeActiveUser } =
  usersSlice.actions;

export default usersSlice.reducer;

export const fetchUsers = () => async (dispatch) => {
  dispatch(setUsersLoading(LOADING));
  axios
    .get(`${baseUrl}task0/users`)
    .then((data) => {
      dispatch(setUsersLoading(IDLE));
      dispatch(setUsers(data.data));
    })
    .catch((error) => console.error(error));
};
