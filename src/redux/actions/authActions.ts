import {
  setOtpSuccess, setAccessToken, setRefreshToken, logout, setIsAuthenticated,
} from '@/redux/slices/authSlice';

export const authActions = {
  setOtpSuccess,
  setAccessToken,
  setRefreshToken,
  logout,
  setIsAuthenticated,
};
