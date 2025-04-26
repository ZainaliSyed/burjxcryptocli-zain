import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { BurjxCoin } from '../types/coin';
import { fetchAllCoins } from '../services/api';
import Colors from '../theme/colors';
import TextComponent from './Text';
import AllCoinListItem from './AllCoinListItem';
import { useNavigation } from '@react-navigation/native'; 


interface AllCoinsTabProps {
    searchText: string;
}

const AllCoinsTab: React.FC<AllCoinsTabProps> = ({ searchText }) => {
    const [allCoins, setAllCoins] = useState<BurjxCoin[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<BurjxCoin[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        loadInitialCoins();
    }, []);

    useEffect(() => {
        if (searchText) {
            const text = searchText.toLowerCase();
            setFilteredCoins(
                allCoins.filter((coin) =>
                    coin.name.toLowerCase().includes(text) || coin.symbol.toLowerCase().includes(text)
                )
            );
            setHasMore(false);
        } else {
            setFilteredCoins(allCoins);
            setHasMore(true);
        }
        setPage(1);
    }, [searchText, allCoins]);

    const loadInitialCoins = async () => {
        setLoading(true);
        const initialData = await fetchAllCoins(1, 10);
        if (initialData?.data) {
            setAllCoins(initialData.data);
            setFilteredCoins(initialData.data);
            setPage(2);
        } else {
            setHasMore(false);
        }
        setLoading(false);
    };

    const loadMoreCoins = useCallback(async () => {
        if (!loading && hasMore && !searchText) {
            setLoading(true);
            const nextData = await fetchAllCoins(page, 10);
            if (nextData?.data && nextData.data.length > 0) {
                setAllCoins((prevCoins) => [...prevCoins, ...nextData.data]);
                setFilteredCoins((prevFilteredCoins) => [...prevFilteredCoins, ...nextData.data]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
            setLoading(false);
        }
    }, [loading, hasMore, page, searchText]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setPage(1);
        setHasMore(true);
        const initialData = await fetchAllCoins(1, 10);
        if (initialData?.data) {
            setAllCoins(initialData.data);
            setFilteredCoins(initialData.data);
            setPage(2);
        }
        setRefreshing(false);
    }, []);

    const renderItem = ({ item }: { item: BurjxCoin }) => (
        <AllCoinListItem coin={item} onPress={() => {
            navigation.navigate('CoinDetailScreen', { productId: item.productId, product : item });
        }} />
    );

    const renderFooter = () => {
        if (loading && filteredCoins.length > 0 && !searchText) {
            return <ActivityIndicator color={Colors.primary} style={styles.loadingIndicator} />;
        }
        return null;
    };

    const onEndReached = useCallback(() => {
        if (!loading && hasMore && !searchText) {
            loadMoreCoins();
        }
    }, [loading, hasMore, searchText, loadMoreCoins]);

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredCoins}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />
                }
                ListEmptyComponent={() => (
                    !loading && <TextComponent style={styles.emptyText}>No coins found.</TextComponent>
                )}
                contentContainerStyle={styles.listContentContainer}
            />
            {loading && allCoins.length === 0 && !searchText && (
                <View style={styles.initialLoading}>
                    <ActivityIndicator color={Colors.primary} size="large" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingIndicator: {
        marginVertical: 20,
    },
    initialLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    listContentContainer: {
        gap: 5,
    },
});

export default AllCoinsTab;