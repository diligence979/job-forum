'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  require('./router/user')(app);
  require('./router/hr')(app);
  require('./router/ad')(app);
  require('./router/post')(app);
  require('./router/comment')(app);
};
