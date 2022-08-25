import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
// import { fetchCount } from './counterAPI';

export interface TokenState {
  access: string | undefined;
  refresh: string | undefined;
}

const initialState: TokenState = {
  access: undefined,
  refresh: undefined,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<TokenState>) => {
      // обновляют state, но вызывают warning
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;

      // state = {...action.payload};
      // console.log('state -->', state);
    },
  },
});

export const { setToken } = tokenSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAccessToken = (state: RootState) => state.token.access;

export const selectRefreshToken = (state: RootState) => state.token.refresh;

export const selectTokens = (state: RootState) => { 
  console.log('selectTokens');
  console.log(state.token);
  return state.token;
}


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default tokenSlice.reducer;
