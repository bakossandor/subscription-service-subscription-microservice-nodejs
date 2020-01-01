const { dbAddSubscriber, dbRemoveSubscriber } = require('../db/db');
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

async function unsubscribe(request, response, next) {
  try {
    const { params: { uri } } = request;
    const { query: { email } } = request;
    await dbRemoveSubscriber(uri, email);
    response.status(201).end();
  } catch (error) {
    // if the error come from invalid uuid syntax - meaning the id field is not a valid uuid
    // in that case it handle as the resource does not exists as sending nothing to the controller
    // and the controller handles that case
    if (error.code === '22P02') {
      response.status(400).send({'developerMessage': 'Bad Request'});
      return;
    }
    next(error)
  }
}

module.exports = {
  subscribe,
  unsubscribe,
}