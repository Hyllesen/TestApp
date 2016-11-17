import React, { Component } from 'react';
import Async from 'async';
import Buffer from 'buffer';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    }
  }

  render() {
    let errorCtrl = <View />;

    if(this.state.success === false) {
      errorCtrl = <Text style={styles.error}>
        Could not log in
      </Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./img/Octocat.png')} />
        <Text style={styles.welcome}>Github</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({username: text})}
           placeholder="username"
           autoCorrect={false}
           ></TextInput>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
          placeholder="password"></TextInput>
        <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicator style={styles.loader} size="large" animating={this.state.showProgress}
            />
      </View>
    );
  }

  async onLoginPressed() {
    this.setState({showProgress: true});

    var authService = require('./AuthService');
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results));
      console.log(results);
      console.log(results.success);
      if(results.success) {

        this.props.onLogin();
      }
    });
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    height: 60,
    width: 60
  },
  input: {
    borderColor: '#9dbaea',
    borderWidth: 1,
    height: 50,
    paddingLeft: 10,
    marginTop: 10
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#4f91f9',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 30
  }
});
