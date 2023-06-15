import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';

import {
    Image,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { authLogout } from '../../redux/auth/authOperations';
import { useDispatch, useSelector } from 'react-redux';

const userFotoExmpl = require('../../assets/noAvatar.png');

const logOutIcon = require('../../assets/log-out.png');

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

const DefaultScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const { email, name, avatar } = useSelector(state => state.auth);
    console.log(avatar);

    const getAllPosts = async () => {
        onSnapshot(collection(db, 'posts'), data => {
            setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    const singOut = () => {
        dispatch(authLogout());
    };

    return (
        <View style={styles.postsContainer}>
            <View style={styles.postsHeader}>
                <Text style={styles.headerTitle}>Публікації</Text>
                <TouchableOpacity style={styles.logOutIcon} onPress={singOut}>
                    <Image source={logOutIcon} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.postsHero}
                onPress={() => navigation.navigate('ProfileScreen')}
            >
                <Image
                    style={styles.userFoto}
                    source={avatar ? avatar : userFotoExmpl}
                />
                <View>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={posts}
                    keyExtractor={(item, indx) => indx.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <Image
                                source={{ uri: item.photo }}
                                style={styles.image}
                            />
                            <Text style={styles.titlePost}>{item.title}</Text>
                            <View style={styles.contentContainer}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.commentsBtn}
                                    onPress={() =>
                                        navigation.navigate('CommentsScreen', {
                                            postId: item.id,
                                            photo: item.photo,
                                        })
                                    }
                                >
                                    <FontAwesome
                                        name="comment-o"
                                        size={24}
                                        color={'#BDBDBD'}
                                    />
                                    <Text style={styles.numberComments}>8</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.postLocation}
                                    activeOpacity={0.7}
                                    onPress={() =>
                                        navigation.navigate('MapScreen', {
                                            location: item.location,
                                        })
                                    }
                                >
                                    <SimpleLineIcons
                                        name="location-pin"
                                        size={24}
                                        color="#BDBDBD"
                                    />
                                    <Text style={styles.locationText}>
                                        {item.place}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postsContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    postsHeader: {
        height: 88,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 11,
    },
    headerTitle: {
        color: '#212121',
        fontSize: 17,
        fontFamily: 'Roboto-500',
    },

    logOutIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 10,
        bottom: 14,
    },
    postsHero: {
        height: 124,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 16,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
    userFoto: {
        height: 60,
        width: 60,
        borderRadius: 16,
        marginRight: 8,
    },
    userName: {
        fontFamily: 'Roboto-700',
        fontWeight: '700',
        fontSize: 13,
        lineHeight: 15,
        color: '#212121',
    },
    userEmail: {
        fontFamily: 'Roboto-400',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 13,
        color: 'rgba(33, 33, 33, 0.8)',
    },
    flatListContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    container: {
        marginBottom: 32,
    },
    image: {
        height: 240,
    },
    titlePost: { fontFamily: 'Roboto-500', fontWeight: '500', fontSize: 16 },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentsBtn: {
        flexDirection: 'row',
        marginRight: 49,
        alignItems: 'center',
    },
    numberComments: {
        marginLeft: 6,

        fontFamily: 'Roboto-400',
        fontWeight: '400',
        fontSize: 16,
        color: '#BDBDBD',
    },
    locationText: {
        textDecorationLine: 'underline',
        marginLeft: 4,
    },
    postLocation: {
        flexDirection: 'row',
    },
});

export default DefaultScreen;
