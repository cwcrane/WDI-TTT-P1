//note: seperation of concerns.
//
//After each move, update the server. PATCH. /games/:id
//...when move is made, setXO function will also trigger a PATCH to the server, to update a particular game
//figure out how to test if ajax patch worked.
//create player 1 and player 2 objects, based on api. Will need to access their tokens.

//Define TTT board as an array.
var ttt_board =
  [null, null, null,
   null, null, null,
   null, null, null];

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

var getWinner = function(){ //returns 'X', 'O', or undefined.
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
var clearBoard = function(){
  for (var i=0; i<9; i++){
    ttt_board[i] = null;
    $("#box."+[i]).html('');
  }
};

//Function to alternate between return of X and O, based on counter.
var counter = 0;
var xAndO = function(){
  if (counter%2===0){
    return 'X';
  }else return 'O';
};

//Handler that appends X or O to box clicked.
//if div.box clicked is empty, append X, otherwise do nothing.
var setXO = function setXO(){
  var $this = $(this);
  if ($this.html()!== 'X' && $this.html()!=='O'){
    $this.append(xAndO());
  //update object ttt_board once div box has been clicked.
    ttt_board[$this.attr('class')]= xAndO();
  //increment counter so that var xAndO will return a different value the next time it's called.
    counter++;
  };
  if (getWinner()){
    alert( getWinner() + ' wins! ' + 'Start a new game.');
  }else if (determineTie()){
    alert ('Its a tie. Play again');
  };
};
//tttapi.markCell($this.id, {
//   "game": {
//     "cell": {
//       "index": 0, //pull in div clicked
//       "value": "x" //pull in x or o.
//     },
//     "over": false
//   }
// }, $this.token, callback)
// };

$(".0").on('click', setXO);
$(".1").on('click', setXO);
$(".2").on('click', setXO);
$(".3").on('click', setXO);
$(".4").on('click', setXO);
$(".5").on('click', setXO);
$(".6").on('click', setXO);
$(".7").on('click', setXO);
$(".8").on('click', setXO);
$("#clear-board").on('submit', clearBoard);
