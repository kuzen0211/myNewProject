import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '../router';

import { useEffect } from 'react';
import { authCurrent } from '../redux/auth/authOperations';

export function Main() {
    const stateChange = useSelector(state => {
        return state.auth.stateChange;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCurrent());
    }, []);

    const routing = useRoute(stateChange);
    return <NavigationContainer>{routing}</NavigationContainer>;
}
