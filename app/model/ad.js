'use strict';

module.exports = app => {
  const { TEXT, INTEGER, DATE, STRING } = app.Sequelize;

  const Ad = app.model.define('ad', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    company: STRING(255),
    job: STRING(255),
    education: STRING(255),
    team: STRING(255),
    location: STRING(255),
    salary: STRING(255),
    email: STRING(255),
    jd: TEXT,
    other: TEXT,
    comment_size: {
      type: INTEGER,
      defaultValue: 0,
    },
    created_at: DATE,
    updated_at: DATE,
  });

  Ad.associate = () => {
    app.model.Ad.belongsTo(app.model.Hr);
    app.model.Ad.hasMany(app.model.Comment, {
      as: 'comment',
    });
  };

  return Ad;
};
