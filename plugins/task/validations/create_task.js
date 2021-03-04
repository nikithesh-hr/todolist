
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
module.exports = {
  payload: Joi.object({
    taskname: Joi.string().required(),
    deadline: Joi.date().format('YYYY-MM-DD').utc().required()
    }),
}; 