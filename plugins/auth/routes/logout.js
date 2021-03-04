"use strict";

module.exports = {
  method: "GET",
  path: "/api/auth/logout",
  options: {
    tags: ["api"],
    description: "logout",
    auth: "jwt",
  },
  handler: require("../handlers/logout"),
};
