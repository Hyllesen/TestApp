import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './Login';
import AppContainer from './AppContainer';


class TestApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.onLogin = this.onLogin.bind(this);
  }

  render() {
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
  }
});

AppRegistry.registerComponent('TestApp', () => TestApp);
