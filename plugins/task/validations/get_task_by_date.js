'use strict';

const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

module.exports = {
  payload: Joi.object({
    
    deadline: Joi.date().format('YYYY-MM-DD').utc().required()
 
    
   
  })
};
