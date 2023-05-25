import { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const CommentsScreen = ({ route }) => {
    const [comment, setComment] = useState('');
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

    const handleKeyboadHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };
    return (
        <TouchableWithoutFeedback onPress={handleKeyboadHide}>
            <View style={styles.container}>
                <Image
                    source={{ uri: route.params.photo }}
                    style={styles.photo}
                />

                <View style={{ marginBottom: 10 }}>
                    <TextInput
                        style={styles.input}
                        value={comment}
                        placeholder={'Коментар...'}
                        placeholderTextColor={'#BDBDBD'}
                        onFocus={() => setIsShowKeyboard(true)}
                        onChangeText={value => setComment(value)}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.commentButton}
                    >
                        <Feather name="arrow-up" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 32,
    },
    photo: {
        height: 240,
        borderRadius: 8,
        marginBottom: 32,
    },
    input: {
        backgroundColor: '#F6F6F6',
        color: '#212121',
        borderColor: '#E8E8E8',
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        fontSize: 16,
        lineHeight: 19,
        paddingLeft: 16,
        paddingRight: 50,
    },
    commentButton: {
        backgroundColor: '#FF6C00',
        position: 'absolute',
        top: 8,
        right: 8,
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
});

export default CommentsScreen;
