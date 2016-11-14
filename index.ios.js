import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './Login';

class TestApp extends Component {
  render() {
    return (
      <Login/>
    );
  }
}

AppRegistry.registerComponent('TestApp', () => TestApp);
