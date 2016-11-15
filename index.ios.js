import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './Login';

class TestApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    if(this.state.isLoggedIn) {
      return (
        <View>
          <Text>Logged in!</Text>
        </View>
      )
    } else {
      return (
        <Login onLogin={this.onLogin}/>
      );
    }
  }
  onLogin() {
    this.setState({isLoggedIn: true});
    console.log(' logged in! showdifferent view');
  }
}

AppRegistry.registerComponent('TestApp', () => TestApp);
