"use strict";

const Boom = require("@hapi/boom");
const Taskdetails = require("../schemas/taskdetails");

module.exports = async (request, h) => {
   
  const { params, auth : {
    credentials
  } } = request;
  const { current_user } =credentials;
  

  try {
   
  const options = { useFindAndModify: false };
    const taskdetails = await Taskdetails.findOneAndUpdate(
      { id : params.id,
        user_id : current_user.id },
        
      { $set: { visibility: false } },
      options
    );


    return {
      statusCode: 204,
      message: "taskdetails removed",
      data :{
        taskdetails
      }
    };
  } catch (e) {
    return Boom.badRequest(e);
  }
};
