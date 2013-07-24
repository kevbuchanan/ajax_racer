function Player(name){
  this.name = name,
  this.currentPosition = 1,
  this.move = function(){
    currentPosition ++;
  },
  this.finished = currentPosition == 38
}

function Game(player1, player2){
  this.player1 = player1,
  this.player2 = player2,
  this.status = 'in progress',
  this.startTime = new Date(year, month, day, hours, minutes, seconds, milliseconds),
  this.endTime = null,
  this.winner = null,
  this.finished = this.player1.finished || this.player2.finished,
  this.end = function(winner){
    $(document).off('keyup', monitorKeys());
    this.winner = winner;
    this.endTime = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    $.post('/finished', {winner: winner}, function(response){
      $('.container').append(response);
    });
  }
}


function update_player_position(player) {
  var row = $("#"+ player + "_track");
  var newposition = row.find('.active').next();
  row.find('td').removeClass('active');
  newposition.addClass('active');
};

function lights(){
  $('#red').fadeTo(1000, 0.3);
  $('#yellow').delay(500).fadeTo(1000, 1.0);
  $('#yellow').fadeTo(1000, 0.3);
  $('#green').delay(2000).fadeTo(1000, 1.0);
};

var monitorKeys = function(game){
  $(document).keyup(function(key){
    if (key.keyCode == 65) {
      update_player_position('player1');
      game.player1.move;
      if game.player1.finished { game.end(player1) };
    }
    else if (key.keyCode == 76) {
      update_player_position('player2');
      game.player2.move;
      if game.player2.finished { game.end(player2) };
    }
  });
};


$(document).ready(function() {
  $('#start').hide();

  var players = []


  $('.new-player').on('submit', function(event){
    event.preventDefault();
    event.stopPropagation();
    var button = $(this).find('.btn')
    var data = $(this).serialize();
    
    var player = new Player(data.name);
    players.push(player);
    button.replaceWith("<p class='ready'>"+ player.name +" is ready to race!</p>");
    players ++;

    if (players.length == 2) {
      $('#player-setup').replaceWith($('#start'));
      $('#start').show();
      
      $('#start').on('click', function(event){
        event.preventDefault();
        lights();
        window.setTimeout(function(){
          var game = Game.new(players[0], players[1])
          monitorKeys(game);
        }, 2300);
      });
    };
  });
});
