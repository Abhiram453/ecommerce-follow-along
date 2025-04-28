import { configureStore, createSlice } from '@reduxjs/toolkit';

// 1. Define the user slice using Redux Toolkit
const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: '',
    isAuthenticated: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    resetUser: (state) => {
      state.email = '';
      state.name = '';
      state.isAuthenticated = false;
    },
  },
});

// Export actions for use in components
export const { setEmail, setName, setAuthentication, resetUser } = userSlice.actions;

// 2. Create and export the store
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;