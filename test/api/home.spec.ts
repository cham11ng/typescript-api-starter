import { expect } from 'chai';
import request from 'supertest';
import * as HttpStatus from 'http-status-codes';

import app from '../../src';

describe('API Information', () => {
  it('should return application information', done => {
    request(app)
      .get('/api')
      .end((err, res) => {
        const expectedResponse = {
          name: app.locals.name,
          version: app.locals.version
        };

        expect(res.status).to.equal(HttpStatus.OK);
        expect(res.body).to.deep.equal(expectedResponse);

        done();
      });
  });
});
