'use strict';
const Joi = require('@hapi/joi') ;

module.exports = {
 
  payload: Joi.object({
    username: Joi.string().required()
  })
};

