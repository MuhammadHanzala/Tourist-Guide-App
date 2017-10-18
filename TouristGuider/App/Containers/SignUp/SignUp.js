//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { signUp } from '../../store/middlewares/AuthMiddleware';
import { Container, Header, Content, Form, Item, Input, Label, Icon } from 'native-base';

function mapDispatchToProps(dispatch) {
    return {
        signUp: (email, password, callback, navigate) => dispatch(signUp(email, password, callback, navigate))
    }
}
function mapStateToProps(state) {
    return {

    }
}
// create a component
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }
    static navigationOptions = {
        header: null
    };
    componentDidmount() {

    }
    signup = (e) => {
        e.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        this.props.signUp(email, password,
            (error) => { this.setState({ error: error }) },
            () => {
                const { navigate } = this.props.navigation;
                navigate('HomePage');
            });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View >
                    <Image source={require('../logo.png')} style={{ width: 70, height: 70, marginBottom: 30 }} />
                </View>

                <Text style={{ fontSize: 25 }}>SignUp</Text>

                <Item style={styles.input}>
                    <Icon name="person" style={{ color: '#fff' }} />
                    <Input placeholder="Username" style={{color: '#fff'}} />
                </Item>
                <Item style={styles.input}>
                    <Icon name="ios-mail" style={{ color: '#fff' }} />
                    <Input placeholder="Facebook Email"  style={{color: '#fff'}} onChangeText={(text) => { this.setState({ email: text }) }} />
                </Item>
                <Item last style={styles.input}>
                    <Icon name="ios-unlock" style={{ color: '#fff' }} />
                    <Input placeholder="Facebook Password"  style={{color: '#fff'}} secureTextEntry onChangeText={(text) => { this.setState({ password: text }) }} />
                </Item>

                <View style={styles.button}>
                    <Button title="SignUp" onPress={this.signup} />
                </View>

                <Text style={{ color: 'white' }}>
                    {this.state.error}
                </Text>

                <View style={{ flexDirection: 'row' }}>
                    <Text>
                        Have an Account ?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => { navigate('Login') }}>
                        <Text>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b5f88'
    },
    input: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    button: {
        width: 100,
        marginBottom: 20
    },

});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
