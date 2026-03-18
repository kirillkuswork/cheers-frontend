import { IGetUserResponse } from '@/redux/services/types/user';
import { useMemo } from 'react';

export const useShowUserInfo = (user: IGetUserResponse | null) => useMemo(() => (user ? user.name || user.phone : 'Войти'), [user]);
