"use strict";

const Boom = require("@hapi/boom");
const Users = require("../schemas/users");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const redis_client = require("../../../utils/redis_client");

const client_set_async = promisify(redis_client.set).bind(redis_client);

const jwt_private_key = require("../../../util/config");
const jwt_expire = require("../../../util/jwt_expire");







module.exports = async (request, h) => {
  const { payload } = request;

  try {
    const is_username_exists = await Users.findOne({
      username: payload.username,
    });
    if (is_username_exists) {
      return Boom.badRequest("username already exists!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(payload.password, salt);

    const data = Object.assign({}, payload, {
      password: hash,
    });

    const user = await Users.create(data);

    if (!user) {
      return Boom.badRequest("user creation failed!");
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
    const signed = jwt.sign(session, jwt_private_key);
    return {
      statusCode: 201,
      message: `user is created`,
      data :{
        jwt :signed,
      }
    };
  } catch (e) {

    throw Boom.badRequest(e);
  }
};
