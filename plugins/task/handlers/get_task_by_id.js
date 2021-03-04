'use strict';

const Boom = require('@hapi/boom');

const Taskdetails = require("../schemas/taskdetails");

 

module.exports = async (request, h) => {
 
 
const { params, auth : {
  credentials
} } = request;
const { current_user } =credentials;



try {
    
   const taskdetails = await Taskdetails.findOne({
      _id : params.id,
      user_id : current_user.id
    });

    return {
      statusCode: 200,
      message: `taskid  : ${params.id} `,
      data: {
        taskdetails
      }
    };
  } catch (e) {
    return Boom.badRequest(e);
  }
};
