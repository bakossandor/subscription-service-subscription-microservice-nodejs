const { subscribe } = require('../controllers/handle-subscription');
module.exports = (app) => {
  // subscribe
  app.post('/subscribe/:uri', subscribe);
  // unsubscribe
};
