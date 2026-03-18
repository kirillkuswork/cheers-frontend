/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, userApi } from '@/redux/services';
import { IGetUserResponse } from '@/redux/services/types/user';
import { IGetOtpResponse } from '@/redux/services/types/auth';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: IGetUserResponse | null;
  isOtpSuccess: boolean;
  isAuthenticated: boolean
  otpData: IGetOtpResponse | null
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isOtpSuccess: false,
  otpData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOtpSuccess: (state, action: PayloadAction<boolean>) => {
      state.isOtpSuccess = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setUser: (state, action: PayloadAction<IGetUserResponse>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem('accessToken', payload.access_token);
        localStorage.setItem('refreshToken', payload.refresh_token);
      },
    );
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem('accessToken', payload.access_token);
        localStorage.setItem('refreshToken', payload.refresh_token);
        state.isAuthenticated = true;
      },
    );
    builder.addMatcher(
      authApi.endpoints.getOtp.matchFulfilled,
      (state, { payload }) => {
        state.isOtpSuccess = true;
        state.otpData = payload;
      },
    );
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
      },
    );
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  logout,
  setOtpSuccess,
  setUser,
  setIsAuthenticated,
} = authSlice.actions;
export default authSlice.reducer;
