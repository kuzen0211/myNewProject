import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultScreen from '../nestedScreen/DefaultScreen';
import CommentsScreen from '../nestedScreen/CommentsScreen';
import MapScreen from '../nestedScreen/MapScreen';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                name="DefaultScreen"
                component={DefaultScreen}
                options={{
                    headerShown: false,
                }}
            />
            <NestedScreen.Screen
                name="CommentsScreen"
                component={CommentsScreen}
                options={{
                    headerTitleAlign: 'center',
                    title: 'Коментарі',
                }}
            />
            <NestedScreen.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    headerTitleAlign: 'center',
                    title: 'Карта',
                }}
            />
        </NestedScreen.Navigator>
    );
};

export default PostsScreen;
