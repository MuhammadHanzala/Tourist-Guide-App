//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Modal, Dimensions, AsyncStorage, NetInfo, BackHandler, DatePickerAndroid, ScrollView } from 'react-native';
import { Container, Right, Button, Header, Form, Item, Input, Fab, Label, Icon, Left, Body, Content, List, ListItem, Thumbnail, } from 'native-base';
import { connect } from 'react-redux';
import fb from '../../firebase';
import getPlaceDetails from '../../services/getPlaceDetails'

function mapStateToProps(state) {
    return {
        placesData: state.main.data,
        userLocation: state.main
    }
}
function mapDispatchToProps(dispatch) {
    return {
        create: (details, doctorId, navigate) => dispatch(createEntry(details, doctorId, navigate)),
        getAllEntries: (doctorId) => dispatch(getAllEntries(doctorId))
    }
}

// create a component
class PlacesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    componentDidMount() {

    }
    render() {
        let places = this.props.placesData;
        let { navigate } = this.props.navigation;
        console.log(this.props);
        return (
            <Container>
                <Header style={{ backgroundColor: '#0b5f88' }}>
                    <StatusBar
                        backgroundColor="rgba(0,0,0,1)"
                    />
                    <Left>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('HomePage') }}>
                            <View style={{ width: 40, }}>
                                <Icon name="ios-arrow-back" style={{ color: '#fff', }} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, color: '#fff' }} >Places List</Text>
                    </Body>
                </Header>

                <Content style={styles.content} contentContainerStyle={{}}>
                    <List>
                        {
                            places.map((place, i) => {
                                return (
                                    <ListItem onPress={() => { getPlaceDetails(place.place_id ,(placeDetail) => navigate('PlaceDetails', placeDetail)) }} key={i} style={{ marginLeft: 10, marginRight: 10 }}>
                                        <Thumbnail square size={80} source={{ uri: place.icon }} />
                                        <Body style={{ marginLeft: 10, }}>
                                            <Text>{place.name}</Text>
                                            {/* <Text note>{place.date}</Text> */}
                                        </Body>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
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
        alignItems: 'center',
    },
    content: {
        margin: 0,


    },
    input: {
        marginBottom: 40
    }
});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(PlacesList);
