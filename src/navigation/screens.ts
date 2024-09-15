import HomeScreen from '../screens/home/HomeScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import VideoScreen from '../screens/video/VideoScreen';
import useTabBarIcons from './useTabBarIcons';


export const WelcomeStack =
    [
        {
            screen: SplashScreen,
            name: "Splash"
        },
    ];


export const AppStack = () => {
    const tabIcons = useTabBarIcons()

    return {
        stacks: [
            {
                screen: HomeScreen,
                name: "Home",
                activeIcon: tabIcons.homeIcon.active,
                inActiveIcon: tabIcons.homeIcon.inActive,
            },
            {
                screen: VideoScreen,
                name: "Media",
                activeIcon: tabIcons.mediaIcon.active,
                inActiveIcon: tabIcons.mediaIcon.inActive,
            },
            {
                screen: VideoScreen,
                name: "Games",
                activeIcon: tabIcons.gamesIcon.active,
                inActiveIcon: tabIcons.gamesIcon.inActive,
            },
            {
                screen: VideoScreen,
                name: "Report",
                activeIcon: tabIcons.reportIcon.active,
                inActiveIcon: tabIcons.reportIcon.inActive,
            },

            {
                screen: VideoScreen,
                name: "Account",
                activeIcon: tabIcons.avatarIcon.active,
                inActiveIcon: tabIcons.avatarIcon.inActive,
            },
        ]
    }

}
