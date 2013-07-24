function Player(name){
  this.name = name,
  this.currentPosition = 1,
  this.move = function(){
    currentPosition ++;
  }),
  this.finished: currentPosition == 38
}

function Game(player1, player2){
  this.player1 = player1,
  this.player2 = player2,
  this.status = 'in progress',
  this.startTime = new Date(year, month, day, hours, minutes, seconds, milliseconds);
  this.endTime = null,
  this.winner = null
  this.finished = this.player1.finished || this.player2.finished
}


function end_game(){
  $(document).off('keyup', monitorKeys());
  var winner = $('.active.finish').closest('tr').data('name');
  $.post('/finished', {winner: winner}, function(response){
    $('.container').append(response);
  });
};


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

var monitorKeys = function(){
  $(document).keyup(function(key){
    if (key.keyCode == 65) {
      update_player_position('player1');
      if ($('tr td:last-child').hasClass('active')) { end_game() };
    }
    else if (key.keyCode == 76) {
      update_player_position('player2');
      if ($('tr td:last-child').hasClass('active')) { end_game() };
    }
  });
};


$(document).ready(function() {
  $('#start').hide();

  var players = 0

  $('.new-player').on('submit', function(event){
    event.preventDefault();
    event.stopPropagation();
    var button = $(this).find('.btn')
    var url = $(this).attr('action');
    var data = $(this).serialize();
    
    $.post(url, data, function(response){
      var name = response.player.name;
      button.parent().data('name', name);
      button.replaceWith("<p class='ready'>"+ name +" is ready to race!</p>");
      players ++;
      
      if (players == 2) {
        var player1 = $('.player1').data('name');
        var player2 = $('.player2').data('name');
        $('table').find('tr:first-child').data('name', player1);
        $('table').find('tr:last-child').data('name', player2);
        $('#player-setup').replaceWith($('#start'));
        $('#start').show();
        
        $('#start').on('click', function(event){
          event.preventDefault();
          lights();
          window.setTimeout(function(){
            $.post('/new_game', {player1: player1, player2: player2});
            monitorKeys();
          }, 2300);
        });
      };
    });
  });
});
