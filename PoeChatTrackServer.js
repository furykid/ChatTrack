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
server.listen(8080);
//---------------------------------------------
//---------------------------------------------


// Handle data
//---------------------------------------------
//---------------------------------------------
const events = require('events');
const LogFileTracker = require('./TrackLogFile');

// List to make sure we don't rewrite messages
// and reduce chatter.
var chatList = [];
var mainSocket;

io.on('connect', (socket) => {  
    mainSocket = socket;
    mainSocket.on('newParams', (data) => {
        // First, flush the list
        mainSocket.emit('flushList');

        // Test
        const TestInputFilePath = 'C:\\Program Files (x86)\\Grinding Gear Games\\Path of Exile\\logs\\Client.txt';
        
        // Init and start tracking log
        LogFileTracker.TrackLogFile(TestInputFilePath, data.days, data.chatType);
    });
});

// This handles individual message updates. 
// If the message doesn't exist in the list, 
// add it, and update the client.
LogFileTracker.on('new_log', (message) => {
    if(!chatList.includes(message)){
        chatList.push(message);
        mainSocket.emit('list-update', message);
    }
});
//---------------------------------------------
//---------------------------------------------



// Test
//const TestInputFilePath = 'C:\\Program Files (x86)\\Grinding Gear Games\\Path of Exile\\logs\\Client.txt';
//LogFileTracker.TrackLogFile(TestInputFilePath, 5, "#");

//var timeSpan = document.getElementById('timeSpanInDays').value;
//var token = document.getElementById('chatType').value;
//LogFileTracker.TrackLogFile(TestInputFilePath, timeSpan, token);