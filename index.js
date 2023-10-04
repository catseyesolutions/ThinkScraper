const express = require("express");
const http = require("http");
const WebSocketServer = require("ws");

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
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {

   console.log('established');

    //connection is up
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
