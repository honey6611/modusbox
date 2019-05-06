import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { asyncHttpRequest, HttpOptions, normalizeResponse } from '../app/utils';
import * as http from 'http';
const expect = chai.expect;
const should = chai.should();

describe('test utils', async function () {
    it('asyncHttpRequest should reject ', async function () {
        const Options: HttpOptions = {
            method: 'get',
            // tslint:disable-next-line: max-line-length
            url: `http://localhost:20000`
        };
        let response;
        try {
            response = <Response>await asyncHttpRequest(<HttpOptions>Options);
        }
        catch (err) {
            response = err;
        }
        const keys = [
            'error',
            'message',
            'status'
        ];
        keys.forEach(key => {
            expect(response[key]).not.to.be.undefined;
        });
    });

    it('normalizeResponse convert string response to json ', async function () {
        const expected = { foo: 'bar' };
        const actual = normalizeResponse('{\"foo\":\"bar\"}');
        expect(expected.foo).to.equal(actual.foo);
    });
})