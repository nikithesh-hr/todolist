"use strict";
exports.plugin = {
  name: "task",
  version: "1.0.0",
  register: (server, options) => {
    // routes
    server.route(require("./routes/create_task"));
    server.route(require("./routes/delete_task_by_id"));
    server.route(require("./routes/update_task"));
    server.route(require("./routes/get_task_by_date"));
    server.route(require("./routes/get_task_by_id"));
    server.route(require("./routes/get_task_by_username"));
     
    server.route(require("./routes/get_task_by_status"));
  },
};
