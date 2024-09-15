import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import BootSplash from "react-native-bootsplash";

export default function SplashScreen({ navigation, route }: any) {
    useEffect(() => {
        const init = async () => {

        };

        init().finally(async () => {
            await BootSplash.hide({ fade: true });
            navigation.navigate("AppStack")
        });
    }, []);
    return <></> // handles logic expected on the splash as the splash load is handled by the native bootsplash
}