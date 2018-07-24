const https = require('https');

function doRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            const {statusCode} = resp;
            const contentType = resp.headers['content-type'];

            let error = null;
            if (statusCode !== 200) {
                error = new Error(`Request to ${url} failed with HTTP status: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error(`Content-type of GET ${url} is invalid!`+
                    ` Expected application/json but received ${contentType}`);
            }

            if (error) {
                reject(error);
                resp.resume();
                return;
            }

            let resBody = [];
            resp.on('data', (chunk) => {
                resBody.push(chunk);
            });
            resp.on('end', () => {
                try {
                    resolve(JSON.parse(resBody));
                } catch (err) {
                    reject(err.message);
                }
            });

        }).on("error", (err) => {
            reject(new Error(`Request to ${url} failed with error: ${err.message}`));
        });
    });
}

function getConfig(issuer) {
    return doRequest(issuer.replace(/\/$/, "") + '/.well-known/openid-configuration');
}

module.exports = getConfig;
