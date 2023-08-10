const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'jsnode',
    password: process.env.DB_PASSWORD,
    database: 'react-nodebird',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
  },
  test: {
    username: 'jsnode',
    password: process.env.DB_PASSWORD,
    database: 'react-nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'jsnode',
    password: process.env.DB_PASSWORD,
    database: 'react-nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
