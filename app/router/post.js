'use strict';

module.exports = app => {
  const { router } = app;
  router.get('/api/post', 'post.index');
  router.post('/api/post', 'post.create');
  router.get('/api/post/user/:id', 'post.findByUser')
  router.get('/api/post/:id', 'post.find');
  router.get('/api/post/:id/edit', 'post.edit');
  router.delete('/api/users/:user_id/post/:id', 'post.destroy');
  router.put('/api/users/:user_id/post/:id', 'post.update');
  router.get('/api/comment/post', 'post.hot');
};
