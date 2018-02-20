// This will track a log file given configurable params

const fs = require('fs');
const readline = require('readline');

function TrackLogFile(filePath, timeSpanInDays, lineToken) {
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
                        console.log(message);
                    }
                }
            });
        }
    });
}

function ProcessLine(line, lineToken, timeSpanInDays) {
    // The date is the first part of the log
    var lineDate = new Date(line.split(" ", 1));
    var message = "";
    if(IsLogMessageInRange(timeSpanInDays, lineDate)) {
        message = line.substring(line.indexOf(lineToken), line.length);
    }
    return message;
}

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

// Test
const TestInputFilePath = 'C:\\Program Files (x86)\\Grinding Gear Games\\Path of Exile\\logs\\Client.txt';
TrackLogFile(TestInputFilePath, 5, "#");