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

//Function to format numbers
export const formatCount = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
    return count.toString();
};
