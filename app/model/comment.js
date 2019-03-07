'use strict';

module.exports = app => {
  const { TEXT, INTEGER, DATE } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    content: TEXT,
    created_at: DATE,
    updated_at: DATE,
  });

  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.Post);
    app.model.Comment.belongsTo(app.model.User);
    app.model.Comment.belongsTo(app.model.Hr);
    app.model.Comment.belongsTo(app.model.Ad);
  };

  return Comment;
};
