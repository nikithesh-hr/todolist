'use strict';

const Joi = require('joi');

module.exports = {
  payload: Joi.object({
    
    deadline: Joi.date().iso().required(),
 
    
   
  })
};
