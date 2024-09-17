import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { themeColors } from '../themes/colors';
import AppText from '../text/AppText';
import { Divider, HeaderIconText, renderIcons, ShadowView } from '../renderHelpers';

// Mocking the `AppText` component

describe('Components Tests', () => {
    it('renders renderIcons component correctly', () => {
        const mockOnPress = jest.fn();
        const { getByTestId } = render(
            renderIcons({ onPress: mockOnPress, icon: <AppText>Icon</AppText> }, 0)
        );
        expect(getByTestId('renderIcons')).toBeTruthy();
    });

    it('handles renderIcons onPress event', () => {
        const mockOnPress = jest.fn();
        const { getByTestId } = render(
            renderIcons({ onPress: mockOnPress, icon: <AppText>Icon</AppText> }, 0)
        );
        fireEvent.press(getByTestId('renderIcons'));
        expect(mockOnPress).toHaveBeenCalled();
    });


    it('renders ShadowView component correctly', () => {
        const { getByText } = render(
            <ShadowView>
                <AppText>Child Element</AppText>
            </ShadowView>
        );
        expect(getByText('Child Element')).toBeTruthy();
    });


});
