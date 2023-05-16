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

const initialState = {
    login: '',
    email: '',
    password: '',
};

export default function RegistrationScreen() {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [hidePassword, setHidePassword] = useState(true);

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

    const submit = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        console.log(state);
        setState(initialState);
    };

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground
                    style={styles.image}
                    source={require('../assets/bg.jpg')}
                >
                    <View style={styles.inner}>
                        <View style={styles.avatarContainer}>
                            <Image style={styles.avatar} />
                            <TouchableOpacity style={styles.addBtn}>
                                <Image source={require('../assets/add.png')} />
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
        fontFamily: 'Roboto',
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
        fontFamily: 'Roboto',
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
    },
    inner: {
        position: 'relative',
        backgroundColor: '#fff',
        // paddingTop: 0,
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
        top: 90,
    },
});
