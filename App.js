import { useFonts } from 'expo-font';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import { Main } from './components/Main';

export default function App() {
    const [fontsLoaded] = useFonts({
        'Roboto-400': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-500': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-700': require('./assets/fonts/Roboto-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}
