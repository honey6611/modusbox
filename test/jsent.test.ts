import * as chai from 'chai';
import 'mocha';
import * as Koa from 'koa';

import { HTTPStatus } from '../app/config/config';
import { RenderCtx } from '../app/jsend';

const expect = chai.expect;
const should = chai.should();

describe('RenderCtx', () => {

    it('should return a successful response', () => {
        const renderer = new RenderCtx();
        const context = {
            status: undefined,
            body: undefined,
            set: (...args) => { }
        } as Koa.Context;
        renderer.response(
            context,
            HTTPStatus.Ok,
            'HTTP_RESPONSE'
        );
        expect(context.status).to.equal(HTTPStatus.Ok);
        expect(context.body['data']).to.equal('HTTP_RESPONSE');
    });

    it('should return an erroneous response', () => {
        const renderer = new RenderCtx();
        const context = {
            status: undefined,
            body: undefined,
            set: (...args) => { }
        } as Koa.Context;
        renderer.response(
            context,
            HTTPStatus.Unauthorised,
            'HTTP_RESPONSE'
        );
        expect(context.status).to.equal(HTTPStatus.Unauthorised);
        const keys = [
            'app',
            'version',
            'datetime',
            'status',
            'code',
            'hostname',
            'data'
        ];
        keys.forEach(key => {
            expect(context.body[key]).not.to.be.undefined;
        });

    });

});