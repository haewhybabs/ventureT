import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStack, WelcomeStack } from './screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator (Only includes AppStack)
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, // Hides the header in the tab navigator
            }}
        >
            {AppStack.map((item, index) => (
                <Tab.Screen
                    name={item.name}
                    component={item.screen}
                    key={index}
                    options={{ tabBarLabel: item.name }} // Customize each tab label based on screen name
                />
            ))}
        </Tab.Navigator>
    );
};

// Main Stack Navigator (Manages WelcomeStack and Tabs)
const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, // Hides headers for all screens
                }}
                initialRouteName="WelcomeStack" // Start with the WelcomeStack
            >
                {WelcomeStack.map((item, index) => (
                    <Stack.Screen name={item.name} component={item.screen} key={index} />
                ))}

                <Stack.Screen
                    name="AppStack"
                    component={TabNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStack;
