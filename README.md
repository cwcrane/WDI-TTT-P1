# WDI-TTT-P1
Project 1: Tick Tack Toe game

This App uses a basic html/css layout, with Javascript runnning the game logic. The JS is broken up into 5 main files:
1. game_logic.js contains the backbone array and functions of the app, including the ttt_board array, the myApp object (stores current state of the game), and several functions used to determine the winner, clear the board, update html when changes have been made, etc.
2. clickhandler.js contains all clickhandler functions which contain commands run when the user makes a move in the game or clicks another button.
3. ajax.js contains all ajax calls to the server, to login, sync the state of the game, etc.
4. gameWatcher.js contains the function used to update the game in real time for multi-player games on different computers.
5. jquery.js

My general strategy in the app was to build the layout first, based on how a user might want to see the board. Then I built the basic game logic functions based on if I were to be playing locally on one computer. Then I built in the ajax calls to the server. And finally, built in functionality so two people could play on different computers.

I believe I could use improvement in shortening my code, and not repeating certain parts. For example, I have two things which both track the state of the game board (one array and one object)...I really only need one. If I had more time, I would build in waiting messages for the multi-device version, and also make the process of setting up two player games easier, by automatically running gamewatcher behind the scenes, without requiring the users to first click the button.
