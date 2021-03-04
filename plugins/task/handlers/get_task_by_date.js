'use strict';

const Boom = require('@hapi/boom');

const Taskdetails = require("../schemas/taskdetails");


module.exports = async (request, h) => {
  
  const { payload, auth : {
    credentials
  } } = request;
  const {deadline} = payload;
  const { current_user } =credentials;
  

  

  try {
    
    const taskdetails = await Taskdetails.findOne({
    deadline,
    user_id : current_user.id
  });
  

    return {
      statusCode: 200,
      message: `deadline  : ${deadline} `,
      data: {
        taskdetails
      }
    };
  } catch (e) {
    return Boom.badRequest(e);
  }
};
