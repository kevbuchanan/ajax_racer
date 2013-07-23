function finished(){
  return $('tr td:last-child').hasClass('active');
};


function update_player_position(player) {
  var row = $("#"+ player + "_track");
  var newposition = row.find('.active').next();
  row.find('td').removeClass('active');
  newposition.addClass('active');
  };

function play(){
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
  if (finished()) {
  var winner = $('tr td:last-child.active').parent().data('name');
  $.post('/finished', {winner: winner}, function(response){
    $('.container').append(response);
  });
}
};


$(document).ready(function() {
  $('#start').find('form').hide();
  var players = 0
  $('#player-setup .new-player').on('submit', function(event){
    event.preventDefault();
    event.stopPropagation();
    var button = $(this).find('.btn')
    var url = $(this).attr('action');
    var data = $(this).serialize();
    $.post(url, data, function(response){
      var name = response.player.name;
      button.replaceWith("<p class='ready'>"+ name +" is ready to race!</p>");
      players ++;
      if (players == 2) {
        $('#start').find('form').show();
        $('#start').on('submit', 'form', function(event){
          event.preventDefault;
          play();
        });
      };
    });
  });
});
