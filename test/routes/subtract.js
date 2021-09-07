

process.env.NODE_ENV = 'test';

const chai = require('chai');

// const should = chai.should();

chai.use(require('chai-http'));
const http = require('http');
chai.use(require('chai-json-schema'));
const config = require('config');
const router = require('../../bin/router');


const baseUri = config.get('api.BASE_URI');

describe.only(
    'Test users routes',
    () => {
        const server = http.createServer(router());
        const request = chai.request(server);
        after(done => server.close(done));

        it(
            'GET /users should return data',
            (done) => {
                request
                    .post(`${baseUri}subtract`)
                    .set('x-method-override', 'get')
                    .send({
                        questionsDetails: [{
                            minuend_digits: 1,
                            subtrahend_digits: 1
                        }],
                        numberOfQuestions: 1,
                        allowBorrowing: true,
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            },
        );

        it(
            'GET /users should return data',
            (done) => {
                request
                    .post(`${baseUri}subtract`)
                    .set('x-method-override', 'get')
                    .send({
                        questionsDetails: [{
                            minuend_digits: 1,
                            subtrahend_digits: 1
                        }],
                        numberOfQuestions: 1,
                        allowBorrowing: true,
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            },
        );
    },
);
