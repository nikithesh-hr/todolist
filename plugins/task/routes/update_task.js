"use strict";

module.exports = {
  method: "PATCH",
  path: "/api/updatetask/{id}",
  options: {
    tags: ["api"],
    description: "update task",
    auth: "jwt",
    plugins: { hacli: false },
    validate: require("../validations/update_task"),
  },
  handler: require("../handlers/update_task"),
};
