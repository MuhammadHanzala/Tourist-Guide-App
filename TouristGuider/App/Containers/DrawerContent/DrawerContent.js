//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, LogoHeader } from 'react-native';
import { signout, isLoggedIn } from '../../store/middlewares/AuthMiddleware';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';


function mapDispatchToProps(dispatch) {
    return {
        signout: (navigate) => dispatch(signout(navigate)),

    }
}
function mapStateToProps(state) {
    return {
    }
}
var navitems = [
    {
        name: 'Home',
        nav: 'HomePage',
    },
]

class DrawerContent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let icons = ['dashboard'];
        return (
            <View style={{ borderWidth: 0, flex: 1, backgroundColor: '#fff', marginTop: -20, paddingTop: 20 }}>
                <View style={{ width: '100%', height: 150, backgroundColor: '#0b5f88', }}>
                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                        <Image source={require('../logo.png')} style={{ width: 60, height: 60, marginTop: 45, marginLeft: 30 }} />
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginTop: 60, marginLeft: 20 }}>Tourist Guide</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    {
                        navitems.map((l, i) => {
                            return (
                                <TouchableOpacity
                                    key={i} style={{ marginBottom: 0.5 }}
                                    onPress={() => { this.props.navigation.navigate(l.nav); this.style = { backgroundColor: '#000' } }}
                                >

                                    <View style={{ flexDirection: 'row', height: 50, paddingLeft: 15, }}>
                                        <Icon name={icons[i]} style={{ color: '#000', fontSize: 20, marginRight: 30 }} />
                                        <Text style={{ fontSize: 16, color: '#000' }}>{l.name}</Text>
                                    </View>
                                </TouchableOpacity>)
                        })
                    }
                    <TouchableOpacity
                        style={{ marginBottom: 0.5 }}
                        onPress={() => { this.props.signout(() => { this.props.navigation.navigate('Login') }) }}
                    >
                        <View style={{ flexDirection: 'row', height: 50, paddingLeft: 15, }}>
                            <MIcon name="logout" style={{ color: '#000', fontSize: 20, marginRight: 30 }} />
                            <Text style={{ fontSize: 16, color: '#000' }}>Signout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
