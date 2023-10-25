import { View, Image, StyleSheet, Text } from "react-native";
import { useRecoilValue } from "recoil";
import { userTokenAtom } from "../../App";
import { useEffect, useState } from "react";

export default function ProfileScreen() {

    const userToken = useRecoilValue(userTokenAtom);
    const [profileInfo, setProfileInfo] = useState(null);

    const query = `
    query MyQuery {
        getMe {
          ... on User {
            id
            email
            additionalInfo {
              advantage
              hasDelivery
            }
            address {
              city
              coordinates {
                address
                lat
                lng
              }
            }
            avatar {
              checksum
              createdAt
              id
              name
              path
              size
              type
              updatedAt
            }
            createdAt
            dateOfBirth
            description
            isBlocked
            isFriend
            isFollowing
            isLiked
            likesCount
            login
            name
            phone
            sex
            shortDescription
            subscribersCount
            subscriptionsCount
            updatedAt
            viewsCount
            website
          }
          ... on BaseError {
            __typename
            status
          }
        }
      }`;

    const body = {
        query,
        variables: {
            // token: userToken
        },
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: userToken ? `Bearer ${userToken}` : '',
        },
        body: JSON.stringify(body)
    };

    const getProfileInfo = async () => {
        try {
            await fetch(
                'https://api.quickclick.online/content/graphql', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            //saveUserToken(data.data.createTokens.accessToken); 
                            //setUserToken(data.data.createTokens.accessToken)
                            console.log(JSON.stringify(data.data.getMe));
                            setProfileInfo(data.data.getMe);
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProfileInfo();
    }, [])

    if (!profileInfo) {
        return;
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../Images/drawBackground.png')}
                style={{ position: 'absolute', width: '100%', zIndex: 1 }}
            />
            <View style={{ width: '100%', alignItems: 'center', marginTop: 40, zIndex: 2, }}>
                <Image
                    source={{ uri: profileInfo.avatar.path, width: 170, height: 170, }}
                    style={{ borderRadius: 100, }}
                />
                <Text style={{ fontSize: 18, color: 'white', marginTop: 20 }}>
                    {profileInfo.name}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '200', color: 'white', marginTop: 10 }}>
                    {profileInfo.description}
                </Text>
            </View>
            <View style={{ zIndex: 2, alignItems: 'center', marginTop: 40, }}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 20, color: 'orange', fontWeight: '600', }}>
                    Информация о профиле
                </Text>
                <Text style={{ fontSize: 18, color: 'white', fontWeight: '600', marginTop: 10 }}>
                    {profileInfo.shortDescription}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ fontSize: 18, color: 'white', }}>
                        Подписчиков:
                    </Text>
                    <Text style={styles.subscribersItem}>
                        {profileInfo.subscribersCount}
                    </Text>
                    <Text style={{ fontSize: 18, color: 'white', }}>
                        Подписок:
                    </Text>
                    <Text style={styles.subscribersItem}>
                        {profileInfo.subscriptionsCount}
                    </Text>
                </View>
            </View>
            <View style={{ width: '90%', flexDirection: 'row', zIndex: 2, marginTop: 20, }}>
                <View style={{ width: '50%', flexDirection: 'column', alignItems: 'center', }}>
                    <Text style={styles.itemTitle}>
                        Email
                    </Text>
                    <Text style={styles.itemText}>
                        {profileInfo.email}
                    </Text>
                    <Text style={styles.itemTitle}>
                        Телефон
                    </Text>
                    <Text style={styles.itemText}>
                        {profileInfo.phone}
                    </Text>
                    <Text style={styles.itemTitle}>
                        Дата рождения
                    </Text>
                    <Text style={styles.itemText}>
                        {new Date(profileInfo.dateOfBirth).toLocaleDateString()}
                    </Text>
                    <Text style={styles.itemTitle}>
                        Город
                    </Text>
                    <Text style={styles.itemText}>
                        {profileInfo.address.city}
                    </Text>
                </View>
                <View style={{ width: '50%', flexDirection: 'column', alignItems: 'center', }}>
                    <Text style={styles.itemTitle}>
                        Создан
                    </Text>
                    <Text style={styles.itemText}>
                        {new Date(profileInfo.createdAt).toLocaleDateString()}
                    </Text>
                    <Text style={styles.itemTitle}>
                        Пол
                    </Text>
                    <Text style={styles.itemText}>
                        {profileInfo.sex == 'MALE'
                            ? 'Мужской'
                            : 'Женский'
                        }
                    </Text>
                    <Text style={styles.itemTitle}>
                        Просмотров
                    </Text>
                    <Text style={styles.itemText}>
                        {profileInfo.viewsCount}
                    </Text>
                    <Text style={styles.itemTitle}>
                        Сайт
                    </Text>
                    <Text style={styles.itemText}>
                        {profileInfo.website}
                    </Text>
                </View>
            </View>
            <View style={{ alignItems: 'center', zIndex: 2, marginTop: 30, }}>
                <Text style={styles.itemTitle}>
                    Адрес
                </Text>
                <Text style={styles.itemText}>
                    {profileInfo.address.coordinates[1].address}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#393E5D'
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '500', 
        color: 'white',
        marginTop: 10
    },
    itemText: {
        fontSize: 16, 
        color: 'orange',
        fontWeight: '500',
    },
    subscribersItem: {
        fontSize: 18, 
        color: 'orange', 
        marginHorizontal: 5, 
        fontWeight: '600'
    }
})