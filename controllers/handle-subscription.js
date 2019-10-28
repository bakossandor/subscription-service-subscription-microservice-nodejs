const { dbAddSubscriber } = require('../db/db');
const validateSubscriber = require('../lib/validate');

async function subscribe(request, response, next) {
  try {
    const { body: { first_name, last_name, email }, params: { uri }} = request;
    const validationError = validateSubscriber({first_name, last_name, email});
    if (validationError) {
      response.status(400).send({'developerMessage': validationError});
      return;
    } 
    await dbAddSubscriber(uri, first_name, last_name, email);
    response.status(201).end();
  } catch (error) {
    // if email is already used
    if (error.code === '23505') {
      response.status(400).send({ 'developerMessage': 'This email address has been already subscribed for this newsletter' })
      return;
    } else if (error.code === '23502') {
      console.log(error);
      // if the uri is invalid
      response.status(400).send({ 'developerMessage': 'Invalid uri!' })
      return;
    }
    next(error);
  }
}

module.exports = {
  subscribe,
}