import { camelize, isObject } from '../../src/utils/object';

describe('Utils: isObject()', () => {
  const obj = { isTest: true };

  test('should return true if parameter is an object', () => {
    const result = isObject(obj);

    expect(result).toEqual(true);
  });

  test('should return false if parameter is an array', () => {
    const result = isObject([10]);

    expect(result).toEqual(false);
  });

  test('should return false if parameter is an null', () => {
    const result = isObject(null);

    expect(result).toEqual(false);
  });

  test('should return false if parameter is an undefined', () => {
    const result = isObject(undefined);

    expect(result).toEqual(false);
  });
});

describe('Utils: camelize()', () => {
  const date = new Date();
  const obj = {
    id: 10,
    full_name: 'John Doe',
    date_of_birth: date,
    new_current_location: 'Check'
  };

  const arrayOfObject = [
    obj,
    {
      id: 11,
      full_name: 'Misa Chun',
      date_of_birth: date,
      new_current_location: 'Unknown'
    }
  ];

  test('should successfully convert snake_case object all keys into camelCase', () => {
    const expectedObj = {
      id: 10,
      fullName: 'John Doe',
      dateOfBirth: date,
      newCurrentLocation: 'Check'
    };

    const result = camelize(obj);

    expect(result).toEqual(expectedObj);
  });

  test('should successfully convert snake_case array of object all keys into camelCase', () => {
    const expectedObj = [
      {
        id: 10,
        fullName: 'John Doe',
        dateOfBirth: date,
        newCurrentLocation: 'Check'
      },
      {
        id: 11,
        fullName: 'Misa Chun',
        dateOfBirth: date,
        newCurrentLocation: 'Unknown'
      }
    ];

    const result = camelize(arrayOfObject);

    expect(result).toEqual(expectedObj);
  });

  test('should successfully convert snake_case nested object all keys into camelCase', () => {
    const request = {
      id: 20,
      user_info: {
        full_name: 'John Doe',
        new_location_address: 'Test',
        programming_skills: ['typescript', 'react'],
        education: [
          {
            completed_year: 1994,
            choosen_faculty: 'Computer Science'
          },
          {
            completed_year: 1996,
            choosen_faculty: 'Engineering'
          }
        ]
      }
    };
    const expected = {
      id: 20,
      userInfo: {
        fullName: 'John Doe',
        newLocationAddress: 'Test',
        programmingSkills: ['typescript', 'react'],
        education: [
          {
            completedYear: 1994,
            choosenFaculty: 'Computer Science'
          },
          {
            completedYear: 1996,
            choosenFaculty: 'Engineering'
          }
        ]
      }
    };
    const result = camelize(request);

    expect(result).toEqual(expected);
  });

  test('should return same value if parameter is number', () => {
    const value = 10;
    const result = camelize(value);

    expect(result).toEqual(value);
  });

  test('should return same value if parameter is string', () => {
    const text = 'hello starter API';
    const result = camelize(text);

    expect(result).toEqual(text);
  });
});
