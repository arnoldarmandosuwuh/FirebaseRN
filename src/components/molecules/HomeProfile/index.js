import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ProfileDummy } from '../../../assets'
import { getData } from '../../../utils'

const HomeProfile = () => {
    const [profile, setProfile] = useState({
        photo: ProfileDummy,
        fullName: '',
        address: '',
      })

      useEffect(() => {
        getData('user').then((res) => {
          const data = res
          data.photo = { uri: res.photo }
          setProfile(data)
        })
      }, [])

    return (
        <View style={styles.profileContainer}>
            <View>
                <Text style={styles.appName}>FoodMarket</Text>
                <Text style={styles.desc}>Let's get some foods</Text>
            </View>
            <Image source={profile.photo} style={styles.profile} />
        </View>
    )
}

export default HomeProfile

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF'
    },
    appName: {
        fontSize: 22,
        fontFamily: 'Poppins-Medium',
        color: '#020202',
    },
    desc: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3'
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
})
