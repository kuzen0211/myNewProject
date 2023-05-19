import React, { useState } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

const userFotoExmpl = require('../../assets/fotoExmpl.png');

const logOutIcon = require('../../assets/log-out.png');

const PostsScreen = () => {
    return (
        <View style={styles.postsContainer}>
            <View style={styles.postsHeader}>
                <Text style={styles.headerTitle}>Публікації</Text>
                <Image source={logOutIcon} style={styles.logOutIcon} />
            </View>
            <View style={styles.postsHero}>
                <Image style={styles.userFoto} source={userFotoExmpl} />
                <View>
                    <Text style={styles.userName}>Natali Romanova</Text>
                    <Text style={styles.userEmail}>email@example.com</Text>
                </View>
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
});

export default PostsScreen;
