"use strict";

module.exports = {
  method: "DELETE",
  path: "/api/deletetask/{id}",
  options: {
    tags: ["api"],
    description: "eddit_taskdetails",
    auth: "jwt",
    plugins: { hacli: false },
    validate: require("../validations/delete_task_by_id"),
  },
  handler: require("../handlers/delete_task_by_id"),
};
