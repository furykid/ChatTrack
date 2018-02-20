// Main

const fs = require('fs');
const readline = require('readline');

// Variable definitions
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
var InputFilePath = 'C:\\Program Files (x86)\\Grinding Gear Games\\Path of Exile\\logs\\Client.txt';
var StartTime = new Date();
var TimeDelta = new Date().setDate(StartTime.getDate() - 4);
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------



// Function Definitions
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
function GetMessagesInTimeDelta() {

}
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------



// Main 

// Monitor the Client.txt file for changes
fs.watch(InputFilePath, { encoding: 'buffer' }, (eventType, filename) => {
    if (filename) {
        const rl = readline.createInterface({
            input: fs.createReadStream(InputFilePath),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            if(line.search("#") > 0) {

                // The date is the first part of the log
                var lineDate = new Date(line.split(" ", 1));

                // Get a range of dates to test against. 
                var DateNow = new Date();
                var DateDelta = new Date();
                DateDelta.setDate(DateNow.getDate() - 40);

                // We only need to test the time
                if(lineDate.getTime() > DateDelta.getTime()) {
                    console.log(`log date: ${lineDate} -- Date Delta: ${DateDelta} `);
                }
            }
          });
    }
});