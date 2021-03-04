"use strict";

module.exports = {
  method: "POST",
  path: "/api/users",
  options: {
    tags: ["api"],
    description: "create a new user",
    validate: require("../validations/add_user"),
  },
  handler: require("../handlers/add_user"),
};
