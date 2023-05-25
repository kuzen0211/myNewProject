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
} from 'react-native';

const initialState = {
    email: '',
    password: '',
};

export default function LoginScreen({ navigation }) {
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
                    source={require('../../assets/bg.jpg')}
                >
                    <View style={styles.inner}>
                        <Text style={styles.title}>Увійти</Text>
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
                                    <Text style={styles.btnTitle}>Увійти</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btnReg}
                                    activeOpacity={0.7}
                                    onPress={() =>
                                        navigation.navigate('Register')
                                    }
                                >
                                    <Text style={styles.btnTitleReg}>
                                        Немає акаунту? Зареєструватися
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
        marginBottom: 33,
        marginTop: 33,
        fontFamily: 'Roboto-500',
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
    },
    inner: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    btn: {
        backgroundColor: '#FF6C00',
        marginTop: 27,
        height: 51,
        marginBottom: 16,
        borderRadius: 100,
        marginLeft: 16,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTitle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'Roboto-400',
    },
    form: {
        paddingTop: 5,
    },
    btnReg: {
        backgroundColor: 'transparent',
        height: 51,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTitleReg: {
        color: 'black',
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
});
