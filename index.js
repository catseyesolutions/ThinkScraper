const express = require("express");
const http = require("http");
const cors = require("cors");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5000;

app.use(cors);

app.get("/scrape", (req, res) => {
  scrapeLogic(res, req);
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  io.emit('update','test');
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
