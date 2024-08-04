import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import habitReducer from './features/habit/habitSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    habits: habitReducer,
  },
});

export default store;
