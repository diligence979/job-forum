'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(255),
    password: STRING(255),
    avatar: TEXT,
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = () => {
    app.model.User.hasMany(app.model.Post, {
      as: 'post',
    });
    app.model.User.hasMany(app.model.Comment, {
      as: 'comment',
    });
  };

  return User;
};
