const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'js-back',
    password: process.env.DB_PASSWORD,
    database: 'js-back-db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'js-back',
    password: process.env.DB_PASSWORD,
    database: 'js-back-db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'js-back',
    password: process.env.DB_PASSWORD,
    database: 'js-back-db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
