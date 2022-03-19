import http from "http";
import express from "express";
import WebSocket from "ws";
const app = express();
const Port = 3000;
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () =>
  console.log(`Listening on http://localhost:${Port} ✅`);

// http에
// 동일한 포트에서 http,ws request 두 개를 다 처리할 수 있다.
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", socket => {
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("DisConnected to Browser ❌"));
  socket.on("message", message => {
    console.log(message);
  });
  socket.send("Hello!!");
});

server.listen(Port, handleListen);
