import { View, Text, TouchableOpacity, ViewStyle, StyleSheet, StyleProp, TextStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { themeColors } from '../themes/colors';
import AppText from '../text/AppText';

interface RenderIconsItem {
    onPress: () => void;
    icon: ReactNode;
    styles?: StyleProp<ViewStyle>;
}
interface DividerProps {
    style?: ViewStyle;
}
interface ShadowViewProps {
    children?: ReactNode,
    style?: ViewStyle;
}
interface HeaderIconTextProps {
    icon: ReactNode,
    headerText: string,
    headerStyle?: StyleProp<ViewStyle | TextStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;
}

export const renderIcons = (item: RenderIconsItem, index: number) => {
    return (
        <TouchableOpacity style={[styles.iconContainer, item.styles]} onPress={item.onPress} key={index}>
            {item.icon}
        </TouchableOpacity>
    )
}



export const Divider = ({ style = {} }: DividerProps) => {
    return (
        <View
            style={[
                styles.divider,
                style
            ]}
        />
    )
}

export const ShadowView = ({ children, style = {} }: ShadowViewProps) => {
    return <View style={[styles.shadowContainer, style]}>{children}</View>;
};

export const HeaderIconText = ({ icon, headerText, headerStyle, wrapperStyle }: HeaderIconTextProps) => {
    return (
        <View style={[styles.row, styles.marginAlign, wrapperStyle]}>
            {icon}
            <AppText style={headerStyle} weight='semibold' size={20} left={10}>{headerText}</AppText>
        </View>
    )
}


const styles = StyleSheet.create({
    iconContainer: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    divider: {
        height: 0.5,
        opacity: 1,
        backgroundColor: themeColors.lightGrey,
        marginVertical: 10
    },
    shadowContainer: {
        shadowColor: themeColors.black,
        shadowOffset: { width: 0, height: 4 }, // Increase height for more vertical shadow
        shadowOpacity: 0.4, // Increase opacity for a darker shadow
        shadowRadius: 10,   // Increase radius for a more spread-out shadow
        borderRadius: 5,
        backgroundColor: themeColors.secondary,
        elevation: 5,       // Increase elevation for a stronger shadow on Android
    },
    row: {
        flexDirection: 'row'
    },
    marginAlign: {
        marginTop: 10
    },
})
