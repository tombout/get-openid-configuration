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
