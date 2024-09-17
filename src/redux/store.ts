import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import videoSlice, { VideoInitialState } from '../screens/video/videoSlice'; // Import the slice created below

const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // storage for persistence
    whitelist: ['video'] // Persist only the video slice
};

//this is to reset the storage when it persists
const migrationVersion = 1;
export const migrations = {
    [migrationVersion]: (state: any) => {
        return {
            ...state,
            video: VideoInitialState
        };
    },
};


const rootReducer = combineReducers({
    video: videoSlice,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
