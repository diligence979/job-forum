'use strict';

module.exports = app => {
  const { router } = app;
  router.post('/api/hrs', 'hr.create');
  router.delete('/api/hrs/:id', 'hr.destroy');
  router.put('/api/hrs/:id', 'hr.update');
  router.post('/api/hrs/login', 'hr.login');
  router.get('/api/hrs/:id', 'hr.find');
  router.get('/api/hrs/:id/edit', 'hr.find');
  router.post('/api/hrs/avatar', 'hr.avatar')
};
