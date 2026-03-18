import React, {
  createContext, useCallback, useContext, useEffect, useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetUserQuery } from '@/redux/services/userApi';
import { useActions } from '@/shareds/hooks/useActions';
import { authActions } from '@/redux/actions/authActions';
import { authSelectors } from '@/redux/selectors/authSelectors';
import { IGetUserResponse } from '@/redux/services/types/user';

interface AuthContextProps {
  user: IGetUserResponse | null;
  logout: () => void;
  isAuthenticated: boolean;
  isFetching: boolean;
  isInitial: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { logout, setIsAuthenticated } = useActions(authActions);
  const { user, isAuthenticated } = useSelector(authSelectors);
  const [getUser, { isFetching }] = useLazyGetUserQuery();
  const [isInitial, setIsInitial] = useState(true);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    logout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, [logout, setIsAuthenticated]);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      getUser();
    }
    setIsInitial(false);
  }, [getUser]);
  const contextValue = useMemo(
    () => ({
      user,
      logout: handleLogout,
      isAuthenticated,
      isFetching,
      isInitial,
    }),
    [user, handleLogout, isInitial, isAuthenticated, isFetching],
  );

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
