'use strict';

module.exports = app => {
  const { router } = app;
  router.post('/api/users', 'user.create');
  router.delete('/api/users/:id', 'user.destroy');
  router.put('/api/users/:id', 'user.update');
  router.post('/api/users/login', 'user.login');
  router.get('/api/users/:id', 'user.find');
  router.get('/api/users/:id/edit', 'user.find');
  router.post('/api/users/avatar', 'user.avatar');
};
