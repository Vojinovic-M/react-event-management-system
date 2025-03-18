import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/AuthService';
import { logout } from '../slices/authSlice';

const API_URL = "https://localhost:7095/api"


export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { accessToken } = await AuthService.login(credentials);
      const user = await AuthService.getProfile(accessToken);
      localStorage.setItem('accessToken', accessToken);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await AuthService.logout();
      localStorage.removeItem('accessToken');
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
);