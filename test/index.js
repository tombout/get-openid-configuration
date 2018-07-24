const getOpenIdConfig = require('get-openid-configuration');
const chai = require('chai');
const expect = chai.expect;

const nock = require('nock');

describe('Get /.well-known/openid-configuration', () => {
    it('Expect config parsed to object ', () => {
        nock('https://server.example.com')
            .get('/.well-known/openid-configuration')
            .reply(200, require('./openid-configuration.json'));
        return getOpenIdConfig('https://server.example.com').then(config => {
           expect(typeof config).to.equal('object');
           expect(config.issuer).to.equal('https://server.example.com');
           expect(config.authorization_endpoint).to.equal('https://server.example.com/connect/authorize');
        });
    });

    it('Expect config parsed to object (also with trailing slash)', () => {
        nock('https://server.example.com')
            .get('/.well-known/openid-configuration')
            .reply(200, require('./openid-configuration.json'));
        return getOpenIdConfig('https://server.example.com/').then(config => {
            expect(typeof config).to.equal('object');
            expect(config.issuer).to.equal('https://server.example.com');
            expect(config.authorization_endpoint).to.equal('https://server.example.com/connect/authorize');
        });
    });

    it('Expect error with HTTP status code on wrong issuer URL', () => {
        nock('https://wrong.example.com')
            .get('/.well-known/openid-configuration')
            .reply(404);
        return getOpenIdConfig('https://wrong.example.com').then(config => {
            expect(config).to.be.a('null');
        }).catch(err => {
            expect(err).to.be.an('error');
            expect(err.message).to.have.string('404');
        });
    });

    it('Expect error with detail message on connection problems with issuer URL', () => {
        nock('https://wrong.example.c')
            .get('/.well-known/openid-configuration')
            .replyWithError('getaddrinfo ENOTFOUND');
        return getOpenIdConfig('https://wrong.example.c').then(config => {
            expect(config).to.be.a('null');
        }).catch(err => {
            expect(err).to.be.an('error');
            expect(err.message).to.have.string('getaddrinfo ENOTFOUND');
        });
    });
});
