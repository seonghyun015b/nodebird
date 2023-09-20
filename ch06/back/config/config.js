const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'js-bird',
    password: process.env.DB_PASSWORD,
    database: 'js-bird-database',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
  },
  test: {
    username: 'js-bird',
    password: process.env.DB_PASSWORD,
    database: 'js-bird-database',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'js-bird',
    password: process.env.DB_PASSWORD,
    database: 'js-bird-database',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
