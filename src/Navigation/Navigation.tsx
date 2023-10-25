import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { Image, TouchableOpacity } from 'react-native';
import Auth from '../Auth/Auth';
import React from 'react';
import Draw from '../Draw/draw';
import { useRecoilState } from 'recoil';
import { userTokenAtom } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import ProfileScreen from '../Profile/profileScreen';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator()

export default function Navigation() {

    const [userToken, setUserToken] = useRecoilState(userTokenAtom)

    return (
        <NavigationContainer>
            {userToken
                ? <RootNavigation />
                : <AuthNavigation />
            }
        </NavigationContainer>
    );
}

export const RootNavigation = () => {

    const [userToken, setUserToken] = useRecoilState(userTokenAtom);

    return (
        <RootStack.Navigator screenOptions={({ route, navigation }) => ({})}>
            <RootStack.Screen
                name="Draw"
                component={Draw}
                options={({ navigation }) => ({
                    title: 'Розыгрыш',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#393E5D',
                    },
                    headerTitleStyle: {
                        color: 'white',
                    },
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                    headerLeft: (props) => {
                        return (
                            <TouchableOpacity onPress={() => setUserToken('')}>
                                <Image
                                    source={require('../Images/drawBack.png')}
                                />
                            </TouchableOpacity>
                        )
                    },
                    headerRight: () => {
                        return (
                            <IconButton 
                                icon='account-circle-outline'
                                iconColor='white'
                                size={25}
                                onPress={() => navigation.navigate('ProfileScreen')}
                            />
                        )
                    }
                })}
            />
            <RootStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#393E5D',
                    },
                    headerTitleStyle: {
                        color: 'white',
                    },
                    title: 'Профиль',
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTintColor: 'white',
                    headerBackVisible: true,
                    headerTitleAlign: 'center',
                    animation: 'slide_from_right',
                }}
            />
        </RootStack.Navigator>
    )
}

export function AuthNavigation() {
    return (
        <AuthStack.Navigator initialRouteName="Auth">
            <AuthStack.Screen
                name="Auth"
                component={Auth}
                options={{
                    title: 'Авторизация',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false
                }}
            />
        </AuthStack.Navigator>
    );
}