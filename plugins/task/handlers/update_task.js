"use strict";

const Boom = require("@hapi/boom");
const Taskdetails = require("../schemas/taskdetails");


module.exports = async (request, h) => {
   
 
  const { payload, params, auth : {
    credentials
  } } = request;
  const { current_user } =credentials;
  
  const filter = {
    _id: params.id ,
      user_id : current_user.id
  };
 
  try {
    const taskdetails = await Taskdetails.findOneAndUpdate(
      filter,
      payload
      
    );

    if (!taskdetails) {
      return Boom.badRequest("invalid task id");
    }

    return {
      statusCode: 204,
      message: "taskdetails updated!",
      taskdetails
    };
  } catch (e) {
    return Boom.badRequest(e);
  }
};
