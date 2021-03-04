'use strict';
const Joi = require('@hapi/joi') ;

module.exports = {
 
  payload: Joi.object({
    status: Joi.string().required()
     
  
  })
};

