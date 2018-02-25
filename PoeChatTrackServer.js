// Server to host log file changes
// Author: Psychase

const app = require('express')();  
const server = require('http').Server(app);  
const io = require('socket.io')(server);
//const events = require('events');
//const LogFileTracker = require('./TrackLogFile');

//var NewLineEmitter = new events.EventEmitter();
// List to make sure we don't rewrite messages
// and reduce chatter.
//var chatList = [];
/*
LogFileTracker.on('new_log', (message) => {
    if(!chatList.includes(message)){
        chatList.push(message);
        NewLineEmitter.emit('list_update', message);
    }
});
*/

app.get('/', (req, res) => {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(8000);

io.on('connection', (socket) => {  
    socket.emit('announcements', { message: 'A new user has joined!' });
});

//http.createServer(function(req, res){
    /*handleRequest(req);
    fs.exists(indexFilePath, function (exist) {
        if(!exist) {
          // if the file is not found, return 404
          res.statusCode = 404;
          res.end(`File ${pathname} not found!`);
          return;
        }

        fs.readFile(indexFilePath, (err, data) => {
            if(err) {
                res.statusCode = 500;
                res.end('Error: ${err}')
            }
            else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        })
    });
    */
    /*
    NewLineEmitter.on('list_update', (message) => {
        res.write(buildHTMLResponse());
        //res.write('<li>' + message + '</li>' + '<br>');
    });
    */
//    res.writeHead(200, {'Content-Type': 'text/html'});
//    res.end(buildHTMLResponse());
//}).listen(8000, '192.168.1.184'); 

// Test
//const TestInputFilePath = 'C:\\Program Files (x86)\\Grinding Gear Games\\Path of Exile\\logs\\Client.txt';
//LogFileTracker.TrackLogFile(TestInputFilePath, 5, "#");

//var timeSpan = document.getElementById('timeSpanInDays').value;
//var token = document.getElementById('chatType').value;
//LogFileTracker.TrackLogFile(TestInputFilePath, timeSpan, token);