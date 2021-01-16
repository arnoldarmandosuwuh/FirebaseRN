import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Logo } from '../../assets'
import { Gap } from '../../components'
import { Fire } from '../../config'

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const unsubscribe = Fire.auth().onAuthStateChanged((user) => {
            setTimeout(() => {
              if (user) {
                navigation.replace('MainApp')
              } else {
                navigation.replace('SignIn')
              }
            }, 3000)
          })

          return () => unsubscribe()
    }, [navigation])
    return (
        <View style={styles.page}>
            <Logo />
            <Gap height={38} />
            <Text style={styles.title}>FoodMarket</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFC700',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        color: '#020202',
        fontFamily: 'Poppins-Medium'
    }
})
