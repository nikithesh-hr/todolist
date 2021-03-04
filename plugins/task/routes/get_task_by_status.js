"use strict";

module.exports = {
  method: "POST",
  path: "/api/gettaskbystatus",
  options: {
    tags: ["api"],
    description: "get status",
    auth: "jwt",
    plugins: { hacli: false },
    validate: require("../validations/get_task_by_status"),
  },
  handler: require("../handlers/get_task_by_status"),
};
