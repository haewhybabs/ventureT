import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from 'react-native';
import HomeActiveIcon from '../assets/svgs/HomeFill.svg';
import HomeIcon from '../assets/svgs/Home.svg';
import MediaActive from '../assets/svgs/MediaIconFill.svg';
import MediaIcon from '../assets/svgs/Media.svg';
import { themeColors } from '../components/themes/colors';
import { useEffect } from 'react';

const useTabBarIcons = () => {

    const renderImage = (type: string) => {
        switch (type) {
            case 'games':
                return <Image source={require('../assets/images/games.png')} />;
            case 'stats':
                return <Image source={require('../assets/images/stats.png')} />;
            case 'avatar':
                return <Image source={require('../assets/images/avatar.png')} />;
            default:
                return null;
        }
    };

    return {
        homeIcon: {
            active: <HomeActiveIcon />,
            inActive: <HomeIcon color={themeColors.black} />,
        },
        mediaIcon: {
            active: <MediaActive />,
            inActive: <MediaIcon />,
        },
        gamesIcon: {
            active: renderImage('games'),
            inActive: renderImage('games'),
        },
        reportIcon: {
            active: renderImage('stats'),
            inActive: renderImage('stats'),
        },
        avatarIcon: {
            active: renderImage('avatar'),
            inActive: renderImage('avatar'),
        },

    };
};

export default useTabBarIcons;
