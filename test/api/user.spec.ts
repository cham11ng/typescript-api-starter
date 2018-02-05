import { expect } from 'chai';
import * as request from 'supertest';
import * as HttpStatus from 'http-status-codes';

import app from '../../dist';

describe('Users API test', () => {
  it('should return users list', done => {
    request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.statusCode).to.equal(HttpStatus.OK);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');

        done();
      });
  });
});
