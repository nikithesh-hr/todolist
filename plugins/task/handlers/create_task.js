"use strict";

const Boom = require("@hapi/boom");
const Taskdetails = require("../schemas/taskdetails");


module.exports = async (request, h) => {
  
  const { payload, auth : {
    credentials
  } } = request;
  const { current_user } =credentials;
  

  try {
    
    const data = Object.assign(payload, { user_id: current_user.id, status : "open"}); 


    const taskdetails = await Taskdetails.create(data);
    
    
    return {
      
      statusCode: 201,
      message: `Taskdetails added`,
      data: {
        taskdetails
      },
    };
  } 
    catch (e) {
    return Boom.badRequest(e);
  }
};
/*

.save() perform internally as either INSERT or UPDATE object to db, while .objects.create() perform only INSERT object to db.

Model.save() perform ....

UPDATE → If the object’s primary key attribute is set to a value that evaluates to True

INSERT → If the object’s primary key attribute is not set or if the UPDATE didn’t update anything (e.g. if primary key is set to a value that doesn’t exist in the database).
*/