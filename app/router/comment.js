'use strict';

module.exports = app => {
  const { router } = app;
  router.get('/api/comments', 'comment.index');
  router.post('/api/comments', 'comment.create');
  router.delete('/api/users/:user_id/comments/:id', 'comment.userDestroy');
  router.delete('/api/hrs/:hr_id/comments/:id', 'comment.hrDestory')
};
