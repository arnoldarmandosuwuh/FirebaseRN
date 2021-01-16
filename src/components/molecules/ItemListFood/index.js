import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Rating from '../Rating'

const ItemListFood = ({ image, title, rate, price }) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{`IDR ${price}`}</Text>
            </View>
            <Rating rating={rate} />
        </View>
    )
}

export default ItemListFood

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 24, 
        paddingVertical: 8, 
        alignItems: 'center', 
    },
    image: { 
        width: 60, 
        height: 60, 
        borderRadius: 8, 
        overflow: 'hidden', 
        marginRight: 12, 
    },
    content: { 
        flex: 1, 
    },
    title: { 
        fontFamily: 'Poppins-Regular', 
        fontSize: 16, 
        color: '#020202', 
    },
    price: { 
        fontFamily: 'Poppins-Regular', 
        fontSize: 13, 
        color: '#8D92A3', 
    },
})
