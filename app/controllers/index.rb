get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/new_game' do
  @player1 = Player.find_by_name(params[:player1])
  @player2 = Player.find_by_name(params[:player2])
  @game = Game.create(players: [@player1, @player2])
end

post '/new_player' do
  @player = Player.find_or_create_by_name(params[:player])
  content_type :json
  @player.to_json
end

post '/finished' do
  @game = Game.last
  @winner = Player.find(params[:winner])
  @game.winner_id = @winner.id
  erb :_finished, layout: false, locals: { game: @game, winner: @winner}
end
