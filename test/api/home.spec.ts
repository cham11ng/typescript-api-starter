import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import app from '../../src/app';
import config from '../../src/config/config';

describe('API Information', () => {
  const expectedResponse = {
    name: config.name,
    version: config.version
  };

  test('should return application information', () => {
    return request(app)
      .get('/')
      .then((res) => {
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).toEqual(expectedResponse);
      });
  });
});
