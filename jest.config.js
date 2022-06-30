module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  testMatch: ['**/*/*.spec.ts'],
  moduleFileExtensions: ['js', 'ts'],
  moduleDirectories: ['node_modules']
};
