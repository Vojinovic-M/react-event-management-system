import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  globalLoading: boolean;
}

const initialState: AppState = {
  globalLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = appSlice.actions;
export default appSlice.reducer;