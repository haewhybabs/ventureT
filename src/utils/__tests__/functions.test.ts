import { Dimensions, PixelRatio } from 'react-native';
import { formatCount, processFontSize } from '../functions';


describe('formatCount', () => {
    it('formats large numbers in millions correctly', () => {
        expect(formatCount(1500000)).toBe('1.5M');
        expect(formatCount(2000000)).toBe('2.0M');
    });

    it('formats numbers in thousands correctly', () => {
        expect(formatCount(2500)).toBe('2.5k');
        expect(formatCount(9999)).toBe('10.0k');
    });

    it('returns the number as a string for numbers below 1000', () => {
        expect(formatCount(999)).toBe('999');
        expect(formatCount(10)).toBe('10');
    });
});
