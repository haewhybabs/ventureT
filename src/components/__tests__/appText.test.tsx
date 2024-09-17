import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppText from '../text/AppText';

// Mock function for processFontSize to avoid needing actual implementation
jest.mock('../../utils/functions', () => ({
    processFontSize: jest.fn((size) => size),
}));

describe('AppText Component', () => {
    it('renders correctly with children', () => {
        const { getByText } = render(<AppText>Test Text</AppText>);
        expect(getByText('Test Text')).toBeTruthy();
    });


    it('handles onPress event', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<AppText onPress={onPressMock}>Clickable Text</AppText>);

        fireEvent.press(getByText('Clickable Text'));
        expect(onPressMock).toHaveBeenCalled();
    });
    it('handles padding and margin props correctly', () => {
        const { getByText } = render(
            <AppText
                marginVertical={10}
                marginHorizontal={5}
                top={5}
                bottom={10}
                left={15}
                right={20}
            >
                Padded and Margined Text
            </AppText>
        );

    });

});
