import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHabits = createAsyncThunk('habits/fetchHabits', async (userId, thunkAPI) => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`http://localhost:5000/api/habits/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
});

const habitSlice = createSlice({
  name: 'habits',
  initialState: { habits: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.habits = action.payload;
        state.loading = false;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default habitSlice.reducer;
