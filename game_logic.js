'use strict';

//TTT board as an array.
var ttt_board =
  [null, null, null,
   null, null, null,
   null, null, null];

//Game State.
var myApp = {
  token: '',
  currentGame: {},
  board: [],
  id: '',
  nextMove: 'X',
};

//Functions to calculate winner.
var three_X = function(){ //tests if there are three X's in a row.
  if ((ttt_board[0]==='X' && ttt_board[1]==='X' && ttt_board[2]==='X')||
     (ttt_board[3]==='X' && ttt_board[4]==='X' && ttt_board[5]==='X')||
     (ttt_board[6]==='X' && ttt_board[7]==='X' && ttt_board[8]==='X')||
     (ttt_board[0]==='X' && ttt_board[3]==='X' && ttt_board[6]==='X')||
     (ttt_board[1]==='X' && ttt_board[4]==='X' && ttt_board[7]==='X')||
     (ttt_board[2]==='X' && ttt_board[5]==='X' && ttt_board[8]==='X')||
     (ttt_board[0]==='X' && ttt_board[4]==='X' && ttt_board[8]==='X')||
     (ttt_board[2]==='X' && ttt_board[4]==='X' && ttt_board[6]==='X')
    ){return true;
  }else return false;
};
var three_O = function(){ //tests if there are three O's in a row.
  if ((ttt_board[0]==='O' && ttt_board[1]==='O' && ttt_board[2]==='O')||
     (ttt_board[3]==='O' && ttt_board[4]==='O' && ttt_board[5]==='O')||
     (ttt_board[6]==='O' && ttt_board[7]==='O' && ttt_board[8]==='X')||
     (ttt_board[0]==='O' && ttt_board[3]==='O' && ttt_board[6]==='O')||
     (ttt_board[1]==='O' && ttt_board[4]==='O' && ttt_board[7]==='O')||
     (ttt_board[2]==='O' && ttt_board[5]==='O' && ttt_board[8]==='O')||
     (ttt_board[0]==='O' && ttt_board[4]==='O' && ttt_board[8]==='O')||
     (ttt_board[2]==='O' && ttt_board[4]==='O' && ttt_board[6]==='O')
    ){return true;
  }else return false;
};
var fullBoard = function(){ //returns true if board is full
  if ((ttt_board[0]!==null && ttt_board[1]!==null && ttt_board[2]!==null && ttt_board[3]!==null && ttt_board[4]!==null && ttt_board[5]!==null && ttt_board[6]!==null && ttt_board[7]!==null && ttt_board[8]!==null)){
    return true;
  }
};
var getWinner = function (){ //returns 'X', 'O', or undefined.
  if(three_X()===true){
    return 'X';
  }else if (three_O()===true){
    return 'O';
  }
};
var determineTie = function(){ //returns 'tie' or undefined.
  if (fullBoard() === true && getWinner() !== true){
    return 'tie';
  }
};
var reset = function(){
  for (var i=0; i<9; i++){
    ttt_board[i] = null;
    $("#box."+[i]).html('');
  }
};
var winsX = 0;
var winsO = 0;
$("#player_x").html(winsX);
$("#player_o").html(winsO);
//Function to alternate between return of X and O, based on counter.
var counter = 0;
var xAndO = function(){
  if (counter%2===0){
    return 'X';
  }else return 'O';
};

var myAppTottt_boardSync = function (){//syncs ttt_board with myApp.board
  for(var i = 0; i<9; i++){
    if (myApp.board[i] !== ""){
      ttt_board[i] = myApp.board[i];
    }
  }
};
var endOfGameFunctions = function (){
  if (getWinner()){
    alert(getWinner() + ' wins! ' + 'Start a new game.');
    if (getWinner()==='X'){
      winsX++;
      $("#player_x").html(winsX);
    }else {
      winsO++;
      $("#player_o").html(winsO);
    }
  }else if (determineTie()){
    alert ('Its a tie. Play again');
  };
};

//callback function for markCell, which updates myApp.currentGame
var updateBoard = function callback(error, data) {
  if (error) {
    console.error(error);
    return;
  }
  myApp.currentGame = data.game;
  myApp.board = data.game.cells;
  myAppTottt_boardSync();
};

//Handler that appends X or O to box clicked.
//if div.box clicked is empty, append X, otherwise do nothing.
var setXO = function setXO(){
  var $this = $(this);
  if ($this.html()!== 'X' && $this.html()!=='O'){
    $this.append(xAndO());
  //update object ttt_board once div box has been clicked.
    ttt_board[$this.attr('class')]= xAndO();
  //update server
    tttapi.markCell(myApp.id, {
       "game": {
         "cell": {
           "index": $this.attr('class'),
           "value": xAndO()
         },
         "over": false
       }
     }, myApp.token, updateBoard);
  //increment counter so that var xAndO will return a different value the next time it's called.
    counter++;
    myApp.nextMove = xAndO;
    $(".whoseMove").html(myApp.nextMove());
  };
  endOfGameFunctions();
};

