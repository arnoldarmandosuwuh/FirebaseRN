import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IcStarOff, IcStarOn } from '../../../assets'

const Rating = ({ rating }) => {
    const renderStar = () => {
        let star = []
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                star.push(<IcStarOn key={i} />)
            } else {
                star.push(<IcStarOff key={i} />)
            }
        }
        return star
    }

    return (
        <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>
                {renderStar()}
            </View>
            <Text>{`${rating}`}</Text>
        </View>
    )
}

export default Rating

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
    },
    ratingContainer: {
        flexDirection: 'row',
    },
})
