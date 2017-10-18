//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Button, TextInput, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native';
import { Container, Header, Right, Left, Body, Content, Item, Input, Label } from 'native-base';
import { connect } from 'react-redux';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import fb from '../../firebase';
import apiKey from '../../services/api';
import getPlaceDirection from '../../services/getPlaceDirection';


function mapStateToProps(state) {
    return {
        userLocation: state.main
    }
}
function mapDispatchToProps(dispatch) {
    return {
        update: (newDetails, doctorId, callback) => dispatch(updateEntry(newDetails, doctorId, callback)),
        delete: (entry, doctorId, callback) => dispatch(deleteEntry(entry, doctorId, callback))

    }
}

// create a component
class PlaceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // modalVisible: false
        }
    }

    async componentDidMount() {
        await AsyncStorage.getItem('userLocation', (err, result) => {
            console.log(err, result);
            let coords = JSON.parse(result);
            let { latitude, longitude } = coords;
            if (result) {
                this.setState({ latitude, longitude });
            }
        })
    }

    render() {
        let { navigate } = this.props.navigation;
        console.log(this.props);
        let place = this.props.navigation.state.params;
        let { latitude, longitude } = this.state;
        let { lat, lng } = place.geometry.location;
        return (
            <Container>
                <Header style={{ backgroundColor: '#0b5f88' }}>
                    <StatusBar
                        backgroundColor="rgba(0,0,0,1)"
                    />
                    <Left>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('PlacesList') }}>
                            <View style={{ width: 40, }}>
                                <EIcon name="chevron-thin-left" style={{ color: '#fff', fontSize: 20 }} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, color: '#fff' }} >Place Details</Text>
                    </Body>
                </Header>

                <Content style={styles.container}>

                    <ScrollView horizontal={true}>
                        {place.photos && place.photos.length !== 0 ?
                            place.photos.map((photo, i) => {
                                console.log('rendering Image')
                                return (
                                    <Image
                                        style={{ width: 200, height: 200, }}
                                        key={i}
                                        source={{
                                            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`
                                        }}
                                    />
                                )

                            })
                            : null
                        }
                    </ScrollView>
                    <View style={{ flex: 1, marginBottom: 10 }}>

                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ fontSize: 15 }}>Name: </Text>
                                <Text style={{ fontSize: 18 }}>{place.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ fontSize: 18 }}>Rating: </Text>
                                <Text style={{ fontSize: 20 }}>{place.rating}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ fontSize: 15 }}>Address: </Text>
                                <Text style={{ fontSize: 12 }}>{place.vicinity}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={{ fontSize: 18 }}>Type: </Text>
                                <Text style={{ fontSize: 20 }}>{place.types[0]}</Text>
                            </View>
                        </View>
                        <View style={styles.button}>
                            <Button title="Get Directions" onPress={() => getPlaceDirection({ latitude, longitude }, { latitude: lat, longitude: lng }, (direction) => navigate('PlaceDirection', direction))} />
                        </View>
                    </View>

                </Content>
            </Container >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {


    },
    input: {
        marginBottom: 40
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },

    modal3: {
        height: 300,
        width: 300
    },
    button: {
        width: 100,
    }
});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
