

const assert = require('assert'),
expect = require('chai').expect,
should = require('chai').should(),
chai = require('chai'),
chaiHttp = require('chai-http');
server = require('./server');

//functions
var randomer = require('./moduleFunctions');

chai.use(chaiHttp);

describe('Verify that the User id is 13 characters long', function () {
    it('should return number of charachters in a string for user registration', function () {
        assert.equal(randomer.randomer().length, 13);


    });
    it('should return true for valid user login', function () {
        chai.request('http://localhost:8000')
            .post('/login')
            .set('Accept','application/json')
            .send({ Password: 'asdasd', Email: 'macovei@ciprian.com'})
            .end((req,res) =>{
                res.should.have.status(200);
                res.body.should.be.a('Object');
                expect(res.body.ok).to.be.equal(true);
            })
    });
    it('should return false for invalid user login', function () {
        chai.request('http://localhost:8000')
            .post('/login')
            .set('Accept','application/json')
            .send({ Password: 'asdaaasd', Email: 'macovei@ciprian.com'})
            .end((req,res) =>{
                res.should.have.status(200);
                res.body.should.be.a('Object');
                expect(res.body.ok).to.be.equal(false);
            })
    });
});