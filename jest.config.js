module.exports = {
  testRegex: '.spec.ts$',
  testPathIgnorePatterns: [
    '/node_modules/', // default
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
