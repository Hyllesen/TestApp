import Buffer from 'buffer';
// import AsyncStorage from 'react-native';

var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

const authKey = 'auth';
const userKey = 'user';

export default class AuthService {
  getAuthInfo(cb) {
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      if(err) {
        return cb(err);
      }

      if(!val) {
        return cb();
      }

      var zippedObj = _.zipObject(val);

      if(!zippedObj [authKey]) {
        return cb();
      }

      var authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: JSON.parse(zippedObj[userKey])
      }
      return cb(null, authInfo);
    });
  }

  async login(creds, callback) {
    try {
      let b = new Buffer.Buffer(creds.username + ":" + creds.password);
      let encodedAuth = b.toString('base64');
      let response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization' : 'Basic ' + encodedAuth
        }
      });
      let responseJson = await response.json();
      if (response.status == 200) {
        AsyncStorage.multiSet([
          [authKey, encodedAuth],
        [userKey, JSON.stringify(responseJson)]
      ], (err) => {
        if(err) {
          throw err;
        }
      })
        responseJson.success = true;
      } else {
        responseJson.success = false;
      }
      callback(responseJson);
    } catch(error) {
      console.error(error);
    }
  }
}

module.exports = new AuthService();
