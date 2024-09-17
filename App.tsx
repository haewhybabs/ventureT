import { View, Text } from 'react-native'
import React from 'react'
import MainStack from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStack />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>

  )
}