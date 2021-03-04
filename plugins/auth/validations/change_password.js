"use strict";

const Joi = require("@hapi/joi");

module.exports = {
  payload: Joi.object({
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
  }),
};
