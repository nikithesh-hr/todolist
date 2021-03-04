'use strict';

const Boom = require('@hapi/boom');

const Taskdetails = require("../schemas/taskdetails");

 

module.exports = async (request, h) => {

const { payload, auth : {
  credentials
} } = request;
const { current_user } =credentials;

const { status } = payload;

const filter = {
   status,
    user_id : current_user.id 
};

  try {
    
    const taskdetails = await Taskdetails.findOne({
    filter
    });

    return {
      statusCode: 200,
      message: `status `,
      data: {
        taskdetails
      }
    };
  } catch (e) {
    return Boom.badRequest(e);
  }
};
