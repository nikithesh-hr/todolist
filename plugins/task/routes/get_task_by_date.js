"use strict";

module.exports = {
  method: "POST",
  path: "/api/gettaskbydate",
  options: {
    tags: ["api"],
    description: "get task",
    auth: "jwt",
    plugins: { hacli: false },
    validate: require("../validations/get_task_by_date"),
  },
  handler: require("../handlers/get_task_by_date"),
};
