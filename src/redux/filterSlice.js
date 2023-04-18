import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload.toLowerCase();
    },
  },
});

export const { setFilter } = filterSlice.actions;
