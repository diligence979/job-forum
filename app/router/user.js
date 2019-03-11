'use strict';

module.exports = app => {
  const { router } = app;
  router.post('/api/user', 'user.create');
  router.delete('/api/user/:id', 'user.destroy');
  router.put('/api/user/:id', 'user.update');
  router.post('/api/user/login', 'user.login');
  router.get('/api/user/:id', 'user.find');
  router.get('/api/user/:id/edit', 'user.find');
  router.post('/api/user/avatar', 'user.avatar');
};
