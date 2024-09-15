import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from './colors';

interface ScreenThemeProps {
    style?: ViewStyle,
    children?: ReactNode,
    testID?: string,
}

export default function ScreenTheme({ style, children, testID }: ScreenThemeProps) {
    return (
        <SafeAreaView style={[screenStyles.container, style]} testID={testID}>
            {
                children
            }
        </SafeAreaView>
    )
}

const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.secondary
    }
})