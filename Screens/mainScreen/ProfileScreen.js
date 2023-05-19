import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
} from 'react-native';
import {
    Entypo,
    FontAwesome,
    SimpleLineIcons,
    AntDesign,
    EvilIcons,
    Ionicons,
} from '@expo/vector-icons';

const ProfileScreen = () => {
    return (
        <ImageBackground
            style={styles.background}
            source={require('../../assets/bg.jpg')}
        >
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={require('../../assets/fotoExmpl.png')}
                    />
                    <TouchableOpacity style={styles.deleteButton}>
                        <Ionicons
                            style={styles.deleteIcon}
                            name="close-circle-outline"
                            size={24}
                            color="#FF6C00"
                        />
                    </TouchableOpacity>
                </View>
                <Entypo
                    style={styles.signOutButton}
                    name="log-out"
                    size={24}
                    color="#BDBDBD"
                />
                <Text style={styles.userName}>Natali Romanova</Text>
                <View style={styles.postsContainer}>
                    <Image
                        style={styles.postPhoto}
                        source={require('../../assets/imageEx.jpg')}
                    />
                    <Text style={styles.postTitle}>Ліс</Text>

                    <View style={styles.postInformationContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    ...styles.postComments,
                                    marginRight: 25,
                                }}
                                activeOpacity={0.7}
                            >
                                <FontAwesome
                                    name="comment-o"
                                    size={24}
                                    color={'#FF6C00'}
                                />
                                <Text style={styles.numberComments}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.postLike}
                                activeOpacity={0.7}
                            >
                                <SimpleLineIcons
                                    name="like"
                                    size={24}
                                    color="#FF6C00"
                                />
                                <Text style={styles.numberLike}>123</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.postLocation}
                            activeOpacity={0.7}
                        >
                            <SimpleLineIcons
                                name="location-pin"
                                size={24}
                                color="#BDBDBD"
                            />
                            <Text style={styles.locationText}>Ukraine</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    container: {
        marginTop: 157,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    avatarContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 120,
        height: 120,
        top: -45,
        borderRadius: 16,
    },
    signOutButton: {
        position: 'absolute',
        top: 22,
        right: 16,
    },
    userName: {
        marginTop: 0,
        marginBottom: 33,
        textAlign: 'center',

        color: '#212121',
        fontSize: 30,
        lineHeight: 35,
        letterSpacing: 0.01,
        fontFamily: 'Roboto-700',
        fontWeight: '500',
    },
    postsContainer: {
        marginBottom: 32,
        marginHorizontal: 10,
    },
    postPhoto: {
        minWidth: '100%',
        minHeight: 240,
        borderRadius: 8,
        marginBottom: 8,
    },
    deleteButton: {
        flex: 1,
        position: 'absolute',
        top: 40,
        left: 108,
        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 20,
    },

    postTitle: {
        marginBottom: 11,

        color: '#212121',
        fontSize: 16,
        lineHeight: 19,
        fontFamily: 'Roboto-700',
        fontWeight: '400',
    },
    postInformationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postComments: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberComments: {
        marginLeft: 9,

        fontSize: 16,
        fontFamily: 'Roboto-400',
        fontWeight: '400',
    },

    postLike: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberLike: {
        marginLeft: 9,

        fontSize: 16,
        fontFamily: 'Roboto-400',
        fontWeight: '400',
    },
    postLocation: {
        flexDirection: 'row',
    },
    locationText: {
        marginLeft: 8,

        textDecorationLine: 'underline',
        color: '#212121',
        fontSize: 16,
        lineHeight: 19,
        fontFamily: 'Roboto-700',
        fontWeight: '400',
    },
});

export default ProfileScreen;
