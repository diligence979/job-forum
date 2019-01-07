'use strict';
const sqlConfig = require('../config');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546844347262_3586';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'job_forum',
    username: sqlConfig.localSql.username,
    password: sqlConfig.localSql.password,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://127.0.0.1' ],
  };

  config.cors = {
    credentials: true,
  };

  return config;
};
