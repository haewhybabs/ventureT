import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import BootSplash from "react-native-bootsplash";

export default function SplashScreen({ navigation, route }: any) {
    useEffect(() => {
        const init = async () => {
            // …do multiple sync or async tasks
        };

        init().finally(async () => {
            await BootSplash.hide({ fade: true });
            console.log("BootSplash has been hidden successfully");
        });
    }, []);
    return (
        <View>
            <Text>Splash</Text>
        </View>
    )
}