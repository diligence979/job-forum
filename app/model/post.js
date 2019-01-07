'use strict';

module.exports = app => {
  const { TEXT, INTEGER, DATE, STRING } = app.Sequelize;

  const Post = app.model.define('post', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(255),
    content: TEXT,
    created_at: DATE,
    updated_at: DATE,
  });

  Post.associate = () => {
    app.model.Post.belongsTo(app.model.User);
    app.model.Post.hasMany(app.model.Comment, {
      as: 'comment',
    });
  };

  return Post;
};
