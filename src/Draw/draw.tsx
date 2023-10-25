import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconButton } from 'react-native-paper';

export default function Draw() {

    const [timerLeft, setTimerLeft] = useState(70)

    const [time, setTime] = useState(timerLeft)
    const timerRef = useRef(timerLeft);

    useEffect(() => {
        timerRef.current = time;
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../Images/drawBackground.png')}
                style={{ position: 'absolute', width: '100%', zIndex: 1 }}
            />
            <View style={styles.allSaleContainer}>
                <Image
                    style={{ width: 200, height: 150, marginTop: '10%' }}
                    source={require('../Images/AllSale1.png')}
                />
            </View>
            <View style={styles.timeLeftTextContainer}>
                <Text style={styles.timeLeftText}>
                    До начала розыгрыша
                </Text>
                <IconButton 
                    icon='help-circle-outline' 
                    size={20} 
                    style={{ position: 'absolute', alignSelf: 'center', left: '70%' }} 
                    iconColor="white" />
            </View>
            <View style={styles.countdownContainer}>
                <View style={styles.hoursDigit}>
                    <Text style={{ fontSize: 100, color: 'black', }}>
                        0
                    </Text>
                </View>
                <View style={styles.hoursDigit}>
                    <Text style={{ fontSize: 100, color: 'black', }}>
                        {Math.floor((time % 3600) / 60)}
                    </Text>
                </View>
                <Text style={{ fontSize: 100, color: 'black', }}>
                    :
                </Text>
                <View style={styles.minutesDigit}>
                    <Text style={{ fontSize: 100, color: 'white', }}>
                        {Math.floor((time % 60) / 10)}
                    </Text>
                </View>
                <View style={styles.minutesDigit}>
                    <Text style={{ fontSize: 100, color: 'white', }}>
                        {time % 60 % 10}
                    </Text>
                </View>
            </View>
            <View style={styles.todayGiftsTextContainer}>
                <Text style={styles.todayGiftsText}>
                    Разыгрываем сегодня
                </Text>
                <IconButton 
                    icon='help-circle-outline' 
                    size={20} 
                    style={{ position: 'absolute', alignSelf: 'center', left: '70%' }} 
                    iconColor="white" />
            </View>
            <View style={styles.giftsImageContainer}>
                <Image
                    source={require('../Images/gifts.png')}
                    style={{ resizeMode: 'contain', height: 150, }}
                />
            </View>
            <View style={{ flex: 1, }} />
            <View style={styles.onBoardButtonContainer}>
                <TouchableOpacity
                    style={styles.onBoardButton}
                    onPress={async () => {
                    }}
                >
                    <Text
                        style={{ color: 'white', fontSize: 17, fontWeight: '500', }}>
                        Участвовать
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#393E5D'
    },
    onBoardButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#FF00B8',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    allSaleContainer: {
        width: '100%', 
        alignItems: 'center', 
        marginTop: '5%', 
        zIndex: 2,
    },
    timeLeftTextContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignContent: 'center', 
        width: '100%', 
        zIndex: 2, 
        marginTop: '5%'
    },
    timeLeftText: {
        textAlign: 'center', 
        color: 'white', 
        fontSize: 16, 
        fontWeight: '400',
    },
    countdownContainer: {
        flexDirection: 'row', 
        zIndex: 2, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: '10%'
    },
    hoursDigit: {
        width: 80, 
        height: 120, 
        backgroundColor: 'white', 
        marginHorizontal: 2, 
        borderRadius: 60, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    minutesDigit: {
        width: 80, 
        height: 120, 
        backgroundColor: '#FF00B8', 
        marginHorizontal: 2, 
        borderRadius: 60, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    todayGiftsTextContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignContent: 'center', 
        width: '100%', 
        zIndex: 2, 
        marginTop: '10%'
    },
    todayGiftsText: {
        textAlign: 'center', 
        color: 'white', 
        fontSize: 17, 
        fontWeight: '500',
    },
    giftsImageContainer: {
        zIndex: 2, 
        width: '100%', 
        alignItems: 'center', 
        marginTop: 20,
    },
    onBoardButtonContainer: {
        width: '100%', 
        alignItems: 'center', 
        zIndex: 2,
    }
});