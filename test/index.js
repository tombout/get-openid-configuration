const getOpenIdConfig = require('get-openid-configuration');
const chai = require('chai');
const expect = chai.expect;

const nock = require('nock');

describe('Get /.well-known/openid-configuration', () => {
    beforeEach(() => {
        nock('https://server.example.com')
            .get('/.well-known/openid-configuration')
            .reply(200, require('./openid-configuration.json'));
    });

    it('Expect config parsed to object ', () => {
        return getOpenIdConfig('https://server.example.com').then(config => {
           expect(typeof config).to.equal('object');
           expect(config.issuer).to.equal('https://server.example.com');
           expect(config.authorization_endpoint).to.equal('https://server.example.com/connect/authorize');
        });
    });

    it('Expect config parsed to object (also with trailing slash)', () => {
        return getOpenIdConfig('https://server.example.com/').then(config => {
            expect(typeof config).to.equal('object');
            expect(config.issuer).to.equal('https://server.example.com');
            expect(config.authorization_endpoint).to.equal('https://server.example.com/connect/authorize');
        });
    });
});
