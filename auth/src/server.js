const http = require("node:http");
const { AppServer } = require("./app");
const { _env } = require("./lib/env");

const server = http.createServer(AppServer);

if (_env.NODE_ENV != "test") {
  try {
    server.listen(_env.PORT, () => {
      console.log(`Listening at port ${_env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}
