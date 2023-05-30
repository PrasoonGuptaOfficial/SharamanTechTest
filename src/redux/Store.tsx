import {configureStore} from '@reduxjs/toolkit';
import UserInformationReducer from './UserInformationSlice';

export const store = configureStore({
  reducer: UserInformationReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
