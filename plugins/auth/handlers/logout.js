"use strict";

const Boom = require("@hapi/boom");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const redis_client = require("../../../utils/redis_client");
const client_set_async = promisify(redis_client.set).bind(redis_client);
const client_get_async = promisify(redis_client.get).bind(redis_client);


const jwt_private_key = require("../../../util/config");
 
module.exports = async (request, h) => {
  const {
    auth: { token },
  } = request;

  try {
    // decode jwt token.
    const decoded = jwt.decode(token, jwt_private_key);

    // get session info from redis.
    const redis_result = await client_get_async(decoded.id);

    // parse session info.
    const session = JSON.parse(redis_result);

    // mark session invalid
    session.valid = false;
    session.ended = new Date().getTime();

    // set session info into redis.
    await client_set_async(decoded.id, JSON.stringify(session));

    return {
      statusCode: 200,
      message: `logged out!`,
    };
  } catch (e) {
    throw Boom.badRequest(e);
  }
};
