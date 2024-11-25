
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import userReducer from './features/user/userSlice'
import vendorReducer from './features/vendor/vendorSlice'
import contributorReducer from './features/contributor/contributorSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    vendor: vendorReducer,
    contributor: contributorReducer
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
