'use strict';

module.exports = app => {
  if (app.config.env === 'local') {
    app.beforeStart(async () =>
      await app.model.sync({
        force: false,
      })
    );
  }
  // app.once('server', server => {
  //   // websocket
  // });
  // app.on('error', (err, ctx) => {
  //   // report error
  // });
  // app.on('request', ctx => {
  //   // log receive request
  // });
  // app.on('response', ctx => {
  //   // ctx.starttime is set by framework
  //   const used = Date.now() - ctx.starttime;
  //   // log total cost
  // });
};
