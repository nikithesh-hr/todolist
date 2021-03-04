"use strict";

exports.plugin = {
  name: "users",
  version: "1.0.0",
  register: (server, options) => {
    // routes
    // server.route(require('./routes/get_users'));
    server.route(require("./routes/add_user"));
    //server.route(require('./routes/add_superuser'));
    // server.route(require('./routes/edit_user'));
    // server.route(require('./routes/remove_user'));
  },
};
