var httpProxy = require("http-proxy");
var fs = require("fs");

// read config from file
var config = require("./proxy-settings.json");

var serverKey = fs.readFileSync("./server.key");
var servercert = fs.readFileSync("./server.cert");

// create proxy server
httpProxy
  .createServer({
    target: {
      host: config.httpTarget,
      port: config.httpPort,
    },
    ssl: {
      key: serverKey,
      cert: servercert,
    },
  })
  .listen(config.proxyPort);

console.log(
  `Listening https on port ${config.proxyPort} (proxy server to http://${config.httpTarget}:${config.httpPort})...`
);
