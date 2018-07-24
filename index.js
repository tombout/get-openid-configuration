const https = require('https');

function doRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let resBody = '';
            resp.on('data', (chunk) => {
                resBody += chunk;
            });
            resp.on('end', () => {
                resolve(JSON.parse(resBody));
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
}

function getConfig(issuer) {
    return doRequest(issuer.replace(/\/$/, "") + '/.well-known/openid-configuration');
}

module.exports = getConfig;
