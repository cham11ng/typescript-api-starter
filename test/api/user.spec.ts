import faker from 'faker';
import request from 'supertest';
import * as HttpStatus from 'http-status-codes';

import app from '../../src/app';
import Role from '../../src/resources/enums/Role';
import { clearDb, getRandomElement } from '../helper';
import * as userService from '../../src/services/userService';

describe('GET /users API test', () => {
  let authorization: string;
  const user = {
    name: faker.name.findName(),
    email: 'first-user@starter.com',
    password: faker.internet.password()
  };
  const { email, password } = user;

  beforeAll(async () => {
    await clearDb();

    await userService.insert(user);

    const response = await request(app)
      .post('/login')
      .send({ email, password });
    authorization = `Bearer ${response.body.data.accessToken}`;
  });

  test('should return users list.', () => {
    const expectedResponse = {
      code: HttpStatus.OK,
      message: expect.any(String),
      data: expect.any(Array)
    };
    const userResponse = {
      name: expect.any(String),
      email: expect.any(String),
      roleId: expect.any(Number),
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    };

    return request(app)
      .get('/users')
      .set({ authorization })
      .then((res) => {
        const userInfo = getRandomElement(res.body.data);

        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toEqual(expectedResponse);
        expect(userInfo).toEqual(userResponse);
      });
  });
});

describe('POST /users API test', () => {
  let authorization: string;
  const user = {
    roleId: Role.NORMAL_USER,
    name: faker.name.findName(),
    email: 'login-user@starter.com',
    password: faker.internet.password()
  };
  const { email, password } = user;

  beforeAll(async () => {
    await userService.insert(user);
    const response = await request(app)
      .post('/login')
      .send({ email, password });
    authorization = `Bearer ${response.body.data.accessToken}`;
  });

  test('should successfully insert user detail into database and return inserted user detail.', () => {
    const userBody = {
      name: faker.name.findName(),
      email: 'dummy-user@starter.com',
      password: faker.internet.password()
    };
    const expectedResponse = {
      code: HttpStatus.OK,
      message: expect.any(String),
      data: {
        ...userBody,
        id: expect.any(Number),
        roleId: expect.any(Number),
        password: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }
    };

    return request(app)
      .post('/users')
      .set({ authorization })
      .send(userBody)
      .then((res) => {
        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toEqual(expectedResponse);
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
      .post('/users')
      .set({ authorization })
      .then((res) => {
        const errorResponse = getRandomElement(res.body.data);

        expect(res.status).toBe(HttpStatus.BAD_REQUEST);
        expect(res.body).toEqual(expectedResponse);
        expect(errorResponse).toEqual(badRequestResponse);
      });
  });

  test('should fail request without authorization token.', () => {
    return request(app)
      .post('/users')
      .then((res) => {
        expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      });
  });
});
