"use strict";

const { promisify } = require("util");
const HapiAuthJwt2 = require("hapi-auth-jwt2");

const redis_client = require("../../utils/redis_client");

const client_get_async = promisify(redis_client.get).bind(redis_client);
const jwt_private_key = require("../../util/config");

const Users = require("../users/schemas/users");

//doubt
const validate = async function (decoded, response, h) {
  try {
    console.log("function called");
   
    const redis_reply = await client_get_async(decoded.id);
    if (!redis_reply) {
      return { isValid: false };
    }

  
    const session = JSON.parse(redis_reply);

    // check if the session is valid or not.
    if (session.valid === true) {
      const result = await Users.findOne({ _id: session.user_id });
      if (!result) {
        return { isValid: false };
      }

      // set credentials info.
      return {
        isValid: true,
        credentials: Object.assign(
          {},
          {
            current_user: {
              id: result._id,
              name: result.username,
            },
            permission: result.permission || "user",
          }
        ),
      };
    }

    return { isValid: false };
  } catch (e) {
    console.log("validate function err ", e);
  }
};

exports.plugin = {
  name: "auth",
  version: "1.0.0",
  register: (server, options) => {
    server.register(HapiAuthJwt2);
    server.auth.strategy("jwt", "jwt", {
      key: jwt_private_key,
      validate,
      verifyOptions: { algorithms: ["HS256"] },
    });
    // routes
    server.route(require("./routes/login"));
    server.route(require("./routes/logout"));

   
    server.route(require("./routes/change_password"));
  },
};
/*

*/
