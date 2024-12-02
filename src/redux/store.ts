
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import userReducer from './features/user/userSlice'
import vendorReducer from './features/vendor/vendorSlice'
import contributorReducer from './features/contributor/contributorSlice'
import orderReducer from './features/orders/orderSlice'
import assetReducer from './features/asset_management/assetSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    vendor: vendorReducer,
    contributor: contributorReducer,
    order: orderReducer,
    assets: assetReducer
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
