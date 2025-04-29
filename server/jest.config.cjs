module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': [
      'babel-jest',
      { configFile: './babel.config.cjs', babelrc: false },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  globals: {},
};
