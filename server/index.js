"use strict";

const Glue = require("@hapi/glue");
const mongoose = require("mongoose");
const manifest = require("./manifest");

mongoose.Promise = require("bluebird");

exports.deployment = async (start) => {
  try {
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    await server.initialize();

    if (!start) {
      return server;
    }

    await server.start();

    console.log(`Server started at ${server.info.uri}`);

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    return server;
  } catch (e) {
    console.log(e);
  }
};

if (!module.parent) {
  exports.deployment(true);

  process.on("unhandledRejection", (err) => {
    throw err;
  });
}
