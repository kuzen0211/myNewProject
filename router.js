import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/auth/LoginScreen';
import RegistrationScreen from './Screens/auth/RegistrationScreen';
import ProfileScreen from './Screens/mainScreen/ProfileScreen';
import CreatePostsScreen from './Screens/mainScreen/CreatePostsScreen';
import PostsScreen from './Screens/mainScreen/PostsScreen';
//import icon
import { AntDesign, Feather } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = isAuth => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator>
                <AuthStack.Screen
                    name="Register"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <AuthStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
            </AuthStack.Navigator>
        );
    }
    return (
        <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
            <MainTab.Screen
                name="PostsScreen"
                component={PostsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    ),
                }}
            />
            <MainTab.Screen
                name="CreatePostsScreen"
                component={CreatePostsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => (
                        <AntDesign name="plus" size={size} color={color} />
                    ),
                }}
            />
            <MainTab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, size, color }) => (
                        <AntDesign
                            name="appstore-o"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </MainTab.Navigator>
    );
};
