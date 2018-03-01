# Poe Chat Tracker
The Poe Chat Notification system is a simple, lightweight server application that monitors the Client.txt file for 
in-game chat messages. The initial purpose of the app is to be able to see trade whispers on a mobile phone while 
you are AFK, but with configuration options, there can be more uses. 

This app was designed to be used from a mobile phone, so in order to make it compatible with most phones without 
the need for writing the code multiple times, it was decided that hosting it as a web page would be most efficient. 

### Prerequisites

Node.js is required to run the server. 
It can be found here: https://nodejs.org/en/

A browser is required to view the data. (Mobile is the expected platform)

### Installing

The application runs a lightweight Node.js server that monitors chat records in the <game root dir>/logs/Client.txt file. 
1. Download and extract the contents to a folder wherever is most convenient for you.
2. Find the path to that file on your system
3. Open the StartServer.vbs file and change \<YOUR SYSTEM PATH TO LOG FILE\> to your local path to the file

Optional:

4. It's easiest to create a shortcut of the file to your desktop, or somewhere easy to find. 
5. It could also be configured to run automatically using the start programs within windows

Finally, just double click the StartServer.vbs file 

NOTE: To shut down the server, you must open the task manager and stop the node.js task

Now, find the IP address of the system where the game lives. Plug that address into a browser, using the port 9001. 

example: http://192.168.123.55:9001

(The port can be changed in the code if there is an issue with 9001)

![Screen shot](https://github.com/furykid/ChatTrack/blob/master/PoeChatTrack_Screenshot.jpg "Mobile Screenshot")

## Known Issues

Trade chat will not filter properly. I will fix it if there is a need, otherwise I will probably leave it.

## Contributing

Feel free to change anything and modify all you like. Please email or message if you come up with some ideas to make it better. 

## Authors

Psychase - *Initial work* - [Psychase](https://github.com/furykid)
