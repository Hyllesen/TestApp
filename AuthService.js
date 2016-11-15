import Buffer from 'buffer';

export class AuthService {
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
