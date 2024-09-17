import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';
import BootSplash from 'react-native-bootsplash';
import { Provider, useDispatch } from 'react-redux';
import { fetchVideos } from '../../video/videoSlice';
import { NavigationContainer } from '@react-navigation/native';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../../../assets/svgs/Logo.svg', () => 'Logo');
// Mock necessary modules and components
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));
jest.mock('react-native-bootsplash', () => ({
    hide: jest.fn(),
}));
jest.mock('../../video/videoSlice', () => ({
    fetchVideos: jest.fn(),
}));

describe('SplashScreen', () => {
    let dispatchMock: jest.Mock;
    let navigationMock: any;

    beforeEach(() => {
        dispatchMock = jest.fn();
        (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
        navigationMock = { navigate: jest.fn() };

        const mockStore = configureStore({
            reducer: {
                videos: (state = {}, action) => state,
            },
        });
        render(
            <NavigationContainer>

                <SplashScreen navigation={navigationMock} />

            </NavigationContainer>,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the logo correctly', () => {
        expect(screen.getByTestId('logo')).toBeTruthy();
    });

    it('hides the BootSplash after 3 seconds and navigates to AppStack', async () => {
        jest.useFakeTimers();

        render(
            <NavigationContainer>
                <SplashScreen navigation={navigationMock} />
            </NavigationContainer>
        );
        act(() => {
            jest.runAllTimers();
        });
        expect(BootSplash.hide).toHaveBeenCalledWith({ fade: true });


    });


});
