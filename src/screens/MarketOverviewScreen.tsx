import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, TextInput } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Colors from '../theme/colors';
import TextComponent from '../components/Text';
import Icon from '@react-native-vector-icons/fontawesome';
import CoinListTab from '../components/MarketOverview/CoinListTab';
import AllCoinsTab from '../components/AllCoinsTab';

const initialLayout = { width: Dimensions.get('window').width };

const MarketOverviewScreen = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'featured', title: 'Featured', icon: 'star', orderBy: 'market_cap_desc' },
        { key: 'gainers', title: 'Top Gainers', icon: 'rocket', orderBy: 'price_change_percentage_24h_desc' },
        { key: 'losers', title: 'Top Losers', icon: 'flag', orderBy: 'price_change_percentage_24h_asc' },
    ]);
    
    const [searchText, setSearchText] = useState('');

    const renderScene = ({ route }: { route: any }) => (
        <CoinListTab orderBy={route.orderBy} />
    );

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            renderLabel={({ route, focused, color }) => (
                <View style={styles.tabLabelContainer}>
                    <Icon name={route.icon} size={16} color={color} style={styles.tabIcon} />
                    <TextComponent style={{ color : Colors.white, marginHorizontal: 5, fontWeight: focused ? 'bold' : 'normal' }}>
                        {route.title}
                    </TextComponent>
                </View>
            )}
            activeColor={Colors.white}
            inactiveColor={Colors.tabbar_Inactive}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style = {{flex :0.7}}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />
            </View>

            <View style={styles.allCoinsSection}>
                <View>
                    <TextComponent weight="semibold" style={styles.allCoinsTitle}>All Coins</TextComponent>
                    <View style= {{borderWidth : 2, borderColor : Colors.primary, width : 120}} />
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#888"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
                </View>
            </View>
            
            <View style={styles.allCoinsListContainer}>
                <AllCoinsTab searchText={searchText} />
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: Colors.black,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    topTabBar: {
        backgroundColor: Colors.black,
    },
    indicator: {
        backgroundColor: Colors.primary,
        height: 3,
    },
    tabLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabIcon: {
        marginRight: 5,
    },
    allCoinsSection: {
        paddingHorizontal: 20,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    allCoinsTitle: {
        fontSize: 20,
        color: Colors.white,
        lineHeight: 30, 
        fontWeight : '400',
        textAlign : 'center',
        marginBottom : 10
    },
    searchContainer: {
        flex: 1,         
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 100,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        color: Colors.white,
        fontSize: 16,
    },
    searchIcon: {
        marginLeft: 10,
    },
    allCoinsListContainer: {
        flex: 1,
    },
});

export default MarketOverviewScreen;