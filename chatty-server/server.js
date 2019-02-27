// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


let idcounter = 3;

// Create the WebSockets server
const wss = new SocketServer({ server });

function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  let upcount = {};
  upcount.content = '+';
  console.log(wss.clients.size);
  console.log(wss.clients.length);
  upcount.count = wss.clients.size;
  upcount.type = 'incomingCount';
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(upcount));
  });

  ws.on('message', function incoming(data) {
    console.log(data);
    let msg = JSON.parse(data);
    msg.id = uuidv4();
    console.log('logging message:');
    console.log(msg.id);
    console.log(msg);
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(msg));
      // if (client.readyState === SocketServer.OPEN) {
      //   console.log('sending!');
      //   client.send(data);
      // }
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    let downcount = {};
    downcount.content = '-';
    downcount.count = wss.clients.size;
    downcount.type = 'incomingCount';
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(downcount));
    });
    // At this point in time wss.clients no longer contains the ws object
    // of the client who disconnected
  });
});
