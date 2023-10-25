import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton } from 'react-native-paper';
import { useRecoilState } from "recoil";
import { userTokenAtom } from "../../App";

export default function Auth({ navigation }: any) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [userToken, setUserToken] = useRecoilState(userTokenAtom);

    const query = `
    query CreateTokens($login: String!, $password: String!) {
        createTokens(login: $login, password: $password) {
          ... on TokenPair {
            __typename
            accessToken
            refreshToken
          }
          ... on ErrorWithFields {
            __typename
            fields
            status
          }
        }
      }`;

    const body = {
        query,
        variables: {
            login: login.toLowerCase().trim(),
            password: password
        },
    };

    const requestOptions = { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(body) 
    }; 
  
    const signIn = async () => { 
        try { 
            await fetch( 
                'https://api.quickclick.online/content/graphql', requestOptions) 
                .then(response => { 
                    response.json() 
                        .then(data => { 
                            saveUserToken(data.data.createTokens.accessToken); 
                            setUserToken(data.data.createTokens.accessToken)
                        }); 
                }) 
        } 
        catch (error) { 
            console.error(error); 
        } 
    } 

    const saveUserToken = async (value: any) => {
        try {
          await AsyncStorage.setItem('userToken', value)
        } catch (e) {
          console.log('Error:', e);
        }
      }

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 114, height: 70, marginTop: '10%' }}
                source={require('../Images/AllSale.png')}
            />
            <Text style={styles.enterText}>
                Войти
            </Text>
            <TextInput
                style={styles.loginInput}
                placeholder="Логин или телефон"
                onChangeText={(value) => setLogin(value)}
            />
            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Пароль"
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={(text) => setPassword(text)}
                />
                {!isPasswordVisible
                    ? <TouchableOpacity
                        onPress={() => setIsPasswordVisible(true)}
                        style={{ alignSelf: 'flex-end', position: 'absolute', paddingRight: 10, }}
                    >
                        <Image
                            source={require('../Images/view-off.png')}
                        />
                    </TouchableOpacity>
                    : <IconButton
                        onPress={() => setIsPasswordVisible(false)}
                        icon={"eye"}
                        style={{ alignSelf: 'flex-end', position: 'absolute', padding: 0 }}
                        iconColor="#D9D9D9"
                    />
                }
            </View>
            <TouchableOpacity
                style={styles.enterButton}
                onPress={async () => {
                    signIn();
                }}
            >
                <Text
                    style={{ color: 'white', fontSize: 17, fontWeight: '500', }}>
                    Войти
                </Text>
            </TouchableOpacity>
            <Text style={styles.forgotPasswordText}>
                Не помню пароль
            </Text>
            <View style={{ flex: 0.5, }} />
            <TouchableOpacity style={styles.vkButton}>
                <Image
                    style={{ width: 40, height: 25, resizeMode: 'contain' }}
                    source={require('../Images/vk.png')}
                />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '400', }}>
                    {`Войти через `}
                </Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', }}>
                    Вконтакте
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yaButton}>
                <Image
                    style={{ width: 40, height: 25, resizeMode: 'contain' }}
                    source={require('../Images/ya.png')}
                />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '400', }}>
                    {`Войти через `}
                </Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', }}>
                    Яндекс
                </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: '500', marginTop: '10%' }}>
                Регистрация
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    enterText: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: '15%',
        marginBottom: '5%'
    },
    loginInput: {
        height: 50,
        width: '90%',
        backgroundColor: '#F2F2F7',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    passwordInputContainer: {
        height: 50,
        width: '90%',
        justifyContent: 'center',
        marginTop: 10
    },
    passwordInput: {
        height: 50,
        width: '100%',
        backgroundColor: '#F2F2F7',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    enterButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#FF00B8',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    forgotPasswordText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#9B8B97',
        marginTop: '5%'
    },
    vkButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#0077FF',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    yaButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#FB3F1C',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
    }
});