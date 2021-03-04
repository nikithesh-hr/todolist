'use strict';
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

module.exports = {
  params: Joi.object({ id: Joi.string().required() }),
  payload: Joi.object({
    taskname: Joi.string().required(),
    deadline: Joi.date().format('YYYY-MM-DD').utc().required(),
    taskid : Joi.string().required()
  })
};

