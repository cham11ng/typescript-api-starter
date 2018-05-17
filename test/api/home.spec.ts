import request from 'supertest';
import * as HttpStatus from 'http-status-codes';

import app from '../../src/app';

describe('API Information', () => {
  const expectedResponse = {
    name: app.locals.name,
    version: app.locals.version
  };

  test('should return application information', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toEqual(expectedResponse);
      });
  });
});
