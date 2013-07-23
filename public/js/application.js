function end_game(){
  $(document).off('keyup', monitorKeys());

};


function update_player_position(player) {
  var row = $("#"+ player + "_track");
  var newposition = row.find('.active').next();
  row.find('td').removeClass('active');
  newposition.addClass('active');
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
    else if (key.keyCode == 67) {
      update_player_position('player3');
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
        $('#start').show();
        
        $('#start').on('submit', function(event){
          event.preventDefault();
          var player1 = $('.player1').data('name');
          var player2 = $('.player2').data('name');
          $.post('/new_game', {player1: player1, player2: player2});
          monitorKeys();
        });
      };
    });
  });
});
