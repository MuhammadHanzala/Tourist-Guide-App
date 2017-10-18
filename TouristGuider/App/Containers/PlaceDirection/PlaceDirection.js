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
import EIcon from 'react-native-vector-icons/Entypo';


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
class PlaceDirection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let origin = this.props.navigation.state.params.origin;
        let coords = this.props.navigation.state.params.coords;

        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: '#0b5f88' }}>
                    <StatusBar
                        backgroundColor="rgba(0,0,0,1)"
                    />
                    <Left>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                            <View style={{ width: 40, }}>
                            <EIcon name="chevron-thin-left" style={{ color: '#fff', fontSize: 20 }} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, color: '#fff' }} >Place Direction</Text>
                    </Body>
                </Header>

                <View style={{ flex: 1, }}>


                    <MapView
                        style={styles.map}
                        mapType='satellite'
                        initialRegion={{
                            latitude: origin.latitude,
                            longitude: origin.longitude,
                            latitudeDelta: 0.0922 / 10,
                            longitudeDelta: 0.0421 / 10
                        }}>
                        <MapView.Marker
                            title='Your Location'
                            coordinate={{
                                latitude: origin.latitude,
                                longitude: origin.longitude,
                            }}>
                        </MapView.Marker>

                        <MapView.Polyline
                            coordinates={coords}
                            strokeWidth={2}
                            strokeColor="red" />

                        <MapView.Marker
                            title='Destination'
                            coordinate={{
                                latitude: coords[coords.length - 1].latitude,
                                longitude: coords[coords.length - 1].longitude,
                            }}>
                        </MapView.Marker>

                    </MapView>


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
        top: mapHeight - 70,
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
export default connect(mapStateToProps, mapDispatchToProps)(PlaceDirection);
