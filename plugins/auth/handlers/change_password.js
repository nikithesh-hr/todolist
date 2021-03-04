"use strict";

const Boom = require("@hapi/boom");
const Users = require("../../users/schemas/users");

const uuid = require("uuid");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwt_private_key = require("../../../util/config");

const redis_client = require("../../../utils/redis_client");

const { promisify } = require("util");

const client_set_async = promisify(redis_client.set).bind(redis_client);
const client_get_async = promisify(redis_client.get).bind(redis_client);

module.exports = async (request, h) => {
  const { payload, auth : {
    credentials
  } } = request;
  const { current_user } =credentials;

  try {
    console.log(request, "request");
    const user = await Users.findOne({ _id: current_user.id });

    if (!user) {
      return Boom.badRequest("invalid user!");
    }

    const match = await bcrypt.compare(payload.old_password, user.password);

    if (!match) {
      return Boom.badRequest("password do not match!");
    }

    const query = {
      _id: current_user.id,
    };

    const options = { useFindAndModify: false, new: true };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(payload.new_password, salt);

    const update = {
      password: hash,
    };
    // update new password
    const result = await Users.findOneAndUpdate(query, update, options);

    if (!result) {
      return Boom.badRequest("Something went during change password!");
    }

    // generate session
    const session = {
      id: uuid.v4(),
      user_id: user._id,
      valid: true,
    };

    // store session id into redis server
    const redis_result = await client_set_async(
      session.id,
      JSON.stringify(session)
    );
    // console.log(redis_result);

    // issue a new jwt token.
    const signed = jwt.sign(session, jwt_private_key);

    const decoded = jwt.decode(token, jwt_private_key);

    // get session info from redis.
    const redis_old_token = await client_get_async(decoded.id);

    // parse session info.
    const old_session = JSON.parse(redis_old_token);

    // mark session invalid
    old_session.valid = false;
    old_session.ended = new Date().getTime();

    // set session info into redis.
    await client_set_async(decoded.id, JSON.stringify(old_session));

    return {
      statusCode: 200,
      message: `Password change succefull!`,
      data: {
        user_id: user._id,
        username: user.username,
        jwt: signed,
      },
    };
  } catch (e) {
    throw Boom.badRequest(e);
  }
};
