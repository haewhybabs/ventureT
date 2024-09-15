import { View, Text } from 'react-native'
import React from 'react'
import MainStack from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainStack />
    </SafeAreaProvider>

  )
}