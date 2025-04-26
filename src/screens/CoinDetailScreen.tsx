import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Image
} from 'react-native';
import {
    CandlestickChart,
    CandlestickChartProvider,
    Crosshair,
    ChartPath,
    LineChart,
    LinearGradient,
} from 'react-native-wagmi-charts';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchCoinOHLC } from '../services/api';
import { BurjxCoin, OHLCDataPoint } from '../types/coin';
import Colors from '../theme/colors'; // Assuming you have a colors file
import Images from '../theme/Images';

const daysOptions = ['1', '7', '30', '365', 'max'] as const;
type DayType = typeof daysOptions[number];

interface RouteParams {
    productId: string;
    product: BurjxCoin;
}

const CoinDetailScreen: React.FC = () => {
    const route = useRoute<RouteParams>();
    const navigation = useNavigation();
    const { productId, product } = route.params;
    const [chartType, setChartType] = useState<'line' | 'candlestick'>('candlestick');
    const [days, setDays] = useState<DayType>('30');
    const [data, setData] = useState<OHLCDataPoint[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchCoinOHLC(productId, days);
            if (response) {
                setData(
                    response.map((item) => ({
                        date: item.date,
                        usd: item.usd,
                    }))
                );
            } else {
                setError('Failed to fetch OHLC data.');
            }
        } catch (error: any) {
            console.error('Error loading OHLC data:', error);
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }, [productId, days]);

    useEffect(() => {
        loadData();
    }, [loadData]); // Depend on the useCallback

    const transformedData = useMemo(
        () =>
            data.map((item) => ({
                timestamp: item.date,
                open: item.usd.open,
                high: item.usd.high,
                low: item.usd.low,
                close: item.usd.close,
            })),
        [data]
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={loadData}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source = {Images.iconLeft} /> 
            </TouchableOpacity>

            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    // onPress={() => setChartType('line')}
                    style={[styles.toggleButton, chartType === 'line' && styles.activeToggle]}
                >
                    <Text style={[styles.toggleText, chartType === 'line' && styles.activeToggleText]}>Line</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setChartType('candlestick')}
                    style={[styles.toggleButton, chartType === 'candlestick' && styles.activeToggle]}
                >
                    <Text style={[styles.toggleText, chartType === 'candlestick' && styles.activeToggleText]}>
                        Candlestick
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.daysSelector}>
                {daysOptions.map((option) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => setDays(option)}
                        style={[styles.dayButton, days === option && styles.activeDay]}
                    >
                        <Text style={[styles.dayText, days === option && styles.activeDayText]}>
                            {option === 'max' ? 'Max' : `${option}d`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={[styles.sectionTitle, styles.paddingLeft15]}>{product?.name}</Text>

            {chartType === 'candlestick' ? (
                <CandlestickChartProvider data={transformedData}>
                    <View style={styles.chartContainer}>
                        <CandlestickChart>
                            <CandlestickChart.Candles  />
                            <CandlestickChart.Crosshair color={Colors.secondary} />
                        </CandlestickChart>
                    </View>
                </CandlestickChartProvider>
            ) : (
                <LineChart.Provider data={transformedData}>
                    <View style={styles.chartContainer}>
                        <LineChart
                            yAccessor={(item) => item.close}
                            xAccessor={(item) => new Date(item.timestamp)}
                            svg={{ stroke: Colors.primary, strokeWidth: 2 }}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <LinearGradient
                                id="gradient"
                                y1="0"
                                y2="1"
                                stops={[
                                    { offset: 0, stopColor: Colors.primary, stopOpacity: 0.2 },
                                    { offset: 1, stopColor: Colors.primary, stopOpacity: 0.01 },
                                ]}
                            />
                            <ChartPath strokeWidth={2} stroke={Colors.primary} fill="url(#gradient)" />
                            <Crosshair color={Colors.secondary} />
                        </LineChart>
                    </View>
                </LineChart.Provider>
            )}

            {transformedData.length === 0 && !loading && (
                <Text style={styles.noDataText}>No data available for the selected period.</Text>
            )}

            <View style={styles.dataSection}>
                <Text style={styles.sectionTitle}>Additional Data</Text>
                <Text style={styles.dataText}>24h Volume: {product.tradingVolume}</Text>
                <Text style={styles.dataText}>Market Cap: {product.marketCap}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    retryText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        // marginBottom: 20,
        flexDirection : 'row'
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        padding: 4,
    },
    toggleButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    activeToggle: {
        backgroundColor: Colors.primary,
    },
    toggleText: {
        color: Colors.secondary,
        fontSize: 16,
    },
    activeToggleText: {
        color: Colors.black,
    },
    daysSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    dayButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: '#1E1E1E',
    },
    activeDay: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    dayText: {
        color: Colors.secondary,
        fontSize: 14,
    },
    activeDayText: {
        color: Colors.secondary,
    },
    chartContainer: {
        height: 300,
        marginBottom: 20,
    },
    noDataText: {
        color: Colors.secondary,
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
    },
    dataSection: {
        marginTop: 20,
        paddingBottom: 20,
        flex: 1,
        justifyContent: 'flex-end',
    },
    sectionTitle: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dataText: {
        color: Colors.secondary,
        fontSize: 16,
        marginBottom: 5,
    },
    paddingLeft15: {
        paddingLeft: 15,
    },
});

export default CoinDetailScreen;