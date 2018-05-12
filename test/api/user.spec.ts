import faker from 'faker';
import request from 'supertest';
import * as HttpStatus from 'http-status-codes';

import app from '../../src/app';
import { getRandomElement } from '../../src/utils/array';

describe('Users API test', () => {
  test('should return users list.', () => {
    const expectedResponse = {
      code: HttpStatus.OK,
      message: expect.any(String),
      data: expect.any(Array)
    };
    const userResponse = {
      name: expect.any(String),
      email: expect.any(String),
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    };

    return request(app)
      .get('/api/users')
      .then(res => {
        const userInfo = getRandomElement(res.body.data);

        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toEqual(expectedResponse);
        expect(userInfo).toEqual(userResponse);
      });
  });

  test('should successfully insert user detail into database and return inserted user detail.', () => {
    const userBody = {
      name: faker.name.findName(),
      email: faker.internet.email()
    };
    const expectedResponse = {
      code: HttpStatus.OK,
      message: expect.any(String),
      data: expect.any(Object)
    };
    const userResponse = {
      ...userBody,
      id: expect.any(Number),
      created_at: expect.any(String),
      updated_at: expect.any(String)
    };

    return request(app)
      .post('/api/users')
      .send(userBody)
      .then(res => {
        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toEqual(expectedResponse);
        expect(res.body.data).toEqual(userResponse);
      });
  });

  test('should fail request when payload is incorrect.', () => {
    const expectedResponse = {
      code: HttpStatus.BAD_REQUEST,
      message: expect.any(String),
      data: expect.any(Array)
    };
    const badRequestResponse = {
      param: expect.any(String),
      message: expect.any(String)
    };

    return request(app)
      .post('/api/users')
      .then(res => {
        const errorResponse = getRandomElement(res.body.data);

        expect(res.status).toBe(HttpStatus.BAD_REQUEST);
        expect(res.body).toEqual(expectedResponse);
        expect(errorResponse).toEqual(badRequestResponse);
      });
  });
});
