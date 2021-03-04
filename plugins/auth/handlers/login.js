"use strict";

const Boom = require("@hapi/boom");
const Users = require("../../users/schemas/users");
 
const bcrypt = require("bcrypt");
 const uuid = require("uuid");
 const jwt = require("jsonwebtoken");
 const { promisify } = require("util");

 const redis_client = require("../../../utils/redis_client");
 
 const client_set_async = promisify(redis_client.set).bind(redis_client);

 const jwt_private_key = require("../../../util/config");
 const jwt_expire = require("../../../util/jwt_expire");



module.exports = async (request, h) => {
  const payload = request.payload;
  const username = payload.username;

  console.log(username, "username");

  try {
    // check if the username is valide.
    const user = await Users.findOne({ username });

    console.log(user, "user");

    if (!user) {
      return Boom.badRequest("invalide username!");
    }

    // check if the password is valid.
    const match = await bcrypt.compare(payload.password, user.password);

    if (!match) {
      return Boom.badRequest("username and password do not match!");
    }
 
    // generate session
    const session = {
      id: uuid.v4(),
      user_id: user._id, //db id
      valid: true,
    };

    // store session id into redis server
    const redis_result = await client_set_async(
      session.id,
      JSON.stringify(session)
    );
    console.log(redis_result);

    // issue a new jwt token.
    const signed = jwt.sign(session, jwt_private_key, { expiresIn: jwt_expire });

    const data = {
      user_id: user._id,
      username: user.username,
    };
 
 
    return {
      statusCode: 200,
      message: `login was succefull!`,
      data: {
     
        user_id: user._id,
        username: user.username,

        permission: user.permission || "",

        jwt: signed,
      },
    };
  } catch (e) {
    throw Boom.badRequest(e);
  }
};
