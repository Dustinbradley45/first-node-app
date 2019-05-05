const http = require("http");

// custom file
const routes = require("./routes");

// REQUEST LISTENER everytime a response or request happens run this code
const server = http.createServer(routes);

// QUITS SERVER
// process.exit();
// node will keep this running to listen for incoming requests
server.listen(3000);
// look for this function and run for all requests and responses



