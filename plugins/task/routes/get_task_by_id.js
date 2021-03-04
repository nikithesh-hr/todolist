"use strict";

module.exports = {
  method: "POST",
  path: "/api/get_task_by_id/{id}",
  options: {
    tags: ["api"],
    description: "get_task_by_id",
    auth: "jwt",
    plugins: { hacli: false }, 
    validate: require("../validations/get_task_by_id"),
  },
  handler: require("../handlers/get_task_by_id"),
};
