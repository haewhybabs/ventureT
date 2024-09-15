import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import AppText from '../text/AppText'
import { themeColors } from '../themes/colors'
interface ButtonProps {
    style?: ViewStyle,
    onPress?: () => void
    title?: string
    disabled?: boolean,
    titleComponent?: ReactNode

}
export default function Button({
    style,
    onPress,
    title,
    titleComponent,
    disabled
}: ButtonProps) {
    return (
        <>
            {
                disabled ?
                    <View style={[
                        styles.buttonWrapper, style, { opacity: 0.6 }
                    ]}>
                        <AppText style={styles.buttonText}> {title} </AppText>
                    </View>
                    :
                    <TouchableOpacity style={[styles.buttonWrapper, style]} onPress={onPress} >
                        {
                            titleComponent ? titleComponent : <AppText style={styles.buttonText}> {title} </AppText>
                        }

                    </TouchableOpacity>
            }
        </>
    )
}

export const styles = StyleSheet.create({
    buttonWrapper: {
        width: '100%',
        height: 45,
        backgroundColor: themeColors.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: themeColors.black,
        fontSize: 15,
        fontWeight: 'bold'
    },
})