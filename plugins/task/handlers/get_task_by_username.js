"use strict";

const Boom = require("@hapi/boom");
const Taskdetails = require("../schemas/taskdetails");


module.exports = async (request, h) => {

  
  const { payload } = request;
   
  
  const {username } = payload;
  
  try {
     
    const taskdetails = await Taskdetails.findOne({
      username
    });


    return {
      statusCode: 200,
      message: `taskdetails`,
      data: {
        taskdetails,
      },
    };
  } catch (e) {
    return Boom.badRequest(e);
  }
};
