# get-openid-configuration

This module makes an [OpenID Provider Configuration Request](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationRequest)
to your OpenId provider and parses the response to an object. This may be useful for OAuth2 / OpenId Connect
clients that need to know certain configurations of its provider. For a possible list of configurations
see the OpenID Provider Configuration Response [spec](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationResponse).

## Usage Example

```javascript
const loadConfig = require('get-openid-configuration');

loadConfig('https://accounts.google.com').then(config => {
   console.log(`Google OpenID authorization_endpoint: ${config.authorization_endpoint}`);
   console.log(`Google OpenID token_endpoint: ${config.token_endpoint}`);
   console.log(`Google OpenID userinfo_endpoint: ${config.userinfo_endpoint}`);
   console.log(`Google OpenID jwks_uri: ${config.jwks_uri}`);
   console.log(`Google OpenID token_endpoint_auth_methods_supported: ${config.token_endpoint_auth_methods_supported}`);
}).catch((err) => {
    console.error(err);
});
```

```javascript
const loadConfig = require('get-openid-configuration');

(async () => {
    try {
        const config = await loadConfig('https://login.yahoo.com');
        console.log(`Yahoo OpenID authorization_endpoint: ${config.authorization_endpoint}`);
        console.log(`Yahoo OpenID token_endpoint: ${config.token_endpoint}`);
        console.log(`Yahoo OpenID userinfo_endpoint: ${config.userinfo_endpoint}`);
        console.log(`Yahoo OpenID jwks_uri: ${config.jwks_uri}`);
        console.log(`Yahoo OpenID token_endpoint_auth_methods_supported: ${config.token_endpoint_auth_methods_supported}`);
    } catch (err) {
        console.error(err);
    }
})();
```
