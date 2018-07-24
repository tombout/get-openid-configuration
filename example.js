const loadConfig = require('get-openid-configuration');

loadConfig('https://accounts.google.com').then(config => {
   console.log('Your Google OpenID authorization_endpoint: ' + config.authorization_endpoint);
   console.log('Your Google OpenID token_endpoint: ' + config.token_endpoint);
   console.log('Your Google OpenID userinfo_endpoint: ' + config.userinfo_endpoint);
}).catch((err) => {
    console.error('Could not load OpenID configuration. Error was: ' + err);
});

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
