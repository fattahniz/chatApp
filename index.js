const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// socket.io server setup
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("a user connected:", socket.id);
    console.log("message: " + msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
