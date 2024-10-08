import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadUser = createAsyncThunk('user/loadUser', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  if (token) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
  return null;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
