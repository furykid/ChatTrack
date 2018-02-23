// This will track a path of exile log file with configurable params
// Author: Psychase

const fs = require('fs');
const readline = require('readline');
const events = require('events');

var LogLineEmitter = new events.EventEmitter();
module.exports = LogLineEmitter;

/*
Tracks a poe client.txt file for chat updates. Currently the public API only 
supports tracking league info and public stash tabs. 

Params:
    filePath: file path
    timeSpanInDays: Count in days to filter messages
    lineToken: Poe chat line delimeter
    # = public chat
    @ = guild chat
    $ = trade chat
*/
module.exports.TrackLogFile = function(filePath, timeSpanInDays, lineToken) {
    fs.watch(filePath, { encoding: 'buffer' }, (eventType, filename) => {
        if (filename && eventType == "change") {
            const rl = readline.createInterface({
                input: fs.createReadStream(filePath),
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                if(line.search(lineToken) > 0) {
                    var message = ProcessLine(line, lineToken, timeSpanInDays);
                    if(message) {
                        LogLineEmitter.emit('new_log', message);
                    }
                }
            });
        }
    });
}

/*
Processes a line of log text. The date is extracted and tested
against the time span param. 

Return: Returns blank string if the message is out of range.

Params:
    line: Whole log file text line
    timeSpanInDays: Count in days to filter messages
    lineToken: Poe chat line delimeter
    # = public chat
    @ = guild chat
    $ = trade chat
*/
function ProcessLine(line, lineToken, timeSpanInDays) {
    // The date is the first part of the log
    var lineDate = new Date(line.split(" ", 1));
    var message = "";
    if(IsLogMessageInRange(timeSpanInDays, lineDate)) {
        message = line.substring(line.indexOf(lineToken), line.length);
    }
    return message;
}

/*
Tests if log message is in specified range. 

Return: Returns blank string if the message is out of range.

Params:
    timeSpanInDays: Count in days to filter message
    lineDate: Date the log message was captured
*/
function IsLogMessageInRange(timeSpanInDays, lineDate) {
    var bReturnVal = false;
    var DateNow = new Date();
    var DateDelta = new Date();
    DateDelta.setDate(DateNow.getDate() - timeSpanInDays);

    // We only need to test the time
    if(lineDate.getTime() > DateDelta.getTime()) {
        bReturnVal = true;
    }
    return bReturnVal;
}