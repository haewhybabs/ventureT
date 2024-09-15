import { PixelRatio, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const processFontSize = (size: number) => {
    let num = size * (screenWidth / 400);
    if (screenWidth < 340) {
        num = num + 2;
    }
    const newSize = PixelRatio.roundToNearestPixel(num);
    return newSize;
};
