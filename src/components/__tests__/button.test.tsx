import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppText from '../text/AppText'; // Ensure this path is correct
import { themeColors } from '../themes/colors';
import Button from '../button/indext';

describe('Button Component', () => {
    it('renders correctly with a title', () => {
        const { getByText } = render(<Button title="Click Me" />);
        expect(getByText('Click Me')).toBeTruthy();
    });

    it('renders correctly with a custom title component', () => {
        const { getByText } = render(<Button titleComponent={<AppText>Custom Title</AppText>} />);
        expect(getByText('Custom Title')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<Button title="Press Me" onPress={onPressMock} />);

        fireEvent.press(getByText('Press Me'));
        expect(onPressMock).toHaveBeenCalled();
    });

    it('does not call onPress when disabled', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<Button title="Press Me" onPress={onPressMock} disabled={true} />);

        fireEvent.press(getByText('Press Me'));
        expect(onPressMock).not.toHaveBeenCalled();
    });
});
