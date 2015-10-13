//1. Define TTT board as an object.
//2. 'getWinner' function to determine if there a winner.
//3. 'getWinner' will need two callback functions 'three_X' and 'three_O', to determine whether X or O have three in a row yet.
//4. function to alternate between X and O.
//5. create eventhandler for clicks on any box; handler should set the corresponding value in the ttt-board object to x.
//6. Game logic: who goes first. Alternate turns. Stop when there's a winner.


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
var three_X = function(){
  if ((ttt_board.one==='X' && ttt_board.two==='X' && ttt_board.three==='X')||
     (ttt_board.four==='X' && ttt_board.five==='X' && ttt_board.six==='X')||
     (ttt_board.seven==='X' && ttt_board.eight==='X' && ttt_board.nine==='X')||
     (ttt_board.one==='X' && ttt_board.four==='X' && ttt_board.seven==='X')||
     (ttt_board.two==='X' && ttt_board.five==='X' && ttt_board.eight==='X')||
     (ttt_board.three==='X' && ttt_board.six==='X' && ttt_board.nine==='X')||
     (ttt_board.one==='X' && ttt_board.five==='X' && ttt_board.nine==='X')||
     (ttt_board.three==='X' && ttt_board.five==='X' && ttt_board.seven==='X')
    ){return 'true'};
}; //return true/false
var three_O = function(){};//return true/false
var getWinner = function getWinner(three_X, three_O){
  //if three_X is true, return X is winner. Vice versa.
  //run until either X or O is true.
};

//4. function to alternate between X and O.
var counter = 0;
var xAndO = function(){
  if (counter%2===0){
    return 'X';
  }else return 'O';
}

//5. handler that appends X or O to box clicked.
var setXO = function setXO(){
  //if div.box clicked is empty, append X, otherwise do nothing.
  var $this = $(this);
  if ($this.html()!== 'X' && $this.html()!=='O'){
    $this.append(xAndO());
  //update object ttt_board once div box has been clicked.
  //$this.attr('class') --> returns the value of the class, of the div that was clicked.
    ttt_board[$this.attr('class')]= xAndO();
  //increment counter so that var xAndO will return a different value the next time it's called.
    counter++;
  };
};


$(".one").on('click', setXO);
$(".two").on('click', setXO);
$(".three").on('click', setXO);
$(".four").on('click', setXO);
$(".five").on('click', setXO);
$(".six").on('click', setXO);
$(".seven").on('click', setXO);
$(".eight").on('click', setXO);
$(".nine").on('click', setXO);
