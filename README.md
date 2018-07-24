# get-openid-configuration

This module makes an [OpenID Provider Configuration Request](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationRequest)
to your OpenId provider and parses the response to an object.

## Usage Example

```javascript
const loadConfig = require('get-openid-configuration');

loadConfig('https://accounts.google.com').then(config => {
   console.log('Your OpenID authorization_endpoint: ' + config.authorization_endpoint);
   console.log('Your OpenID token_endpoint: ' + config.token_endpoint);
   console.log('Your OpenID userinfo_endpoint: ' + config.userinfo_endpoint);
}).catch((err) => {
    console.error('Could not load configuration. Error was: ' + err);
});
```

```javascript
const loadConfig = require('get-openid-configuration');

(async () => {
    try {
        const config = await loadConfig('https://login.yahoo.com');
        console.log('Your Yahoo OpenID authorization_endpoint: ' + config.authorization_endpoint);
        console.log('Your Yahoo OpenID token_endpoint: ' + config.token_endpoint);
        console.log('Your Yahoo OpenID userinfo_endpoint: ' + config.userinfo_endpoint);
    } catch (err) {
        console.error('Could not load OpenID configuration. Error was: ' + err);
    }
})();
```
