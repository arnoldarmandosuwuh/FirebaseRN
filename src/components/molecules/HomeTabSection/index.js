import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { FoodDummy1, FoodDummy2, FoodDummy3, FoodDummy4 } from '../../../assets'
import ItemListFood from '../ItemListFood'
import { Fire } from '../../../config'
import { showError } from '../../../utils'

const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#020202', height: 3, width: '15%', marginLeft: '3%' }}
      style={{ backgroundColor: '#FFFFFF' }}
      tabStyle={{ width: 'auto' }}
      renderLabel={({ route, focused, color }) => (
        <Text 
            style={{ 
                fontFamily: 'Poppins-Medium', 
                color: focused ? '#020202' : '#8D92A3' 
            }}>
          {route.title}
        </Text>
      )}
    />
  )

const NewTaste = () => {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        getNewTaste()
    }, [])

    const getNewTaste = () => {
        Fire.database()
            .ref('foods/')
            .orderByChild('category')
            .equalTo('New Taste')
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
        <View style={{ paddingTop: 8, }}>
            {foods.map((item) => {
                return (
                    <ItemListFood key={item.id} image={{ uri: item.image }} title={item.name} rate={item.rate} price={item.price} />
                )
            })}
        </View>
      )
}
  
const Popular = () => {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        getPopular()
    }, [])

    const getPopular = () => {
        Fire.database()
            .ref('foods/')
            .orderByChild('category')
            .equalTo('Popular')
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
        <View style={{ paddingTop: 8, }}>
            {foods.map((item) => {
                return (
                    <ItemListFood key={item.id} image={{ uri: item.image }} title={item.name} rate={item.rate} price={item.price} />
                )
            })}
        </View>
      )
}

const Recommended = () => {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        getRecommended()
    }, [])

    const getRecommended = () => {
        Fire.database()
            .ref('foods/')
            .orderByChild('rate')
            .startAt(4.0)
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
        <View style={{ paddingTop: 8, }}>
            {foods.map((item) => {
                return (
                    <ItemListFood key={item.id} image={{ uri: item.image }} title={item.name} rate={item.rate} price={item.price} />
                )
            })}
        </View>
      )
}

const initialLayout = { width: Dimensions.get('window').width }

const HomeTabSection = () => {
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: '1', title: 'New Taste' },
        { key: '2', title: 'Popular' },
        { key: '3', title: 'Recommended' },
    ])

    const renderScene = SceneMap({
        1: NewTaste,
        2: Popular,
        3: Recommended,
    })

    return (
        <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
    )
}

export default HomeTabSection

const styles = StyleSheet.create({})
