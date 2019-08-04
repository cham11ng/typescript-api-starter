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
    email: 'login-test@starter.com',
    password: faker.internet.password()
  };
  const { email, password } = user;

  beforeAll(async () => {
    await userService.insert(user);
  });

  afterAll(() => new Promise(resolve => setTimeout(() => resolve(), 500)));

  test('should login successfully with valid credentials.', () => {
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

describe('Logout API test', () => {
  let authorization: string;
  const user = {
    roleId: Role.NORMAL_USER,
    name: faker.name.findName(),
    email: 'logout-test@starter.com',
    password: faker.internet.password()
  };
  const { email, password } = user;

  beforeAll(async () => {
    await userService.insert(user);
    const response = await request(app)
      .post('/login')
      .send({ email, password });
    authorization = `Bearer ${response.body.data.refreshToken}`;
  });

  test('should logout successfully with valid authorization token.', () => {
    const expectedResponse = {
      code: HttpStatus.OK,
      message: expect.any(String)
    };

    return request(app)
      .post('/logout')
      .set({ authorization })
      .then(res => {
        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toEqual(expectedResponse);
      });
  });

  test('should fail logout with same authorization token.', () => {
    const expectedResponse = {
      code: HttpStatus.FORBIDDEN,
      message: expect.any(String)
    };

    return request(app)
      .post('/logout')
      .set({ authorization })
      .then(res => {
        expect(res.status).toBe(HttpStatus.FORBIDDEN);
        expect(res.body).toEqual(expectedResponse);
      });
  });

  test('should fail logout with invalid authorization token.', () => {
    const expectedResponse = {
      code: HttpStatus.UNAUTHORIZED,
      message: expect.any(String)
    };

    return request(app)
      .post('/logout')
      .set({ authorization: faker.random.alphaNumeric() })
      .then(res => {
        expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
        expect(res.body).toEqual(expectedResponse);
      });
  });
});

describe('Refresh token API test', () => {
  let accessToken: string;
  let authorization: string;

  const user = {
    roleId: Role.NORMAL_USER,
    name: faker.name.findName(),
    email: 'refresh-test@starter.com',
    password: faker.internet.password()
  };
  const { email, password } = user;

  beforeAll(async () => {
    await userService.insert(user);
    const response = await request(app)
      .post('/login')
      .send({ email, password });
    authorization = `Bearer ${response.body.data.refreshToken}`;
  });

  test('should refresh access token successfully with valid authorization token.', () => {
    const expectedResponse = {
      code: HttpStatus.OK,
      message: expect.any(String),
      data: {
        accessToken: expect.any(String)
      }
    };

    return request(app)
      .post('/refresh')
      .set({ authorization })
      .then(res => {
        accessToken = res.body.data.accessToken;

        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toEqual(expectedResponse);
      });
  });

  test('should successfully access API with new access token.', () => {
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
      .set({ authorization: `Bearer ${accessToken}` })
      .then(res => {
        const userInfo = getRandomElement(res.body.data);

        expect(res.status).toBe(HttpStatus.OK);
        expect(res.body).toEqual(expectedResponse);
        expect(userInfo).toEqual(userResponse);
      });
  });

  test('should fail refresh with invalid authorization token.', () => {
    const expectedResponse = {
      code: HttpStatus.UNAUTHORIZED,
      message: expect.any(String)
    };

    return request(app)
      .post('/refresh')
      .set({ authorization: faker.random.alphaNumeric() })
      .then(res => {
        expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
        expect(res.body).toEqual(expectedResponse);
      });
  });
});
