import { useState, useEffect } from 'react';
import ReactNativeBiometrics, { Biometrics } from 'react-native-biometrics';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import en from '../i18n/en';

const useBiometricAuth = () => {
    const navigation = useNavigation();
    const [biometricAvailable, setBiometricAvailable] = useState<Biometrics | null>(null);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    useEffect(() => {
        const rnBiometrics = new ReactNativeBiometrics();

        rnBiometrics.isSensorAvailable()
            .then((result) => {
                if (result.available) {
                    setBiometricAvailable(result.biometryType);
                } else {
                    Alert.alert(
                        en.biometricUnavailableTitle,
                        en.biometricUnavailableMessage,
                        [{ text: en.ok, onPress: () => navigation.replace('MarketOverview') }]
                    );
                }
            });
    }, [navigation]);

    const handleBiometricAuth = async () => {
        if (biometricAvailable && !isAuthenticating) {
            setIsAuthenticating(true);
            const rnBiometrics = new ReactNativeBiometrics();

            rnBiometrics.simplePrompt({ promptMessage: `${en.authButton} using your ${biometricAvailable}` })
                .then((result) => {
                    setIsAuthenticating(false);
                    if (result.success) {
                        console.log('Biometric authentication successful');
                        navigation.replace('MarketOverview');
                    } else {
                        Alert.alert(en.authenticationFailedTitle, en.authenticationFailedMessage);
                    }
                })
                .catch(() => {
                    setIsAuthenticating(false);
                    Alert.alert(en.authenticationErrorTitle, en.authenticationErrorMessage);
                });
        } else if (!biometricAvailable) {
            Alert.alert(
                en.biometricNotSetupTitle,
                en.biometricNotSetupMessage,
                [{ text: en.ok, onPress: () => navigation.replace('MarketOverview') }]
            );
        }
    };

    return { biometricAvailable, handleBiometricAuth, isAuthenticating };
};

export default useBiometricAuth;