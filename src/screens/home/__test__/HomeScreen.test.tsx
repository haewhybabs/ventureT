import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';  // Adjust the path as necessary
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createThumbnail } from 'react-native-create-thumbnail';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { configureStore } from '@reduxjs/toolkit';

// Mock createThumbnail
jest.mock('react-native-create-thumbnail', () => ({
    createThumbnail: jest.fn(),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));


describe('HomeScreen Component', () => {
    let store;
    let navigationMock: any;

    beforeEach(() => {
        // createThumbnail.mockResolvedValue({
        //     path: 'thumbnail-path',
        // });

        navigationMock = { navigate: jest.fn() };

        // useNavigation.mockReturnValue(navigationMock);

        store = configureStore({
            reducer: {
                videos: (state = {}, action) => state,
            },

        });

        render(
            <NavigationContainer>

                <HomeScreen navigation={navigationMock} />

            </NavigationContainer>
        );
    });

    it('renders correctly and shows thumbnails', async () => {
        expect(screen.getByText('Hello John,')).toBeTruthy();
        expect(screen.getByText('Please tap below')).toBeTruthy();

        await waitFor(() => {
            expect(screen.getByTestId('thumbnail-1')).toBeTruthy();
        });
    });

    it('handles thumbnail generation and navigation', async () => {
        await waitFor(() => {
            const thumbnail = screen.getByTestId('thumbnail-1');
            expect(thumbnail).toBeTruthy();
        });

        fireEvent.press(screen.getByTestId('thumbnail-1'));
        await waitFor(() => {
            expect(navigationMock.navigate).toHaveBeenCalledWith('Media', {
                videoUrl: 'video-url-1.mp4',
                initialVideoIndex: 0,
            });
        });
    });

    it('handles the back button press', () => {
        fireEvent.press(screen.getByText('Cancel'));
        expect(BackHandler.exitApp).not.toHaveBeenCalled();

        fireEvent.press(screen.getByText('Yes'));
        expect(BackHandler.exitApp).toHaveBeenCalled();
    });
});
