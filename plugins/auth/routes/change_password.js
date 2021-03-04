"use strict";

module.exports = {
  method: "POST",
  path: "/api/auth/change-password",
  options: {
    tags: ["api"],
    description: "change password",
    auth :"jwt",
    validate: require("../validations/change_password"),
  },
  handler: require("../handlers/change_password"),
};
