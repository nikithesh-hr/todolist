'use strict';
const Joi = require('joi');

module.exports = {
  params: Joi.object({ id: Joi.string().required() })
};
