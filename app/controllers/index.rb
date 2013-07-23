get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/new_game' do
  @player1 = Player.find_or_create_by_name(params[:player1][:name])
  @player2 = Player.find_or_create_by_name(params[:player2][:name])
  if @player1.valid? && @player2.valid?
    @game = Game.new(players: [@player1, @player2])
    if @game.save
      erb :_game, layout: false, locals: {player1: @player1, player2: @player2}
    else
      @error = @game.players_games.map(&:errors)[1].full_messages.first
      erb :_form, layout: false, locals: {game_error: @error }
    end
  else
    @errors1 = @player1.errors.full_messages
    @errors2 = @player2.errors.full_messages
    erb :_form, layout: false, locals: {errors1: @errors1, errors2: @errors2}
  end
end

post '/finished' do
  @game = Game.last
  @winner = Player.find_by_name(params[:winner])
  @game.winner_id = @winner.id
  @game.save
  erb :_winner, layout: false, locals: {game: @game, winner: @winner}
end
