'use strict';

module.exports = app => {
  const { router } = app;
  router.get('/api/ads', 'ad.index');
  router.post('/api/ads', 'ad.create');
  router.get('/api/ads/:id', 'ad.find');
  router.get('/api/hrs/:id/ads', 'ad.findByHr')
  router.get('/api/ads/:id/edit', 'ad.edit');
  router.delete('/api/hrs/:hr_id/ads/:id', 'ad.destroy');
  router.put('/api/hrs/:hr_id/ads/:id', 'ad.update');
  router.get('/api/comments/ads', 'ad.hot');
};
