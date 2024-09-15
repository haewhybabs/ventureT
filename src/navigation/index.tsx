import React, { useCallback } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStack, WelcomeStack } from './screens';
import { themeColors } from '../components/themes/colors';
import AppText from '../components/text/AppText';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator (Only includes AppStack)
const TabNavigator = () => {
    const appMainStacks = AppStack()
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Hides the header in the tab navigator
                tabBarStyle: {
                    backgroundColor: route.name === 'Media' ? themeColors.black : themeColors.secondary
                },
                tabBarIcon: ({ focused, color, size }) => {
                    const RouteData = appMainStacks.stacks.find((item, index) => route.name === item.name)
                    return focused ? RouteData?.activeIcon : RouteData?.inActiveIcon
                },
                tabBarLabel: ({ focused, color, children }) => (
                    <AppText style={{ color: route.name == 'Media' && focused ? themeColors.secondary : color }} size={11}>{children}</AppText>
                ),
                tabBarInactiveTintColor: 'grey'

            })}
        >
            {appMainStacks.stacks.map((item, index) => (
                <Tab.Screen
                    name={item.name}

                    component={item.screen}
                    key={index}
                    options={{
                        // tabBarLabel: item.name,
                        // tabBarLabelStyle: {
                        //     color: item.name != 'Media' ? themeColors.primary : themeColors.primary
                        // }

                    }} // Customize each tab label based on screen name

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
