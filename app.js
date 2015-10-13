//1. Define TTT board as an object.
//2. 'getWinner' function to determine if there a winner.
//3. 'getWinner' will need two callback functions 'three_X' and 'three_O', to determine whether X or O have three in a row yet.
//4. create eventhandler for clicks on any box; handler should set the corresponding value in the ttt-board object to x.
//5. Game logic: who goes first. Alternate turns. Stop when there's a winner.


//1. Define TTT board as an object.
var ttt_board = {
  one: null,
  two: null,
  three: null,
  four: null,
  five: null,
  six: null,
  seven: null,
  eight: null,
  nine: null,
};
//2-3. Functions to calculate winner.
var three_X = function(){};
var three_O = function(){};
var getWinner = function getWinner(three_X, three_O){};

//4. handler that appends X to box clicked.
var setX = function setX(){
  //if div.box clicked is empty, append X, otherwise do nothing.
  var $this = $(this);
  if ($this.html()!== 'X'){
    $this.append('X');
  };
  //update object ttt_board once div box has been clicked.
  //take div box number that was clicked, and update the correcpsonging key with the value of X or O.
  //$this.attr('class') --> returns the value of the class, of the div that was clicked.
  ttt_board[$this.attr('class')]='X';
  console.log(ttt_board);
};


$(".one").on('click', setX);
$(".two").on('click', setX);
$(".three").on('click', setX);
$(".four").on('click', setX);
$(".five").on('click', setX);
$(".six").on('click', setX);
$(".seven").on('click', setX);
$(".eight").on('click', setX);
$(".nine").on('click', setX);
