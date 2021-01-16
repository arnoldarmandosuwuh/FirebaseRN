import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Gap, Header, TextInput } from '../../components'
import { Fire } from '../../config'
import { useDispatch } from 'react-redux'
import { useForm, storeData, showError } from '../../utils'

const SignIn = ({ navigation }) => {
    const [form, setForm] = useForm({
        email: '',
        password: '',
    })

    const dispatch = useDispatch()

    const login = () => {
        dispatch({ type: 'SET_LOADING', value: true })
        Fire.auth()
            .signInWithEmailAndPassword(form.email, form.password)
            .then((res) => {
            dispatch({ type: 'SET_LOADING', value: false })
            Fire.database()
                .ref(`users/${res.user.uid}/`)
                .once('value')
                .then((resDB) => {
                    if (resDB.val()) {
                        storeData('user', resDB.val())
                        navigation.replace('MainApp')
                    }
                })
            })
            .catch((err) => {
                dispatch({ type: 'SET_LOADING', value: false })
                showError(err.message)
            })
    }

    return (
        <View style={styles.page}>
            <Header title='Sign In' subTitle='Find your best ever meal' />
            <View style={styles.container}>
                <TextInput label='Email Address' placeholder='Type your email address' value={form.email} onChangeText={(value) => setForm('email', value)}  />
                <Gap height={16} />
                <TextInput label='Password' placeholder='Type your password' secureTextEntry value={form.password} onChangeText={(value) => setForm('password', value)} />
                <Gap height={24} />
                <Button text='Sign In' onPress={login} />
                <Gap height={12} />
                <Button text='Create New Account' color='#8D92A3' textColor='#FFFFFF' onPress={() => navigation.navigate('SignUp')} />
            </View>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingVertical: 26,
        marginTop: 24,
        flex: 1,
    },
})
