// Server to host log file changes
// Author: Psychase


// Server Setup
//---------------------------------------------
//---------------------------------------------
var express = require('express')
  , http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.get('/', (req, res) => {  
    res.sendFile(__dirname + '/index.html');
});
server.listen(9001);
//---------------------------------------------
//---------------------------------------------


// Handle data
//---------------------------------------------
//---------------------------------------------
const events = require('events');
const LogFileTracker = require('./TrackLogFile');

// Get filepath from cmd arg
const clientFilePath = process.argv[2];

// List to make sure we don't rewrite messages
// and reduce chatter.
var chatList = [];

// Keeps track of multiple connected clients
var clientList = [];

io.on('connect', (socket) => {  
    clientList.push(socket);

    // Each client get's thier own instance
    socket.on('newParams', (data) => {
        // Clear list
        chatList = [];

        // Init and start tracking log
        LogFileTracker.TrackLogFile(clientFilePath, data.days, data.chatType);
    });
});

/*
    This handles individual message updates. 
    If the message doesn't exist in the list, 
    add it, and update the clients.

    NOTE: This only supports one master message list
    to multiple clients, each client does not get it's
    own message list.
*/
LogFileTracker.on('new_log', (message) => {
    if(!chatList.includes(message)){
        chatList.push(message);
        for(var i in clientList){
            clientList[i].emit('list-update', message);
        }
    }
});
//---------------------------------------------
//---------------------------------------------