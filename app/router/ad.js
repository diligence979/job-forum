'use strict';

module.exports = app => {
  const { router } = app;
  // router.get('/api/ad', 'ad.index');
  router.post('/api/ad', 'ad.create');
  router.get('/api/ad/:id', 'ad.find');
  // router.get('/api/ad/:id/edit', 'ad.edit');
  // router.delete('/api/users/:user_id/ad/:id', 'ad.destroy');
  // router.put('/api/users/:user_id/ad/:id', 'ad.update');
  // router.get('/api/archive', 'ad.archive');
};
