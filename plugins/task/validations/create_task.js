'use strict';
const Joi = require('joi');
module.exports = {
  payload: Joi.object({
    taskname: Joi.string().required(),
    deadline: Joi.date().iso().required(),
    }),
}; 