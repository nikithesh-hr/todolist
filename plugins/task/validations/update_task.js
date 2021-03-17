'use strict';
const Joi = require('joi');

module.exports = {
  params: Joi.object({ id: Joi.string().required() }),
  payload: Joi.object({
    taskname: Joi.string().required(),
    deadline: Joi.date().iso().required(),
    taskid : Joi.string().required()
  })
};

