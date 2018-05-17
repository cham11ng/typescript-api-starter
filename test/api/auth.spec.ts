import faker from 'faker';
import request from 'supertest';
import * as HttpStatus from 'http-status-codes';

import app from '../../src/app';
import Role from '../../src/resources/enums/Role';
import { getRandomElement } from '../../src/utils/array';
import * as userService from '../../src/services/userService';

describe('Login API test', () => {
  const user = {
    roleId: Role.NORMAL_USER,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
  const { email, password } = user;

  beforeAll(async () => {
    await userService.insert(user);
  });

  test('should successfully logged in with valid credentials.', () => {
    const expectedResponse = {
      code: HttpStatus.OK,
      message: expect.any(String),
      data: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String)
      }
    };

    return request(app)
      .post('/login')
      .send({ email, password })
      .then(res => {
        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toEqual(expectedResponse);
      });
  });

  test('should fail login with invalid credentials.', () => {
    const expectedResponse = {
      code: HttpStatus.UNAUTHORIZED,
      message: expect.any(String)
    };

    return request(app)
      .post('/login')
      .send({ email, password: `${password}${password}` })
      .then(res => {
        expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
        expect(res.body).toEqual(expectedResponse);
      });
  });

  test('should fail login without login payload.', () => {
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
      .post('/login')
      .then(res => {
        const errorResponse = getRandomElement(res.body.data);

        expect(res.status).toBe(HttpStatus.BAD_REQUEST);
        expect(res.body).toEqual(expectedResponse);
        expect(errorResponse).toEqual(badRequestResponse);
      });
  });
});
