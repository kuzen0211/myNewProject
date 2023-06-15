import React, { useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const initialState = {
    login: '',
    email: '',
    password: '',
};

export default function RegistrationScreen({ navigation }) {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [hidePassword, setHidePassword] = useState(true);
    const [avatar, setAvatar] = useState();

    const dispatch = useDispatch();

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

    const submit = async () => {
        const avatar = await uploadAvatarToServer();
        dispatch(register({ ...state, avatar }));
        setFormData(initialState);
    };

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    const uploadAvatarToServer = async () => {
        const response = await fetch(avatar);
        console.log(avatar);
        const file = await response.blob();
        const avatarId = new Date().toString();
        const storageRef = ref(storage, `avatar/${avatarId}`);
        await uploadBytes(storageRef, file);
        const avatarUrl = await getDownloadURL(
            ref(storage, `avatar/${avatarId}`)
        );
        return avatarUrl;
    };

    const uploadAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground
                    style={styles.image}
                    source={require('../../assets/bg.jpg')}
                >
                    <View style={styles.inner}>
                        <View style={styles.avatarContainer}>
                            <ImageBackground style={styles.avatar}>
                                {avatar && (
                                    <Image
                                        style={styles.avatar}
                                        source={{ uri: avatar }}
                                    />
                                )}
                            </ImageBackground>

                            <TouchableOpacity
                                style={styles.addBtn}
                                onPress={uploadAvatar}
                            >
                                <Image
                                    source={require('../../assets/add.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Реєстрація</Text>
                        <KeyboardAvoidingView
                            behavior={
                                Platform.OS === 'ios' ? 'padding' : 'height'
                            }
                        >
                            <View
                                style={{
                                    ...styles.form,
                                    marginBottom: isShowKeyboard ? -120 : 78,
                                }}
                            >
                                <TextInput
                                    style={styles.input}
                                    placeholder="Логін"
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={state.login}
                                    onChangeText={value =>
                                        setState(prevState => ({
                                            ...prevState,
                                            login: value,
                                        }))
                                    }
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Адрес електронної пошти"
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={state.email}
                                    onChangeText={value =>
                                        setState(prevState => ({
                                            ...prevState,
                                            email: value,
                                        }))
                                    }
                                />
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Пароль"
                                        secureTextEntry={hidePassword}
                                        onFocus={() => setIsShowKeyboard(true)}
                                        value={state.password}
                                        onChangeText={value =>
                                            setState(prevState => ({
                                                ...prevState,
                                                password: value,
                                            }))
                                        }
                                    />
                                    <TouchableOpacity
                                        onPress={toggleHidePassword}
                                        style={styles.inputBtn}
                                        disabled={!state.password}
                                    >
                                        <Text style={styles.textBtnShow}>
                                            {hidePassword
                                                ? 'Показати'
                                                : 'Заховати'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    style={styles.btn}
                                    activeOpacity={0.7}
                                    onPress={submit}
                                >
                                    <Text style={styles.btnTitle}>
                                        Зареєструватися
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btnReg}
                                    activeOpacity={0.7}
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    <Text style={styles.btnTitleReg}>
                                        Уже є акаунт? Увійти
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        height: 50,
        marginHorizontal: 16,
        color: '#212121',
        fontFamily: 'Roboto-400',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'left',
        padding: 16,
        backgroundColor: '#F6F6F6',
        marginBottom: 16,
    },
    title: {
        marginTop: -30,
        marginBottom: 33,
        fontFamily: 'Roboto-500',
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
    },
    inner: {
        position: 'relative',
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    avatarContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        top: -60,
        flexDirection: 'row',
    },

    avatar: {
        backgroundColor: '#F6F6F6',
        width: 120,
        height: 120,
        borderRadius: 16,
        resizeMode: 'cover',
        overflow: 'hidden',
    },

    btn: {
        backgroundColor: '#FF6C00',
        marginTop: 27,
        height: 51,
        borderRadius: 100,
        marginLeft: 16,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Roboto-400',
    },
    form: {
        paddingTop: 0,
    },
    btnReg: {
        backgroundColor: 'transparent',
        height: 51,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTitleReg: {
        color: '#1B4371',
        fontSize: 16,
        fontFamily: 'Roboto-400',
    },
    inputContainer: {
        position: 'relative',
    },
    inputBtn: {
        position: 'absolute',
        top: 16,
        right: 32,
    },
    textBtnShow: {
        color: '#1B4371',
        fontSize: 16,
    },
    addBtn: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: 47 }, { translateY: 26 }],
    },
});
