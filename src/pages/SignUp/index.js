import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Button, Gap, Header, TextInput } from '../../components'
import { useDispatch } from 'react-redux'
import { useForm, storeData, showError } from '../../utils'
import { Fire } from '../../config'
import { launchImageLibrary } from 'react-native-image-picker'

const SignUp = ({ navigation }) => {
    const [form, setForm] = useForm({
        fullName: '',
        address: '',
        email: '',
        password: '',
    })
    const [photo, setPhoto] = useState('')
    const [photoForDB, setPhotoForDB] = useState('')

    const dispatch = useDispatch()

    const addPhoto = () => {
        launchImageLibrary({
            quality: 0.5,
            maxWidth: 200,
            maxHeight: 200,
            includeBase64: true,
        },
        (response) => {
            if (response.didCancel || response.error) {
                showError('Anda tidak memilih photo')
            } else {
                console.log(response)
                setPhotoForDB(`data:${response.type};base64, ${response.base64}`)
                const source = { uri: response.uri }
                setPhoto(source)
            }
        })
    }

    const onContinue = () => {
        dispatch({ type: 'SET_LOADING', value: true })
        Fire.auth()
          .createUserWithEmailAndPassword(form.email, form.password)
          .then((success) => {
            dispatch({ type: 'SET_LOADING', value: false })
            setForm('reset')
            const data = {
              fullName: form.fullName,
              address: form.address,
              email: form.email,
              photo: photoForDB,
              uid: success.user.uid,
            }
            Fire.database().ref(`users/${success.user.uid}/`).set(data)
            storeData('user', data)
            navigation.replace('SuccessSignUp')
          })
          .catch((error) => {
            dispatch({ type: 'SET_LOADING', value: false })
            showError(error.message)
          })
      }

    return (
        <View style={styles.page}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <Header title="Sign Up" subTitle="Register and eat" onBack={() => navigation.goBack()} />
                <View style={styles.container}>
                    <TouchableOpacity activeOpacity={0.7} onPress={addPhoto}>
                        <View style={styles.photo}>
                            <View style={styles.borderPhoto}>
                                {photo ? (
                                    <Image source={photo} style={styles.photoContainer} />
                                ) : (
                                    <View style={styles.photoContainer}>
                                        <Text style={styles.addPhoto}>Add Photo</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TextInput label='Full Name' placeholder='Type your full name' value={form.fullName} onChangeText={(value) => setForm('fullName', value)} />
                    <Gap height={16} />
                    <TextInput label='Email Address' placeholder='Type your email address' value={form.email} onChangeText={(value) => setForm('email', value)} />
                    <Gap height={16} />
                    <TextInput label='Address' placeholder='Type your address' value={form.address} onChangeText={(value) => setForm('address', value)} />
                    <Gap height={16} />
                    <TextInput label='Password' placeholder='Type your password' value={form.password} onChangeText={(value) => setForm('password', value)} secureTextEntry />
                    <Gap height={24} />
                    <Button text='Continue' onPress={onContinue} />
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp

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
    photo: {
        alignItems: 'center',
        marginTop: 26,
        marginBottom: 16
    },
    borderPhoto: {
        borderWidth: 1,
        borderColor: '#8D92A3',
        width: 110,
        height: 110,
        borderRadius: 110,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoContainer: {
        width: 90,
        height: 90,
        borderRadius: 90,
        backgroundColor: '#F0F0F0',
        padding: 24,
    },
    addPhoto: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#8D92A3',
        textAlign: 'center'
    },
})
