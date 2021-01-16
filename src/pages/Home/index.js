import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4 } from '../../assets'
import { FoodCard, Gap, HomeProfile, HomeTabSection } from '../../components'
import { showError } from '../../utils'
import { Fire } from '../../config'

const Home = () => {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        getFoods()
    }, [])

    const getFoods = () => {
        Fire.database()
            .ref('foods/')
            .once('value')
            .then((res) => {
                if (res.val()) {
                    const data = res.val()
                    const filterData = data.filter((el) => el !== null)
                    setFoods(filterData)
                }
            })
            .catch((err) => {
               showError(err.message)
            })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.page}>
                <HomeProfile />
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.foodCardContainer}>
                            <Gap width={24} />
                            {foods.map((item) => {
                                return (
                                    <FoodCard key={item.id} image={{ uri: item.image }} title={item.name} rate={item.rate} />
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.tabContainer}>
                    <HomeTabSection />
                </View>
            </View>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    foodCardContainer: {
        flexDirection: 'row',
        marginVertical: 24,
    },
    tabContainer: {
        flex: 1,
    },
})
