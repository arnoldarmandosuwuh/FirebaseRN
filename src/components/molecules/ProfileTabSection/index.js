import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import ItemListMenu from '../ItemListMenu';
import { Fire } from '../../../config'
import { showError } from '../../../utils';

const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBarStyle}
      tabStyle={styles.tabStyle}
      renderLabel={({route, focused}) => (
        <Text style={styles.tabText(focused)}>{route.title}</Text>
      )}
    />
  );

const Account = () => {
    const navigation = useNavigation();
    const signOut = () => {
        Fire.auth()
            .signOut()
            .then(() => {
                navigation.replace('SignIn')
            })
            .catch((err) => {
                showError(err.message)
            })
    };
    return (
        <View style={styles.containerAccount}>
        <ItemListMenu text="Edit Profile" />
        <ItemListMenu text="Home Address" />
        <ItemListMenu text="Security" />
        <ItemListMenu text="Payments" />
        <ItemListMenu text="SignOut" onPress={signOut} />
        </View>
    );
};

const FoodMarket = () => {
    return (
        <View style={styles.containerFoodMarket}>
        <ItemListMenu text="Rate App" />
        <ItemListMenu text="Help Center" />
        <ItemListMenu text="Privacy & Policy" />
        <ItemListMenu text="Terms & Conditions" />
        </View>
    );
};

const initialLayout = {width: Dimensions.get('window').width};

const ProfileTabSection = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: '1', title: 'Account'},
        {key: '2', title: 'FoodMarket'},
    ]);

    const renderScene = SceneMap({
        1: Account,
        2: FoodMarket,
    });

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={styles.tabView}
        />
    )
}

export default ProfileTabSection

const styles = StyleSheet.create({
    tabView: {backgroundColor: 'white'},
    indicator: {
        backgroundColor: '#020202',
        height: 3,
        width: '15%',
        marginLeft: '3%',
    },
    tabBarStyle: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: 1,
    },
    tabStyle: {width: 'auto'},
    tabText: (focused) => ({
        fontFamily: 'Poppins-Medium',
        color: focused ? '#020202' : '#8D92A3',
    }),
    containerAccount: {paddingTop: 8, paddingHorizontal: 24},
    containerFoodMarket: {paddingTop: 8, paddingHorizontal: 24},
})
