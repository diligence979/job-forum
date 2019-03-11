'use strict';

module.exports = app => {
  const { router } = app;
  router.post('/api/hr', 'hr.create');
  router.delete('/api/hr/:id', 'hr.destroy');
  router.put('/api/hr/:id', 'hr.update');
  router.post('/api/hr/login', 'hr.login');
  router.get('/api/hr/:id', 'hr.find');
  router.get('/api/hr/:id/edit', 'hr.find');
  router.post('/api/hr/avatar', 'hr.avatar')
};
