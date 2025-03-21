import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlice'

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user']
  };
  
  const rootReducer = {
    auth: persistReducer(authPersistConfig, authReducer),
    event: eventReducer,
  };
  
  export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
  });
  
  export const persistor = persistStore(store);
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;