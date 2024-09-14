import HomeScreen from '../screens/home/HomeScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import VideoScreen from '../screens/video/VideoScreen';


export const WelcomeStack =
    [
        {
            screen: SplashScreen,
            name: "Splash"
        },
    ];

export const AppStack =
    [
        {
            screen: HomeScreen,
            name: "Home"
        },
        {
            screen: VideoScreen,
            name: "Media"
        },
        {
            screen: VideoScreen,
            name: "Games"
        },
        {
            screen: VideoScreen,
            name: "Report"
        },
    ]