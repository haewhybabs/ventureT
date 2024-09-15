import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { themeColors } from '../themes/colors';
import { processFontSize } from '../../utils/functions';
import FontNames from '../../utils/fontNames';

interface AppTextProps {
    children?: any;
    style?: any;
    onPress?: any;
    weight?: keyof typeof FontNames;
    testID?: string;
    size?: number;
    marginVertical?: number;
    marginHorizontal?: number;
    color?: string;
    center?: boolean;
    top?: number; //paddingTop
    bottom?: number;
    lineHeight?: number;
    left?: number;
    right?: number;
    numberOfLines?: number;
    textDecorationLine?: string;
    textTransform?: string;
    letterSpacing?: number
}
export default function AppText({
    children,
    style,
    onPress,
    weight,
    testID,
    size = 14,
    marginVertical = 0,
    marginHorizontal = 0,
    color = themeColors.black,
    center = false,
    top = 0,
    bottom = 0,
    lineHeight,
    left = 0,
    right = 0,
    numberOfLines,
    textDecorationLine,
    textTransform,
    letterSpacing = 1
}: AppTextProps) {
    return (
        <Text
            testID={testID}
            style={[
                appTextStyles.text,
                {
                    fontWeight: weight ? FontNames[weight] : FontNames.regular,
                    fontSize: processFontSize(size),
                    marginVertical,
                    marginHorizontal,
                    color,
                    textAlign: center ? 'center' : null,
                    paddingTop: top,
                    textTransform: textTransform,
                    paddingBottom: bottom,
                    lineHeight: lineHeight || null,
                    paddingRight: right,
                    paddingLeft: left,
                    letterSpacing: 1,
                    textDecorationLine: textDecorationLine,
                },
                style,
            ]}
            onPress={onPress}
            numberOfLines={numberOfLines}>
            {children}
        </Text>
    );
}

export const appTextStyles = StyleSheet.create({
    text: {
        color: themeColors.black,
        // lineHeight: 24,
    },
    defaultStyling: {
        color: themeColors.black,
        fontSize: processFontSize(14),

    }
});


