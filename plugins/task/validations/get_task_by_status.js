'use strict';
const Joi = require('joi');

module.exports = {
 
  payload: Joi.object({
    status: Joi.string().required()
     
  
  })
};

