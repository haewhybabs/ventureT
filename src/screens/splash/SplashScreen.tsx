import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchVideos } from '../video/videoSlice';
import Logo from '../../assets/svgs/Logo.svg'
import { themeColors } from '../../components/themes/colors';
import ScreenTheme from '../../components/themes';

export default function SplashScreen({ navigation }: any) {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const initSplashScreen = async () => {
            try {
                // Any initialization logic goes here
            } finally {
                setTimeout(async () => {
                    await BootSplash.hide({ fade: true });
                    navigation.navigate('AppStack');
                }, 3000);
            }
        };

        initSplashScreen();
    }, [navigation]);

    useEffect(() => {
        dispatch(fetchVideos());
    }, [dispatch]);

    return (
        <ScreenTheme style={styles.container}>
            <Logo testID="logo" />
        </ScreenTheme>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColors.secondary
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});
