' Add the path of the Client.txt file here
Dim clientFilePath
clientFilePath = "<YOUR SYSTEM PATH TO LOG FILE>\Client.txt"

CreateObject("Wscript.Shell").Run "node PoeChatTrackServer.js " & clientFilePath, 0