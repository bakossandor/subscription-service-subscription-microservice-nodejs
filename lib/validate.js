const Joi = require('@hapi/joi');

const config = {
  errorMessages: {
    email: 'You must provide a valide email address',
    first_name: 'You must provide a first name',
    last_name: 'You must provide a last name',
    default: 'invalid credentials',
  }
};

const subscriberSchema = Joi.object({
  email: Joi.string().email().required(),
  last_name: Joi.string().required(),
  first_name: Joi.string().required(),
});

function validateSubscriber(sub) {
  const { error } = subscriberSchema.validate(sub);
  if (error) {
    switch (error.details[0].context.key) {
      case 'email':
        return config.errorMessages.email;
      case 'first_name':
        return config.errorMessages.first_name;
      case 'last_name':
        return config.errorMessages.last_name;
      case 'default':
        return config.errorMessages.default;
    }
  }
  return false;
}

module.exports = validateSubscriber;
