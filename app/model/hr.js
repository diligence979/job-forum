'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Hr = app.model.define('hr', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(255),
    password: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  Hr.associate = () => {
    app.model.Hr.hasMany(app.model.Ad, {
      as: 'ad',
    });
    app.model.Hr.hasMany(app.model.Comment, {
      as: 'comment',
    });
  };

  return Hr;
};
