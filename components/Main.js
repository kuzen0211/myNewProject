import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '../router';

import { useEffect } from 'react';
import { authCurrent } from '../redux/auth/authOperations';

export function Main() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCurrent());
    }, []);

    const stateChange = useSelector(state => {
        console.log('state.auth.stateChange', state.auth.stateChange);
        return state.auth.stateChange;
    });
    const routing = useRoute(stateChange);
    return <NavigationContainer>{routing}</NavigationContainer>;
}
