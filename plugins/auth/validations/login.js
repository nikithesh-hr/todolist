"use strict";

const Joi = require('joi');

module.exports = {
  payload: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
