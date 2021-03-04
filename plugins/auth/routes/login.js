"use strict";

module.exports = {
  method: "POST",
  path: "/api/auth/login",
  options: {
    tags: ["api"],
    description: "login",
    auth: false,
    validate: require("../validations/login"),
  },
  handler: require("../handlers/login"),
};
