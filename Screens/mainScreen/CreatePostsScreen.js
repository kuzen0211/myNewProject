import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
//impotr icon
import { Octicons, Feather } from '@expo/vector-icons';

const iconUpload = require('../../assets/uploadFoto.png');
const initialState = {
    title: '',
    location: '',
};

const CreatePostsScreen = () => {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);

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
    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Створити публікацію</Text>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View
                        style={{
                            ...styles.test,
                            marginTop: isShowKeyboard ? -210 : 0,
                        }}
                    >
                        <View style={styles.contentContainer}>
                            <View style={styles.imageContainer}>
                                <View style={styles.imageBg}></View>
                                <Image
                                    source={iconUpload}
                                    style={styles.iconUpload}
                                />
                                <Text style={styles.actionFoto}>
                                    Загрузити фото
                                </Text>
                            </View>
                        </View>

                        <View style={styles.inputArea}>
                            <TextInput
                                placeholder="Назва..."
                                style={styles.postTitle}
                                onFocus={() => setIsShowKeyboard(true)}
                                value={state.title}
                                onChangeText={value =>
                                    setState(prevState => ({
                                        ...prevState,
                                        title: value,
                                    }))
                                }
                            />
                            <View style={styles.containerInputLocation}>
                                <Octicons
                                    style={styles.locationIcon}
                                    name="location"
                                    size={24}
                                    color="#BDBDBD"
                                />
                                <TextInput
                                    placeholder={` Місцевість...`}
                                    style={styles.postLocation}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={state.location}
                                    onChangeText={value =>
                                        setState(prevState => ({
                                            ...prevState,
                                            location: value,
                                        }))
                                    }
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.sendPostButton}
                            onPress={submit}
                        >
                            <Text style={styles.buttonText}>Опублікувати</Text>
                        </TouchableOpacity>
                        <View style={styles.deleteBtnContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.deleteBtn}
                            >
                                <Feather
                                    name="trash-2"
                                    size={24}
                                    color="#BDBDBD"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#FFFFFF',
        paddingLeft: 16,
        paddingRight: 16,
    },
    header: {
        paddingBottom: 11,

        height: 88,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#212121',
        fontSize: 17,
        fontFamily: 'Roboto-500',
    },

    contentContainer: {
        // flex: 1,
        // flexDirection: 'column',
    },
    imageContainer: {
        position: 'relative',
        marginTop: 32,
        marginBottom: 48,
        alignItems: 'center',
    },
    iconUpload: {
        position: 'absolute',
        top: 120 - 30,
        zIndex: 999,
    },
    imageBg: {
        width: '100%',
        height: 240,
        backgroundColor: '#F6F6F6',
        borderColor: '#E8E8E8',
        borderRadius: 8,
        marginBottom: 8,
    },
    actionFoto: {
        alignSelf: 'flex-start',
        fontFamily: 'Roboto-400',
    },
    test: {},
    inputArea: {
        // alignItems: 'center',
        justifyContent: 'flex-start',
    },
    postTitle: {
        paddingBottom: 15,
        paddingTop: 16,
        marginBottom: 16,

        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
        fontSize: 16,
        height: 50,
        fontFamily: 'Roboto-400',
    },
    postLocation: {
        paddingBottom: 15,
        paddingTop: 16,
        flex: 1,
        height: 50,
        fontSize: 16,
        fontFamily: 'Roboto-400',
    },
    containerInputLocation: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        marginBottomL: 32,
    },
    locationIcon: {
        marginRight: 8,
    },
    sendPostButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginHorizontal: 16,
        marginTop: 32,
        borderRadius: 50,
        backgroundColor: '#FF6C00',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 20,
        lineHeight: 19,
        color: '#FFFFFF',
        fontFamily: 'Roboto-400',
    },
    deleteBtnContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        paddingBottom: 15,
    },
    deleteBtn: {
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default CreatePostsScreen;
