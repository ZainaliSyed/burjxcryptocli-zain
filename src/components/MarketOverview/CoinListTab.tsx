import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Coin } from '../../types/coin';
import { fetchTopCoins } from '../../services/api';
import Colors from '../../theme/colors';
import CoinListItem from '../CoinListItem';

interface CoinListTabProps {
    orderBy: string;
}

const CoinListTab: React.FC<CoinListTabProps> = ({ orderBy }) => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadCoins();
    }, [orderBy]);

    const loadCoins = async () => {
        setLoading(true);
        const data = await fetchTopCoins(orderBy, 20);
        if (data) {
            if (orderBy === 'market_cap_desc') {
                setCoins(data);
            } else if (orderBy === 'price_change_percentage_24h_desc') {
                setCoins(data.filter(coin => coin.price_change_percentage_24h >= 0)); // Top Gainers
            } else if (orderBy === 'price_change_percentage_24h_asc') {
                setCoins(data.filter(coin => coin.price_change_percentage_24h < 0)); // Top Losers
            }
        } else {
        }
        setLoading(false);
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadCoins();
        setRefreshing(false);
    }, [orderBy, loadCoins]);

    const renderItem = ({ item }: { item: Coin }) => (
        <CoinListItem coin={item} />
    );

    return (
        <>
            {loading ? (
                <ActivityIndicator color={Colors.primary} size="large" />
            ) : (
                <FlatList
                    data={coins}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    bounces={false}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    flatListContent: {
        paddingHorizontal: 20,
        gap: 10,
        marginTop: 20,
    },
});

export default CoinListTab;