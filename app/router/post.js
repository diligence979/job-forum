'use strict';

module.exports = app => {
  const { router } = app;
  router.get('/api/posts', 'post.index');
  router.post('/api/posts', 'post.create');
  router.get('/api/users/:id/posts', 'post.findByUser');
  router.get('/api/posts/:id', 'post.find');
  router.get('/api/posts/:id/edit', 'post.edit');
  router.delete('/api/users/:user_id/posts/:id', 'post.destroy');
  router.put('/api/users/:user_id/posts/:id', 'post.update');
  router.get('/api/comments/posts', 'post.hot');
};
