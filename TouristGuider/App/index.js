import React, { Component } from 'react';
import {
  HomePage,
  SignUp,
  Login,
  DrawerContent,
  PlaceDirection,
  PlacesList,
  PlaceDetails
} from './Containers';
import { View, BackHandler } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import fb from './firebase';


const drawer = DrawerNavigator({
  HomePage: {
    screen: HomePage,
  },
  PlacesList: {
    screen: PlacesList,
  },
  PlaceDetails: {
    screen: PlaceDetails,
  },
  PlaceDirection: {
    screen: PlaceDirection,
  },
},
  {
    headerMode: 'none',
    contentComponent: ({ navigation }) => <DrawerContent navigation={navigation} />,
    contentOptions: {
      activeBackgroundColor: '#a2a0a0'
    }
  }
)


const App = StackNavigator({
  Drawer: {
    screen: drawer,
    navigationOptions: {
      header: null
    }
  },
  SignUp: { screen: SignUp },
  Login: { screen: Login },
},

  {
    headerMode: 'none',
    navigationOptions: {
      cardStack: {
        gesturesEnabled: false
      }
    }
  }
)



class RNApp extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }
  render() {
   
    return (
      <Provider store={store} >
        <App />
      </Provider>
    );
  }
}

export default RNApp;
