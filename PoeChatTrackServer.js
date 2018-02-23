// Server to host log file changes
// Author: Psychase

var http = require('http');
var LogFileTracker = require('./TrackLogFile');

LogFileTracker.on('new_log', (message) => {
    console.log(message);
});

// Test
const TestInputFilePath = 'C:\\Program Files (x86)\\Grinding Gear Games\\Path of Exile\\logs\\Client.txt';
LogFileTracker.TrackLogFile(TestInputFilePath, 5, "#");