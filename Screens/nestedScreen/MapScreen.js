import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
    console.log('route---------------->', route);
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: route.params.location.coords.latitude,
                    longitude: route.params.location.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: route.params.location.coords.latitude,
                        longitude: route.params.location.coords.longitude,
                    }}
                    title={route.params.title}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
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
    map: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default MapScreen;
