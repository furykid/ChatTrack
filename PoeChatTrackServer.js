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

app.get('/', function(req, res) {  
    res.sendFile(__dirname + '/index.html');
});
server.listen(8080);

var mainSocket;
io.on('connect', (socket) => {  
    mainSocket = socket;
});
//---------------------------------------------
//---------------------------------------------


// Handle data
//---------------------------------------------
//---------------------------------------------
io.on('sendData', (days, token) => {
    // Test
    const TestInputFilePath = 'C:\\Program Files (x86)\\Grinding Gear Games\\Path of Exile\\logs\\Client.txt';
    LogFileTracker.TrackLogFile(TestInputFilePath, days, token);
});

const events = require('events');
const LogFileTracker = require('./TrackLogFile');

var NewLineEmitter = new events.EventEmitter();

// List to make sure we don't rewrite messages
// and reduce chatter.
var chatList = [];

LogFileTracker.on('new_log', (message) => {
    if(!chatList.includes(message)){
        chatList.push(message);
        NewLineEmitter.emit('list_update', message);
    }
});

NewLineEmitter.on('list_update', (message) => {
    if(mainSocket){
        mainSocket.emit('event', message);
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