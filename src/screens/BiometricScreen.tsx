import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Image , SafeAreaView, Button} from 'react-native';
import useBiometricAuth from '../hooks/useBiometricAuth';
import en from '../i18n/en';
import Colors from '../theme/colors';
import Images from '../theme/Images'; 
import Text from '../components/Text';


const BiometricScreen = () => {
    const { biometricAvailable, handleBiometricAuth, isAuthenticating } = useBiometricAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.titleView}>
                <Text weight='regular' style={styles.title}>{en.authTitle}</Text>
            </View>
                <Image source={Images.biometric} resizeMode="contain" style = {styles.imageContainer} />
            {biometricAvailable ? (
                <View style = {styles.button}>
                <Button
                    title={isAuthenticating ? '' : en.authButton}
                    color={Colors.black}
                    onPress={handleBiometricAuth}
                    disabled={isAuthenticating}
                />
                </View>
            ) : (
                <Text style={styles.infoText}>{en.biometricNotAvailable}</Text>
            )}
            {isAuthenticating && (
                <View style={styles.loadingIndicator}>
                    <ActivityIndicator color={Colors.white} size="large" />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    titleView: {
        alignItems : 'flex-start', marginHorizontal : 20, width : "60%",marginTop : 20
    },
    title: {
        fontSize: 32,
        fontWeight: '400',
        color: Colors.white,
        lineHeight: 42,
        letterSpacing : 0,
        textAlign : 'left',
    },
    imageContainer : {
        justifyContent : 'center', alignItems : 'center', alignSelf : 'center',flex:1
    },
    button: {
        justifyContent : "center",
        alignItems : 'center',
        textAlign : 'center',
        backgroundColor: Colors.primary, // Use your primary color
        borderRadius: 24,
        paddingVertical:10,
        marginHorizontal : 20,
        
    },
    buttonText: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing : 0
    },
    infoText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray', // Or use a theme color
    },
    loadingIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional semi-transparent background
    },
});

export default BiometricScreen;