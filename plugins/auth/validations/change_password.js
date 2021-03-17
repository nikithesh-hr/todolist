"use strict";

const Joi = require('joi');

module.exports = {
  payload: Joi.object({
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
  }),
};
