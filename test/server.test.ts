
process.env.NODE_ENV = 'test';
import * as request from 'request';
import app from '../app/index';
import { HTTPStatus } from '../app/config/config';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('loading koa', function () {
    it('responds to /', function (done) {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(HTTPStatus.Ok);
            });
        done();
    });
    it('404 everything else', function (done) {
        chai.request(app)
            .get('/foo/bar')
            .end((err, res) => {
                res.should.have.status(HTTPStatus.NotFound);
            });
        done();
    });
});