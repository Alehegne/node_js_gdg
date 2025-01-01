//creating a server in node.js
var http = require("http");
var os = require("os");
var fs = require("fs");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello World");
});

//get request
server.on("request", function (req, res) {
  if (req.method === "GET") {
    res.end("GET request");
  }
});
console.log(os.hostname());
console.log(os.type());
console.log(os.totalmem());
console.log(os.freemem());

//post request
server.on("request", function (req, res) {
  if (req.method === "POST") {
    res.end("POST request");
  }
});

//reading a file
fs.writeFile("test.txt", "Hello World", function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});

//listening on port 8080
const PORT = 8080;

server.listen(PORT, function (req, res) {
  console.log("Server is running on port 8080");
});
