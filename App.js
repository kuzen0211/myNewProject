import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './router';
import React from 'react';

export default function App() {
    const routing = useRoute({}); //null - register/login && object{} - userMenu

    const [fontsLoaded] = useFonts({
        'Roboto-400': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-500': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-700': require('./assets/fonts/Roboto-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return <NavigationContainer>{routing}</NavigationContainer>;
}
