const { subscribe, unsubscribe } = require('../controllers/handle-subscription');
module.exports = (app) => {
  // subscribe
  app.post('/subscribe/:uri', subscribe);
  // unsubscribe
  app.delete('/unsubscribe/:uri', unsubscribe);
};
