//import liraries
import React, { Component } from 'react';
import fb from '../../firebase';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Modal, Dimensions, AsyncStorage, NetInfo, BackHandler, DatePickerAndroid, ScrollView } from 'react-native';
import { Container, Right, Button, Header, Form, Item, Input, Fab, Label, Icon, Left, Body, Content, List, ListItem, Thumbnail, } from 'native-base';
import { currentLocation, places } from '../../store/actions/actions'
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import getNearByPlaces from '../../services/getPlaces'
import getLocation from '../../services/getLocation';


function mapDispatchToProps(dispatch) {
    return {
        currentLocation: (coords) => dispatch(currentLocation(coords)),
        places: (data) => dispatch(places(data)),
    }
}
function mapStateToProps(state) {
    return {
        userLocation: state.main.coords,
    }
}



// create a component
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            places: [],
            loading: true,
            error: null
        }
    }


    componentWillMount() {
        const { navigate } = this.props.navigation;
        fb.auth().onAuthStateChanged((user) => {
            if (!user) return navigate('Login');
        })
        getLocation((status, response) => {
            if (status) {
                console.log(response)
                let { latitude, longitude } = response;
                let region = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922 / 10,
                    longitudeDelta: 0.0421 / 10
                }
                this.onRegionChange(region, latitude, longitude);
                this.props.currentLocation({ latitude, longitude });
                AsyncStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }))
                getNearByPlaces(latitude, longitude, (status, response) => {
                    if (status) {
                        this.props.places(response);
                        this.setState({ places: response });
                    } else {
                        this.setState({
                            error: response
                        })
                        alert(response);
                        setTimeout(() => {
                            BackHandler.exitApp();
                        }, 2000)
                    }

                })
            } else {
                alert(response);
                this.setState({ error: response });
            }
        });

        NetInfo.getConnectionInfo().then(async (connectionInfo) => {
            if (connectionInfo.type === 'none') {
                await this.setState({
                    loading: false,
                    error: 'Please check your network connectivity'
                })
                alert('Please check your network connectivity');
                await setTimeout(() => {
                    BackHandler.exitApp();
                }, 2000)
            }
        });

        this.watchId = navigator.geolocation.watchPosition((position) => {
            let coordinates = position.coords;
            console.log(position);
            let { latitude, longitude } = coordinates;
            let region = {
                latitude,
                longitude,
                latitudeDelta: 0.0922 / 10,
                longitudeDelta: 0.0421 / 10
            };
            this.onRegionChange(region, latitude, longitude);
            this.props.currentLocation({ latitude, longitude });
            getNearByPlaces(latitude, longitude, (status, response) => {
                if (status) {
                    this.props.places(response);
                    this.setState({ places: response });
                } else {
                    this.setState({
                        error: response
                    })
                    alert(response);
                    setTimeout(() => {
                        BackHandler.exitApp();
                    }, 2000)
                }

            })
        }, async (error) => {
            alert('Please check your device Location OR GPS ', error.message);
            await this.setState({
                loading: false,
                error: 'Please check your device Location OR GPS'
            })
        }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onRegionChange = async (region, latitude, longitude) => {
        console.log(region);
        await this.setState({
            mapRegion: region,
            lastLat: latitude ? latitude : this.state.lastLat,
            lastLong: longitude ? longitude : this.state.lastLong,
            loading: false
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        console.log(this.state)
        const { mapRegion, lastLat, lastLong, places, loading, error } = this.state;


        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: '#0b5f88' }}>
                    <StatusBar
                        backgroundColor="rgba(0,0,0,1)"
                    />
                    <Left>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('DrawerOpen') }}>
                            <View style={{ width: 40, }}>
                                <Icon name="ios-menu" style={{ color: '#fff', }} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, color: '#fff' }} >Tourist Guider</Text>
                    </Body>
                </Header>

                <View style={{ flex: 1, }}>

                    {mapRegion === null || lastLat === null ?
                        !error ?
                            <View>
                                <Text style={{ fontSize: 20, textAlign: 'center' }}>Loading...</Text>
                            </View>
                            :
                            <View>
                                <Text style={{ fontSize: 20, textAlign: 'center' }}>{error}</Text>
                            </View>
                        :

                        <View style={{ ...StyleSheet.absoluteFillObject, }}>

                            <MapView
                                style={styles.map}
                                region={mapRegion}
                                showsMyLocationButton={true}
                                showsCompass={true}
                                provider={MapView.PROVIDER_GOOGLE}
                                followUserLocation={true}
                                mapType='satellite'
                                onRegionChange={(region) => this.onRegionChange(region)}>
                                <MapView.Marker
                                    title='Your Location'
                                    coordinate={{
                                        latitude: lastLat,
                                        longitude: lastLong,
                                    }}>

                                </MapView.Marker>
                                {places && places.length !== 0 ?
                                    places.map((place, i) => {
                                        return <MapView.Marker
                                            key={i}
                                            title={place.name}
                                            pinColor={'#efac65'}
                                            size={2}
                                            coordinate={{
                                                latitude: place.geometry.location.lat,
                                                longitude: place.geometry.location.lng,
                                            }}>
                                            {/* <View style={{ backgroundColor: '#efac65' }}>

                                                <Image
                                                    style={{ width: 15, height: 15, }}
                                                    source={{ uri: place.icon }}
                                                />
                                            </View> */}
                                        </MapView.Marker>
                                    }) : null}
                            </MapView>
                            {
                                places && places.length !== 0 ?
                                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('PlacesList')}>
                                        <View style={styles.buttonInner}>
                                            <Text style={styles.buttonText}>
                                                Details
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                            }
                        </View>
                    }
                </View>
            </Container>
        );
    }
}

// define your styles
const screen = Dimensions.get('window');
const mapHeight = screen.height;
const styles = StyleSheet.create({
    button: {
        padding: 2,
        position: 'absolute',
        top: mapHeight - 180,
        left: (screen.width / 2.5),
        borderRadius: 20,
        borderColor: 'transparent',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: 90,
        height: 45,
    },
    buttonInner: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    map: {
        height: mapHeight,
    },
});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
