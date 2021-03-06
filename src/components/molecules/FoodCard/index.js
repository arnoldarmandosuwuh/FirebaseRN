import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Rating from '../Rating'

const FoodCard = ({ image, title, rate }) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} /> 
            <View style={styles.content}>
                <Text style={styles.text}>{title}</Text>
                <Rating rating={rate} />
            </View>
        </View>
    )
}

export default FoodCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 14,
        width: 200,
        overflow: 'hidden',
        marginRight: 24,
    },
    image: {
        width: 200,
        height: 140,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#020202',
    },
    content: {
        padding: 12,
    },
})
