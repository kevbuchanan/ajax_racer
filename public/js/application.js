function finished(){
  return $('tr td:nth-child(38)').hasClass('active');
};


function update_player_position(player) {
  var row = $("#"+ player + "_track");
  var newposition = row.find('.active').next();
  row.find('td').removeClass('active');
  newposition.addClass('active');
  };

function play(){
  while (finished() == false) {
    $(document).keyup(function(key){
      if (key.keyCode == 65) {
        update_player_position('player1');
      }
      else if (key.keyCode == 76) {
        update_player_position('player2');
      }
      else if (key.keyCode == 67) {
        update_player_position('player3');
      }
    });
  }
  var winner = $('tr td:nth-child(38).active').parent().data('name');
  $.post('/finished', {winner: winner}, function(response){
    $('.container').append(response);
  });
};


$(document).ready(function() {
  $('#player-setup').on('submit', 'form', function(event){
    event.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();
    $.post(url, data, function(response) {
      if ($(response).hasClass('new-players')) {
        $('#player-setup').find('form').replaceWith(response);
      }
      else {
        $('#player-setup').hide();
        $('.game').replaceWith(response);
        play();
      }
    });
  });
});
