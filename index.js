const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require('cors')
const { scrapeLogic } = require("./scrapeLogic");
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  scrapeLogic(res, req);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

//initialize the WebSocket server instance
app.use(cors())

const verifyClient = (info) => {
  console.log('ding dong')
  return true
}

const wss = new WebSocket.Server({ server, verifyClient });

wss.on('connection', (ws) => {
   ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
