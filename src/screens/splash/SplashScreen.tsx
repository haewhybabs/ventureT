import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

export default function SplashScreen({ navigation, route }: any) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("AppStack")
        }, 3000)

    }, [])
    return (
        <View>
            <Text>Splash</Text>
        </View>
    )
}