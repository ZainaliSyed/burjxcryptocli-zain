import React from 'react';
import { View,  StyleSheet, Image } from 'react-native';
import { Coin } from '../types/coin';
import Colors from '../theme/colors';
import TextComponent from '../components/Text';
import Images from '../theme/Images';

interface CoinCardProps {
    coin: Coin;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
    const lineColor = coin.price_change_percentage_24h >= 0 ? Colors.primary : Colors.red;
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Image source={{ uri: coin.image }} style={styles.icon} />
                </View>
                <View>
                    <TextComponent weight='regular' style={styles.symbol}>{coin.symbol.toUpperCase()}</TextComponent>
                    <TextComponent weight='regular' style={styles.name}>{coin.name}</TextComponent>
                </View>
            </View>
            <Image source={coin.price_change_percentage_24h >= 0 ? Images.greenChart : Images.redChart}  style= {styles.graph} />
            <View style={styles.footer}>
                <TextComponent weight="semibold" style={styles.price}>${coin.current_price.toFixed(2)}</TextComponent>
                <View style={[styles.percentageContainer]}>
                    <TextComponent weight='regular' style={[styles.percentage, { color: lineColor }]}>
                        {coin.price_change_percentage_24h ? `${coin.price_change_percentage_24h.toFixed(2)}%` : 'N/A'}
                    </TextComponent>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 180,
        height: 191,
        borderRadius: 24,
        padding: 10,
        backgroundColor: '#1E1E1E',
        borderWidth: 0.5,
        borderColor: '#333333',
        justifyContent : 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#2C2C2C',
        borderRadius: 14,
        marginRight: 5,
    },
    graph : {
        marginVertical : 15,
        alignSelf : "center",
    },
    icon: {
        width: 40,
        height: 40,
    },
    symbol: {
        fontSize: 16,
        color: Colors.white,
        lineHeight: 24,
        fontWeight : '400',
    },
    name: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight : '300',
        color: 'gray',
    },
    footer: {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    price: {
        fontSize: 16,
        color: Colors.TextPrimaryWhite,
        marginBottom: 5,
    },
    percentageContainer: {
        borderWidth : 0.5,
        borderRadius: 16,
        padding: 8,
        borderColor : 'rgba(43, 43, 43, 0.3)',
        backgroundColor : 'rgba(43, 43, 43, 0.3)',
        alignSelf : 'center',
    },
    percentage: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 15,
    },
});

export default CoinCard;