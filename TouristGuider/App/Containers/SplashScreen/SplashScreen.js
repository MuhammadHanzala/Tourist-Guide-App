//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class SplashScreen extends Component {
    static navigationOptions = {
        
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>SplashScreen</Text>
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
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SplashScreen;
