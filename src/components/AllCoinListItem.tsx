import React, { memo } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BurjxCoin } from '../types/coin';
import Colors from '../theme/colors';
import TextComponent from './Text';
import Images from '../theme/Images';
import en from '../i18n/en';

interface AllCoinListItemProps {
    coin: BurjxCoin;
    onPress?: () => void;
}

const AllCoinListItem: React.FC<AllCoinListItemProps> = memo(({ coin, onPress }) => {
    const lineColor = coin.priceChangePercentage24h >= 0 ? Colors.primary : Colors.red;
    const percentageText = coin.priceChangePercentage24h ? `${coin.priceChangePercentage24h.toFixed(2)}%` : en.ok;
    const chartImageSource = coin.priceChangePercentage24h > 0 ? Images.greenChart : Images.redChart;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.justifyContent}>
                <View style={styles.flexDirectionRow}>
                    <Image source={{ uri: coin.image }} style={styles.icon} />
                    <View>
                        <TextComponent weight="semibold" style={styles.symbol}>{coin.symbol.toUpperCase()}</TextComponent>
                        <TextComponent style={styles.name}>{coin.name}</TextComponent>
                    </View>
                </View>
                <TextComponent style={styles.price}>${coin.currentPrice.toFixed(2)}</TextComponent>
            </View>

            <View style={styles.rightContainer}>
                <View style={[styles.percentageContainer]}>
                    <TextComponent weight='regular' style={[styles.percentage, { color: lineColor }]}>
                        {percentageText}
                    </TextComponent>
                </View>
                <Image source={chartImageSource} />
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: Colors.cardBackground,
        borderWidth: 0.5,
        borderColor: Colors.border,
    },
    justifyContent: { justifyContent: 'space-between' },
    flexDirectionRow: { flexDirection: 'row' },
    icon: {
        width: 38,
        height: 38,
        marginRight: 5
    },
    symbol: {
        fontSize: 16,
        color: Colors.TextPrimaryWhite, 
        lineHeight: 24,
        fontWeight: '400',
    },
    name: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '300',
        color: Colors.textSecondary, 
    },
    price: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        color: Colors.TextPrimaryWhite, 
        paddingVertical: 10,
    },
    rightContainer: { flex: 1, alignItems: 'flex-end' },
    percentageContainer: {
        borderWidth: 0.5,
        borderRadius: 15,
        padding: 4,
        borderColor: 'rgba(43, 43, 43, 0.3)',
        backgroundColor: 'rgba(43, 43, 43, 0.3)',
    },
    percentage: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 15,
    },
});

export default AllCoinListItem;