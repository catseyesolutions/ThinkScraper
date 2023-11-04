const express = require("express");
const http = require("http");
const WebSocket = require("ws");
var Pusher = require("pusher");

const { scrapeLogic } = require("./scrapeLogic");
const app = express();

const server = http.createServer(app);
server.timeout = 2000;

const PORT = process.env.PORT || 3000;

app.get("/scrape", (req, res) => {
  scrapeLogic(res, req);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server: server });

wss.on('connection', (ws) => {
   ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.get("/update", (req, res) => {
  const pusher = new Pusher({
    appId: "1682129",
    key: "ab6eacbc1743d9302ed1",
    secret: "6efc66acc7a7572fbada",
    cluster: "eu",
  });
  
  pusher.trigger("update", "update", {
    message: "update"
  });
  
  res.json({
    success: true
  });
  
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
