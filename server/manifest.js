"use strict";



try {
  const Inert = require("@hapi/inert");

  const Vision = require("@hapi/vision");

  const HapiSwagger = require("hapi-swagger");

  //used for api documentation

  const task = require("../plugins/task");
  const users = require("../plugins/users");
  const auth = require("../plugins/auth");


  const version = "1";
  module.exports = {
    server: {
      app: {},
      port: process.env.PORT || 3004,
      routes: {
        cors: {
          origin: ["*"], // an array of origins
          credentials: true
/*CORS is required by web applications running 
inside a browser which are loaded from a different domain than the API server.           
*/

        },
      },
      debug: {
        log: ["error"],
        request: ["error"],
      },
    },
    register: {
      plugins: [
        Inert,
        Vision,
        {
          plugin: HapiSwagger,
          options: {
            info: {
              title: `Todolist ${version}`,
              version,
            },
            pathPrefixSize: 2,
            basePath: "/api",
            securityDefinitions: {
              Bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
                "x-keyPrefix": "Bearer",
              },
            },
            security: [{ Bearer: [] }],
          },
        },
 
        {
          plugin: auth,
        },
        {
          plugin:users ,
        },
        {
          plugin: task,
        },
        
      ],
    },
  };
} catch (e) {
  console.log("manifest err ", e);
} finally {
  console.log("manifest loaded!");
}
