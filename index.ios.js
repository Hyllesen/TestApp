import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import Login from './Login';
import AppContainer from './AppContainer';

var AuthService = require('./AuthService');

class TestApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    };
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  render() {
    if(this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true}
          size="large"/>
        </View>
      );
    }

    if(this.state.isLoggedIn) {
      return (
        <AppContainer/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 30
  },
  loader: {
  },
});

AppRegistry.registerComponent('TestApp', () => TestApp);
