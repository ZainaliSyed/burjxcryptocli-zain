import React from 'react';
import { Text as RNText, TextStyle, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
    weight?: 'regular' | 'bold' | 'semibold';
    style?: TextStyle | TextStyle[];
}

const Text: React.FC<CustomTextProps> = ({ children, weight = 'regular', style, ...rest }) => {
    const getFontWeight = (): TextStyle['fontWeight'] => {
        switch (weight) {
            case 'bold':
                return 'bold';
            case 'semibold':
                return '600'; // Or another value that represents semi-bold
            case 'regular':
            default:
                return 'normal';
        }
    };

    const baseStyle: TextStyle = {
        fontFamily: 'Lufga',
        fontWeight: getFontWeight(),
        lineHeight: 42,
        letterSpacing: 0, // Assuming 0% translates to 0 in React Native
    };

    return (
        <RNText style={[baseStyle, style]} {...rest}>
            {children}
        </RNText>
    );
};

export default Text;