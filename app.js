//1. Define TTT board as an object.
//2. 'getWinner' function to determine if there a winner.
//3. 'getWinner' will need two callback functions 'three_X' and 'three_O', to determine whether X or O have three in a row yet.
//4. create eventhandler for clicks on any box; handler should set the corresponding value in the ttt-board object to x.


//1. Define TTT board as an object.
var ttt_board = {
  one: null;
  two: null;
  three: null;
  four: null;
  five: null;
  six: null;
  seven: null;
  eight: null;
  nine: null;
};
//2-3. Functions to calculate winner.
var three_X = function(){};
var three_O = function(){};
var getWinner = function getWinner(three_X, three_O){};

//4. create eventhandler for clicks on any box; handler should set the corresponding value in the ttt-board object to x.
var setX = function setX(){
  ///set ttt_board value to X
  var $this = $(this);
  $this.append('X');
};

$(".box").on('click', setX);
