import app from '../src/app'
const http = require('http');
const port = 3030;


const server = http
  .createServer(app)
server.listen(port, () => {
  console.log("API running on port " + port);
});

module.exports = server;