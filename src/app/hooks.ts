import { useCookies } from 'react-cookie';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setToken } from './Auth/tokenSlice';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLogout = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookies, removeCookies] = useCookies(['access', 'refresh']);
    const dispatch = useAppDispatch();
  
    console.log('processing logout');
    removeCookies('access');
    removeCookies('refresh');
    dispatch(setToken({ access: undefined, refresh: undefined }));
  }
  