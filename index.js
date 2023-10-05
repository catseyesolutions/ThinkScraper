const express = require("express");
const http = require("http");
const cors = require("cors");
const WebSocket = require("ws");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors);

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

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

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
