import faker from 'faker';
import { expect } from 'chai';
import request from 'supertest';
import * as HttpStatus from 'http-status-codes';

import app from '../../src';

describe('Users API test', () => {
  it('should return users list.', done => {
    request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(HttpStatus.OK);
        expect(res.body).to.have.keys('code', 'data', 'message');
        expect(res.body.data).to.be.an('array');

        done();
      });
  });

  it('should successfully insert user detail into database and return inserted user detail.', done => {
    const userBody = {
      name: faker.name.findName(),
      email: faker.internet.email()
    };
    request(app)
      .post('/api/users')
      .send(userBody)
      .end((err, res) => {
        expect(res.status).to.equal(HttpStatus.OK);
        expect(res.body).to.have.keys('code', 'data', 'message');
        expect(res.body.data).to.be.an('object');

        done();
      });
  });
});
