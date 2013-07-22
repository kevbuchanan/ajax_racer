function finished(){
  return $('tr td:nth-child(38)').hasClass('active');
};


function update_player_position(player) {
  var row = $("#"+ player + "_track");
  var newposition = row.find('.active').next();
  row.find('td').removeClass('active');
  newposition.addClass('active');
  };


$(document).ready(function() {
  $(this).keyup(function(key){
    if (key.keyCode == 65) {
      update_player_position('player1');
    }
    else if (key.keyCode == 76) {
      update_player_position('player2');
    }
    else if (key.keyCode == 67) {
      update_player_position('player3');
    }
    if (finished()) {
      var winner = $('tr td:nth-child(38).active').parent().data('name');
      alert(winner + ' won!');
    }
  });
});
