"use strict";

const redis_options = {};

if (process.env.NODE_ENV === "heroku") {
  redis_options.url = process.env.REDIS_URL;
}

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "production") {
  redis_options.host = process.env.REDIS_HOST || "127.0.0.1";
  redis_options.port = process.env.REDIS_PORT || "6379";
}

const redis_client = require("redis").createClient(redis_options);

module.exports = redis_client;
