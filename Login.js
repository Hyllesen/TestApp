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

    if(this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        That username and password combination did not work
      </Text>
    }

    if(this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>We experienced an unknown error</Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./img/Octocat.png')} />
        <Text style={styles.welcome}>Github</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({username: text})}
           placeholder="username"
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
    console.log(`Atttempting to login with username ${this.state.username} and password ${this.state.password}`);
    this.setState({showProgress: true});
    try {
      let b = new Buffer.Buffer(this.state.username + ":" + this.state.password);
      let encodedAuth = b.toString('base64');
      let response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization' : 'Basic ' + encodedAuth
        }
      });
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({showProgress: false});
      return responseJson.movies;
    } catch(error) {
      console.error(error);
    }
    // fetch('https://api.github.com/user',{
    //   headers: {
    //     'Authorization' : 'Basic ' + encodedAuth
    //   }
    // })
    // .then(() => {
    //   if(response.status >= 200 && response.status < 300) {
    //     return response;
    //   }
    //
    //   throw {
    //     badCredentials: response.status == 401,
    //     unknownError: response.status != 401
    //   }
    // })
    // .then((response) => {
    //   return response.json();
    // }).then((results) => {
    //   this.setState({showProgress: false});
    //   console.log(results);
    // }).catch((err) => {
    //   console.log('logon failed: ' + err);
    //   this.setState(err);
    // }).finally(() => {
    //   this.setState({showProgress: false});
    // });
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
