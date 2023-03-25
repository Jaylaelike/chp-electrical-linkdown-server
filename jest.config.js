/** @type {import('jest').Config} */
const {defaults} = require('jest-config');
const config = {
  verbose: true,
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
};

module.exports = config;
