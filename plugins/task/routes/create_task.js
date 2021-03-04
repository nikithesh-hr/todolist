"use strict";

module.exports = {
  method: "POST",
  path: "/api/createtask",
  options: {
    tags: ["api"],
    description: "create new task",
    auth: "jwt",
    plugins: { hacli: false },
    validate: require("../validations/create_task"),
  },
  handler: require("../handlers/create_task"),
};
