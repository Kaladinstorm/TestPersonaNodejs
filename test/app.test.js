var app = require('../app');

const supertest = require('supertest');
const expect = require('expect');

describe('Testing Apis', function() {
    it('Test Home Page', (done) => {

        supertest(app)
        .get('/')
        .expect(200)
        .end(done);
    });

    it('Test page personas', (done) => {
        supertest(app)
        .get('/personas')
        .expect(200)
        .end(done);
    });

    it('Test API listaPersonas', (done) => {
        supertest(app)
        .get('/api/persona')
        .expect(200)
        .end(done);
    })
});