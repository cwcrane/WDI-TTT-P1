'use strict';

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

$(document).ready(
  $(function() {
    var form2object = function(form) { //returns data entered in form, as an object
      var data = {};
      $(form).children().each(function(index, element) {
        var type = $(this).attr('type');
        if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
          data[$(this).attr('name')] = $(this).val();
        }
      });
      return data;
    };
    var wrap = function wrap(root, formData) {
      var wrapper = {};
      wrapper[root] = formData;
      return wrapper;
    };
    var callback = function callback(error, data) { //either returns an error or $(#result)
      if (error) {
        console.error(error);
        $('#result').val('status: ' + error.status + ', error: ' +error.error);
        return;
      }
      $('#result').val(JSON.stringify(data, null, 4));
    };

  ////////////////CLICK HANDLERS///////////////
    $('#register').on('submit', function(e) {
      var credentials = wrap('credentials', form2object(this));
      tttapi.register(credentials, callback);
      e.preventDefault();
    });

    $('#login').on('submit', function(e) {
      var credentials = wrap('credentials', form2object(this));
      // {'credentials': {'email':'', 'password': ''}}
      var cb = function cb(error, data) {
        //console.log("Error: " + error);
        //console.log("Data: " + data);
        if (error) {
          callback(error);
          return;
        }
        console.log(data.user.token);
        myApp.token = data.user.token;
      };
      e.preventDefault();
      tttapi.login(credentials, cb); //when #login button is clicked, tttapi.login is run. This runs an ajax call, using credentials input by user. ajax call then runs cb. cb is a function which takes the data returned by server, and sets data.user.token to myApp.token.
    });

    $('#list-games').on('submit', function(e) {
      var token = $(this).children('[name="token"]').val();
      e.preventDefault();
      tttapi.listGames(token, callback);
    });

    $('#create-game').on('submit', function(e) {
      // var token = $(this).children('[name="token"]').val();
      e.preventDefault();
      tttapi.createGame(myApp.token, function(err, data){ //ajax is using this callback, and setting data argument
        myApp.currentGame = data.game;
        myApp.id = data.game.id;
        myApp.board = data.game.cells;
        console.log(myApp.id);
        console.log(myApp.currentGame);
      });
    });

    $('#show-game').on('submit', function(e) {
      var token = $(this).children('[name="token"]').val();
      var id = $('#show-id').val();
      e.preventDefault();
      tttapi.showGame(id, token, callback);
    });

    $('#join-game').on('submit', function(e) {
      var token = $(this).children('[name="token"]').val();
      var id = $('#join-id').val();
      e.preventDefault();
      tttapi.joinGame(id, token, callback);
    });

    $('#mark-cell').on('submit', function(e) {
      var token = $(this).children('[name="token"]').val();
      var id = $('#mark-id').val();
      var data = wrap('game', wrap('cell', form2object(this)));
      e.preventDefault();
      tttapi.markCell(id, data, token, callback);
    });

    $('#watch-game').on('submit', function(e){
      var token = $(this).children('[name="token"]').val();
      var id = $('#watch-id').val();
      e.preventDefault();

      var gameWatcher = tttapi.watchGame(id, token);

      gameWatcher.on('change', function(data){
        var parsedData = JSON.parse(data);
        if (data.timeout) { //not an error
          this.gameWatcher.close();
          return console.warn(data.timeout);
        }
        var gameData = parsedData.game;
        var cell = gameData.cell;
        $('#watch-index').val(cell.index);
        $('#watch-value').val(cell.value);
      });
      gameWatcher.on('error', function(e){
        console.error('an error has occured with the stream', e);
      });
    });

  })
);