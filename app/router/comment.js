'use strict';

module.exports = app => {
  const { router } = app;
  router.get('/api/users/comment', 'comment.index');
  router.post('/api/users/comment', 'comment.create');
  router.delete('/api/users/:user_id/comment/:id', 'comment.userDestroy');
  router.delete('/api/hrs/:hr_id/comment/:id', 'comment.hrDestory')
};
