import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    Image,
} from 'react-native';
//impotr icon
import {
    Octicons,
    Feather,
    SimpleLineIcons,
    MaterialIcons,
} from '@expo/vector-icons';

const initialState = {
    title: '',
    location: '',
};

const CreatePostsScreen = ({ navigation }) => {
    const [state, setState] = useState(initialState);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);

    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [type, setType] = useState(CameraType.back);

    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let locationRes = await Location.getCurrentPositionAsync({});
            setLocation(locationRes);
        })();
    }, []);

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

    const submit = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        const posts = {
            title: state.title,
            place: state.location,
            photo,
            location,
        };

        navigation.navigate('DefaultScreen', { posts });
        // setState(initialState);
        // setPhoto(null);
    };

    const frontOrBack = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    };

    const takePicture = async () => {
        try {
            if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                console.log(uri);
                setPhoto(uri);

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                console.log('location', setLocation(location));
            }
        } catch (error) {
            console.log('Error taking picture:', error);
        }
    };

    const addFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const deletePhoto = () => {
        setPhoto(null);
        setState(initialState);
    };

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <View style={styles.postsHeader}>
                    <TouchableOpacity
                        style={styles.btnBack}
                        onPress={() => navigation.navigate('PostsScreen')}
                    >
                        <MaterialIcons
                            name="keyboard-backspace"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Створити публікацію</Text>
                </View>

                <View
                    style={{
                        ...styles.contentContainer,
                    }}
                >
                    {!isShowKeyboard && (
                        <View style={styles.viewContainer}>
                            {photo ? (
                                <View style={styles.photoContainer}>
                                    <Image
                                        style={styles.photo}
                                        source={{ uri: photo }}
                                    />
                                </View>
                            ) : (
                                <Camera
                                    style={styles.camera}
                                    type={type}
                                    ref={ref => setCameraRef(ref)}
                                    ratio="1:1"
                                >
                                    <View style={styles.photoView}>
                                        <TouchableOpacity
                                            style={styles.flipContainer}
                                            onPress={frontOrBack}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    color: 'white',
                                                }}
                                            >
                                                Flip
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={takePicture}
                                            disabled={photo}
                                        >
                                            <View style={styles.takePhotoOut}>
                                                <SimpleLineIcons
                                                    name="camera"
                                                    size={24}
                                                    color="white"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </Camera>
                            )}
                        </View>
                    )}

                    <Text style={styles.actionFoto} onPress={addFromGallery}>
                        Загрузити фото
                    </Text>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <View style={styles.inputArea}>
                            <TextInput
                                placeholder="Назва..."
                                style={styles.postTitle}
                                placeholderTextColor={'#BDBDBD'}
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
                                    placeholder={'Місцевість...'}
                                    style={styles.postLocation}
                                    placeholderTextColor={'#BDBDBD'}
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
                    </KeyboardAvoidingView>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.sendPostButton}
                        onPress={submit}
                    >
                        <Text style={styles.buttonText}>Опублікувати</Text>
                    </TouchableOpacity>
                    {!isShowKeyboard && (
                        <View style={styles.deleteBtnContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.deleteBtn}
                                onPress={deletePhoto}
                            >
                                <Feather
                                    name="trash-2"
                                    size={24}
                                    color="#BDBDBD"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    postsHeader: {
        flexDirection: 'row',
        height: 88,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',

        paddingBottom: 11,
    },
    headerTitle: {
        color: '#212121',
        fontSize: 17,
        fontFamily: 'Roboto-500',
    },
    btnBack: {
        marginLeft: 16,
        marginRight: 58,
    },
    contentContainer: { paddingHorizontal: 16 },
    viewContainer: {},
    camera: {
        height: 240,
        marginTop: 32,

        marginBottom: 8,
    },
    photoContainer: {
        marginTop: 32,
        marginBottom: 8,
        top: 0,
        left: 0,
    },

    photo: {
        height: 240,
    },
    photoView: {
        backgroundColor: 'transparent',
    },

    flipContainer: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
    },

    button: {
        marginTop: 60,
        alignSelf: 'center',
    },

    takePhotoOut: {
        borderWidth: 2,
        borderColor: 'white',
        height: 60,
        width: 60,

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'hsla(360, 100%, 100%, 0.3)',
    },

    actionFoto: {
        alignSelf: 'flex-start',
        fontFamily: 'Roboto-400',
        marginBottom: 32,
    },
    inputArea: {
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
        marginBottom: 50,
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
