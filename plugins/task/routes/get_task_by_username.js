"use strict";

module.exports = {
  method: "POST",
  path: "/api/gettaskbyusername",
  options: {
    tags: ["api"],
    description: "get by username",
    //auth: "jwt",
    plugins: { hacli: false },
    validate: require("../validations/get_task_by_username"),
  },
  handler: require("../handlers/get_task_by_username"),
};
